"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _rxjs = require("rxjs");
var _operators = require("rxjs/operators");
var RNSensors = _interopRequireWildcard(require("./rnsensors"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const LINKING_ERROR = `The package 'rn-proximity-sensor' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ProxNative = _reactNative.NativeModules.RNSensorsProximity ? _reactNative.NativeModules.RNSensorsProximity : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
let eventEmitterSubscription = null;
const subscribe = observer => {
  let isSensorAvailable = false;
  let unsubscribeCallback = () => {
    if (!isSensorAvailable) return;
    if (eventEmitterSubscription) eventEmitterSubscription.remove();

    // stop the sensor
    RNSensors.stop();
  };
  RNSensors.isAvailable().then(() => {
    isSensorAvailable = true;
    const emitter = new _reactNative.NativeEventEmitter(ProxNative);
    eventEmitterSubscription = emitter.addListener('RNSensorsProximity', data => {
      observer.next(data);
    });

    // Start the sensor manager
    RNSensors.start();
  }, () => {
    observer.error(`Sensor Proximity is not available`);
  });
  return unsubscribeCallback;
};
function createSensorObservable() {
  return _rxjs.Observable.create(subscribe).pipe(makeSingleton());
}

// As we only have one sensor we need to share it between the different consumers
function makeSingleton() {
  return source => source.pipe((0, _operators.publish)(), (0, _operators.refCount)());
}
var _default = exports.default = createSensorObservable();
//# sourceMappingURL=index.js.map