/**
 * Import dependencies
 */
import { getClass } from './index';

/**
 * Is the obj an array?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export const isArray = Array.isArray || function isArray(obj) {
    return getClass(obj) === 'Array';
};

/**
 * Is the obj a boolean?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isBoolean(obj) {
    return getClass(obj) === 'Boolean';
}

/**
 * Is the obj a date?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isDate(obj) {
    return getClass(obj) === 'Date';
}

/**
 * Is the obj an error?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isError(obj) {
    return getClass(obj) === 'Error' || obj instanceof Error;
}

/**
 * Is the obj a function?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isFunction(obj) {
    return getClass(obj) === 'Function';
}

/**
 * Is the obj null?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isNull(obj) {
    return obj === null;
}

/**
 * Is the obj a number?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isNumber(obj) {
    return getClass(obj) === 'Number';
}

/**
 * Is the obj an object?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isObject(obj) {
    return getClass(obj) === 'Object';
}

/**
 * Is the obj a regular expression?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isRegExp(obj) {
    return getClass(obj) === 'RegExp';
}

/**
 * Is the obj a string?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isString(obj) {
    return getClass(obj) === 'String';
}

/**
 * Is the obj undefined?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isUndefined(obj) {
    return obj === void 0;
}
