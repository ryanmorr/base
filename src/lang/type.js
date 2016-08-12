/**
 * Import dependencies
 */
import { toString } from './index';

/**
 * Is the obj an array?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export const isArray = Array.isArray || function isArray(obj) {
    return toString(obj) === 'Array';
};

/**
 * Is the obj a boolean?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isBoolean(obj) {
    return toString(obj) === 'Boolean';
}

/**
 * Is the obj a date?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isDate(obj) {
    return toString(obj) === 'Date';
}

/**
 * Is the obj an error?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isError(obj) {
    return toString(obj) === 'Error' || obj instanceof Error;
}

/**
 * Is the obj a function?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isFunction(obj) {
    return toString(obj) === 'Function';
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
    return toString(obj) === 'Number';
}

/**
 * Is the obj an object?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isObject(obj) {
    return toString(obj) === 'Object';
}

/**
 * Is the obj a regular expression?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isRegExp(obj) {
    return toString(obj) === 'RegExp';
}

/**
 * Is the obj a string?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isString(obj) {
    return toString(obj) === 'String';
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
