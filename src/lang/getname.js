/**
 * Import dependencies
 */
import { getClass } from './index';

/**
 * Common variables
 */
const functionNameRe = /function ([^\(]+)?\(/;

/**
 * Get the name of a function
 *
 * @param {Function} fn
 * @return {String}
 * @api private
 */
function getFunctionName(fn) {
    // Support the non-standard `displayName`
    // property if it exists
    if (fn.displayName) {
        return fn.displayName;
    }
    if (fn.name) {
        return fn.name;
    }
    const match = functionNameRe.exec(fn.toString());
    if (match && match[1]) {
        return match[1];
    }
    return '';
}

/**
 * Get the name of an object
 *
 * @param {*} obj
 * @return {String}
 * @api public
 */
export default function getName(obj) {
    const type = getClass(obj);
    switch (type) {
        case 'Null':
        case 'Undefined':
            return type.toLowerCase();
        case 'Function':
            return getFunctionName(obj);
        default:
            return getFunctionName(obj.constructor);
    }
}
