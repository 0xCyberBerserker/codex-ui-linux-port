#!/usr/bin/env node
"use strict";

const assert = require("node:assert");
const fs = require("node:fs");
const net = require("node:net");
const path = require("node:path");

const configPath = process.argv[2];
const parentPid = process.ppid;
const sessionStartedAt = Math.floor(Date.now() / 1000);
let socket;
let rotationTimer;
let reconnectTimer;
let readBuffer = Buffer.alloc(0);
let activityIndex = 0;

function frame(opcode, payload) {
  const body = Buffer.from(JSON.stringify(payload), "utf8");
  const header = Buffer.alloc(8);
  header.writeUInt32LE(opcode, 0);
  header.writeUInt32LE(body.length, 4);
  return Buffer.concat([header, body]);
}

function socketCandidates() {
  const uid = process.getuid?.();
  const roots = [process.env.XDG_RUNTIME_DIR, uid === undefined ? "" : `/run/user/${uid}`, "/tmp"].filter(Boolean);
  return [...new Set(roots.flatMap((root) => [root, path.join(root, "app/com.discordapp.Discord")]))]
    .flatMap((root) => Array.from({ length: 10 }, (_, slot) => path.join(root, `discord-ipc-${slot}`)))
    .filter((candidate) => {
      try {
        return fs.statSync(candidate).isSocket();
      } catch {
        return false;
      }
    });
}

function normalizeButtons(buttons) {
  return (buttons || []).slice(0, 2).map((button) => {
    const url = new URL(String(button.url));
    if (url.protocol !== "https:") throw new Error("button URLs must use HTTPS");
    return { label: String(button.label || "Open").slice(0, 32), url: url.href };
  });
}

function loadConfig() {
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  if (config.enabled === false) return null;
  if (!/^\d{17,20}$/.test(String(config.application_id || ""))) {
    throw new Error("application_id must be a Discord application ID");
  }
  if (!Array.isArray(config.activities) || config.activities.length === 0) {
    throw new Error("activities must contain at least one entry");
  }
  config.activities = config.activities.map((activity) => ({
    details: String(activity.details || "").slice(0, 128),
    state: String(activity.state || "").slice(0, 128),
  }));
  config.assets = Object.fromEntries(Object.entries(config.assets || {})
    .filter(([, value]) => value)
    .map(([key, value]) => [key, String(value).slice(0, 256)]));
  config.buttons = normalizeButtons(config.buttons);
  config.interval_seconds = Math.max(60, Number(config.interval_seconds) || 12_600);
  return config;
}

function sendActivity(config) {
  if (!socket?.writable) return;
  const activity = config.activities[activityIndex++ % config.activities.length];
  socket.write(frame(1, {
    cmd: "SET_ACTIVITY",
    args: {
      pid: parentPid,
      activity: {
        type: 0,
        details: activity.details,
        state: activity.state,
        timestamps: { start: sessionStartedAt },
        assets: config.assets,
        buttons: config.buttons,
        instance: false,
      },
    },
    nonce: `${Date.now()}-${activityIndex}`,
  }));
}

function handleFrames(config, chunk) {
  readBuffer = Buffer.concat([readBuffer, chunk]);
  while (readBuffer.length >= 8) {
    const size = readBuffer.readUInt32LE(4);
    if (readBuffer.length < size + 8) return;
    const payload = JSON.parse(readBuffer.subarray(8, size + 8).toString("utf8"));
    readBuffer = readBuffer.subarray(size + 8);
    if (payload.evt === "READY") {
      sendActivity(config);
      clearInterval(rotationTimer);
      rotationTimer = setInterval(() => sendActivity(config), config.interval_seconds * 1000);
    }
  }
}

function scheduleReconnect(config) {
  clearTimeout(reconnectTimer);
  reconnectTimer = setTimeout(() => connect(config), 15_000);
}

function connect(config) {
  const candidate = socketCandidates()[0];
  if (!candidate) return scheduleReconnect(config);

  readBuffer = Buffer.alloc(0);
  socket = net.createConnection(candidate);
  socket.once("connect", () => socket.write(frame(0, { v: 1, client_id: String(config.application_id) })));
  socket.on("data", (chunk) => handleFrames(config, chunk));
  socket.once("error", () => socket.destroy());
  socket.once("close", () => {
    clearInterval(rotationTimer);
    scheduleReconnect(config);
  });
}

function selfTest() {
  const encoded = frame(1, { ok: true });
  assert.equal(encoded.readUInt32LE(0), 1);
  assert.equal(encoded.readUInt32LE(4), 11);
  assert.deepEqual(JSON.parse(encoded.subarray(8).toString("utf8")), { ok: true });
  assert.deepEqual(normalizeButtons([{ label: "GitHub", url: "https://github.com/project" }]),
    [{ label: "GitHub", url: "https://github.com/project" }]);
  assert.throws(() => normalizeButtons([{ url: "http://example.com" }]), /HTTPS/);
  console.log("discord-rich-presence: self-test passed");
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else if (!configPath) {
  console.error("discord-rich-presence: config path required");
  process.exitCode = 2;
} else {
  try {
    const config = loadConfig();
    if (config) {
      connect(config);
      setInterval(() => {
        try {
          process.kill(parentPid, 0);
        } catch {
          process.exit(0);
        }
      }, 5_000).unref();
    }
  } catch (error) {
    console.error(`discord-rich-presence: ${error.message}`);
    process.exitCode = 2;
  }
}
