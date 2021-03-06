import * as CONSTANTS from '../constants';

/**
 * Check whether the direction is valid or not.
 * @param  {String}  direction [The supported directions are set in CONSTANTS]
 * @return {Boolean}           [Return ture if valid]
 */
export const isValidDirection = direction => (CONSTANTS.DIR_ALL.indexOf(direction.toUpperCase()) > -1);

/**
 * Check whether there is another bus stops at the target unit.
 * @param  {Object} [newPosition]   [The new position will the bus locate,
 *                                     must include attributes: posX(int), posY(int)]
 * @param  {Array}  [existingBuses] [The existing buses' position,
 *                                   the element in the array is object which includes
 *                                   the attributes:: posX(int), posY(int)]
 * @return {Boolean}                [Return true if exists, false if no]
 */
export const checkBusExists = (newPosition = {}, existingBuses = []) => {
    for (let i = 0; i < existingBuses.length; i += 1) {
        const bus = existingBuses[i];
        if (newPosition.posX === bus.posX &&
            newPosition.posY === bus.posY) {
            return true;
        }
    }
    return false;
};

/**
 * Check the target position is inside carpark or not
 * @param  {Object} [newPosition]  [Target position]
 * @param  {Number} [parkSize]     [Park size]
 * @return {Boolean}               [Return true if inside]
 */
export const checkInsidePark = (newPosition = {}, parkSize = 0) => {
    if (newPosition.posX < 0 || newPosition.posY < 0 ||
        newPosition.posX >= parkSize || newPosition.posY >= parkSize) {
        return false;
    }
    return true;
};

/**
 * Rotate bus with 90 degree in clockwise or anticlockwise
 * @param  {String}  currentDirection   [Current direction,
 *                                        the supported ones are set in CONSTANTS]
 * @param  {Boolean} [isClockwise]      [Turning direction, true for clockwise]
 * @return {String}                     [Return the new direction,
 *       Notice: if the direction passed in is not supported, return empty string]
 */
export const rotateBus = (currentDirection, isClockwise = false) => {
    const directionsArray = CONSTANTS.DIR_ALL;
    let index = null;
    directionsArray.forEach((dir, i) => {
        if (dir === currentDirection) {
            index = i;
        }
    });
    if (index == null) {
        return '';
    } else if (isClockwise) {
        return directionsArray[(index + 1) % directionsArray.length];
    }
    return directionsArray[((index + directionsArray.length) - 1) % directionsArray.length];
};

/**
 * Move the bus forward
 * @param  {Object}  [currentPosition]  [Current position of the bus,
 *                                    must include attributes: posX(int), posY(int)]
 * @return {Object}                    [Return the new position after moving,
 *        Notice: if the currentPosition is not supported, return the same one.]
 */
export const moveForwardBus = (currentPosition = {}) => {
    const moveDir = currentPosition.direction;
    const Structures = [
      { dir: CONSTANTS.DIR_NORTH,key: 'posY', val: 1 },
      { dir: CONSTANTS.DIR_SOUTH,key: 'posY', val: -1},
      { dir: CONSTANTS.DIR_WEST, key: 'posX', val: -1 },
      { dir: CONSTANTS.DIR_EAST, key: 'posX', val: 1},
    ];
    for(let i = 0; i < Structures.length; i++){
        const structure = Structures[i];
        if (structure.dir === moveDir){
            return {
                ...currentPosition,
                [structure.key]: currentPosition[structure.key] + structure.val
            };
        }	
    }
};

/**
 * Split the input Command.
 * @param  {String}     [unSplitCmd]  [get the String cmd after forEach from array]
 * @return {Object}                   [return uppercase command, available pattern as an object ]
 */
export const splitCommand = (unSplitCmd) => {
    const spaceIndex = unSplitCmd.trim().indexOf(' ');
    return spaceIndex < 0 ? {command: unSplitCmd.trim().toUpperCase(), params: null} : (() => {
        const command = unSplitCmd.substring(0, spaceIndex+1).trim().toUpperCase();
        const params = unSplitCmd.substring(spaceIndex+1).replace(/\s\s+/g, '').trim().split(",");
        return {command, params};
    })();
};


export const replaceBlank = (cmdArray) => cmdArray.filter((el) => el.trim() !== "");