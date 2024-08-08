/**
 * Returns a randomly generated room number
 * @param {Object} data
 * @param {string} type
 * @returns {string}
 */
function getOpenRoom(data, type) {
  const lookInHere = data[type];

  if (!Array.isArray(lookInHere)) {
    throw new Error(`Invalid room type: ${type}`);
  }

  const applicableRooms = [];

  for (const room of lookInHere) {
    if (room.taken === false) applicableRooms.push(room.number);
  }

  if (applicableRooms.length === 0) {
    throw new Error(`No available rooms of type: ${type}`);
  }

  /** @type {string} */
  const roomNumber =
    applicableRooms[Math.floor(Math.random() * applicableRooms.length)];

  return roomNumber;
}
/**
 * Changes the status of a room
 * @param {Object} data
 * @param {string} roomNumber
 * @param {boolean} checkin
 * @param {string} [occupant=""]
 * @returns {Object}
 */
function changeRoomStatus(data, roomNumber, checkin, occupant = "") {
  for (const area of Object.keys(data)) {
    for (const room of data[area]) {
      if (room.number === roomNumber) {
        room.taken = checkin;
        room.occupant = checkin ? occupant : "";
        return data;
      }
    }
  }

  throw new Error(`Room number ${roomNumber} not found`);
}

export { getOpenRoom, changeRoomStatus };