/**
 * Import dependencies
 */
import { getClass } from './index';

/**
 * Regexp for DOM elements
 */
const elementRe = /^HTML\w+Element$/;

/**
 * Is the object an array?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export const isArray = Array.isArray || function isArray(obj) {
    return getClass(obj) === 'Array';
};

/**
 * Is the object a boolean?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isBoolean(obj) {
    return getClass(obj) === 'Boolean';
}

/**
 * Is the object a date?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isDate(obj) {
    return getClass(obj) === 'Date';
}

/**
 * Is the object an error?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isError(obj) {
    return getClass(obj) === 'Error' || obj instanceof Error;
}

/**
 * Is the object a function?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isFunction(obj) {
    return getClass(obj) === 'Function';
}

/**
 * Is the object a DOM node?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isNode(obj) {
    if (typeof obj === 'object') {
        return 'nodeName' in obj && typeof obj.nodeType === 'number';
    }
    return false;
}

/**
 * Is the object null?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isNull(obj) {
    return obj === null;
}

/**
 * Is the object a number?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isNumber(obj) {
    return getClass(obj) === 'Number';
}

/**
 * Is the object an object?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isObject(obj) {
    return getClass(obj) === 'Object';
}

/**
 * Is the object a regular expression?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isRegExp(obj) {
    return getClass(obj) === 'RegExp';
}

/**
 * Is the object a string?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isString(obj) {
    return getClass(obj) === 'String';
}

/**
 * Is the object undefined?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function isUndefined(obj) {
    return obj === void 0;
}

/**
 * Get the type of am object as a string
 *
 * @param {*} obj
 * @return {String}
 * @api public
 */
export function type(obj) {
    const type = getClass(obj);
    switch (type) {
        case 'Number':
            if (obj !== obj) { // eslint-disable-line no-self-compare
                return 'nan';
            }
            return 'number';
        case 'Arguments':
        case 'Array':
        case 'Boolean':
        case 'Date':
        case 'DocumentFragment':
        case 'Error':
        case 'Event':
        case 'Null':
        case 'Promise':
        case 'RegExp':
        case 'String':
        case 'Symbol':
        case 'Undefined':
            return type.toLowerCase();
        case 'Function':
            return 'function';
        case 'Text':
        case 'Comment':
            return type.toLowerCase() + 'node';
        case 'Document':
        case 'XMLDocument':
        case 'HTMLDocument':
            return 'document';
        case 'global':
        case 'Window':
            return 'global';
        case 'NodeList':
        case 'HTMLCollection':
            return 'nodelist';
        case 'Object':
            if (obj instanceof Error) {
                return 'error';
            }
            return 'object';
        default:
            if (elementRe.test(type)) {
                return 'element';
            }
    }
    return type.toLowerCase();
}
