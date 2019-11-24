/* eslint-disable prefer-destructuring */
const EARTH_RADIUS = 6371000;

/**
 * Calculate the distance of longitude and latitude
 * @param point1
 * @param point2
 * @return {number}
 */
const calculateDistance = (point1, point2) => {
  const degToRad = Math.PI / 180;
  // eslint-disable-next-line no-restricted-properties
  return EARTH_RADIUS * degToRad * Math.sqrt(Math.pow(Math.cos(point1.latitude * degToRad) * (point1.longitude - point2.longitude), 2) + Math.pow(point1.latitude - point2.latitude, 2));
};

/**
 * Receives a drone message and the old information cache and calculate speed and if it is moving or not
 * @param oldDroneInformation
 * @param message
 */
const process = (oldDroneInformation, message) => {
  const drone = {};
  // check if this drone existed before
  if (!oldDroneInformation) {
    drone.id = message[0];
    drone.latitude = message[1];
    drone.longitude = message[2];
    drone.speed = 0;
    drone.stopped = true;
    drone.lastUpdate = Date.now();
    drone.millisSamePosition = 0;
  } else {
    // calculate speed by using the cache
    drone.id = message[0];
    drone.latitude = message[1];
    drone.longitude = message[2];
    // calculate distance that the drone moved by using old coordinates from last update
    const distance = calculateDistance({ latitude: oldDroneInformation.latitude, longitude: oldDroneInformation.longitude },
      { latitude: drone.latitude, longitude: drone.longitude });
    // check the time delta and calculate speed from it
    const timeDelta = Date.now() - oldDroneInformation.lastUpdate;
    // calculate drone speed
    drone.speed = distance / timeDelta;

    if (Math.floor(drone.speed) === 0) {
      drone.millisSamePosition = oldDroneInformation.millisSamePosition + timeDelta;
    }

    drone.lastUpdate = Date.now();

    drone.stopped = drone.millisSamePosition > 10000;
  }
  return drone;
};

module.exports = { process };
