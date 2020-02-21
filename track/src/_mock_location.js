import * as Location from "expo-location";

const ten_meters_with_degrees = 0.0001;

const get_location = increment => {
  return {
    timestamp: 1000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      // Hamilton
      longitude: -79.816402 + increment * ten_meters_with_degrees,
      latitude: 43.224495 + increment * ten_meters_with_degrees
    }
  };
};

let counter = 0;

setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: get_location(counter)
  });
  counter++;
}, 1000);
