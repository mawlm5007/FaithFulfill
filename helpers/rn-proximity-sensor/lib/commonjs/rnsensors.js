"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAvailable = isAvailable;
exports.setLogLevelForType = setLogLevelForType;
exports.setUpdateInterval = setUpdateInterval;
exports.start = start;
exports.stop = stop;
var _reactNative = require("react-native");
const {
  RNSensorsProximity: ProxNative
} = _reactNative.NativeModules;
if (!ProxNative) {
  throw new Error('Native modules for proximity-sensor is not available. Did react-native link run successfully?');
}

// Cache the availability of sensors
let availableSensor = null;
function start() {
  ProxNative.startUpdates();
}
function isAvailable() {
  if (availableSensor) {
    return availableSensor;
  }
  const api = ProxNative;
  const promise = api.isAvailable();
  availableSensor = promise;
  return promise;
}
function stop() {
  ProxNative.stopUpdates();
}
function setUpdateInterval(updateInterval) {
  ProxNative.setUpdateInterval(updateInterval);
}
function setLogLevelForType(level) {
  ProxNative.setLogLevel(level);
}
//# sourceMappingURL=rnsensors.js.map