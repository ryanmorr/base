/**
 * Import dependencies
 */
import { hasOwnProperty, isUndefined, port } from '../lang';

/**
 * Common variables
 */
const isEnumerable = port({}.propertyIsEnumerable);

/**
 * Enumerate the properties of an object
 *
 * @param {Object} obj
 * @param {Function} fn
 * @param {*} ctx
 * @api public
 */
export function enumerate(obj, fn, ctx) {
    for (const key in obj) {
        if (hasOwnProperty(obj, key)) {
            fn.call(ctx || obj[key], key, obj[key], obj);
        }
    }
}

/**
 * Copy properties from one or more objects
 * to a target object except for undefined
 * properties
 *
 * @param {Object} obj
 * @param {...Object} objects
 * @return {Object}
 * @api public
 */
export function merge(obj, ...objects) {
    for (let i = 0, len = objects.length, item, key, value; i < len; i++) {
        item = objects[i];
        for (key in item) {
            value = item[key];
            if (hasOwnProperty(item, key) && !isUndefined(value)) {
                obj[key] = value;
            }
        }
    }
    return obj;
}

/**
 * Calls a function for each item in an
 * array, and if the function returns
 * true adds the item to a new array
 *
 * @param {Object} obj
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @return {Object}
 * @api public
 */
export function filter(obj, fn, ctx = obj) {
    const o = {};
    for (const key in obj) {
        if (hasOwnProperty(obj, key) && fn.call(ctx, key, obj[key], obj)) {
            o[key] = obj[key];
        }
    }
    return o;
}

/**
 * Calls a function for each item in
 * an array and inserts the result into
 * a new array
 *
 * @param {Object} obj
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @return {Object}
 * @api public
 */
export function map(obj, fn, ctx = obj) {
    const o = {};
    for (const key in obj) {
        if (hasOwnProperty(obj, key)) {
            o[key] = fn.call(ctx, key, obj[key], obj);
        }
    }
    return o;
}

/**
 * Get the amount of properties
 * on the object
 *
 * @param {Object} obj
 * @return {Number}
 * @api public
 */
export function size(obj) {
    let size = 0;
    for (const key in obj) {
        if (hasOwnProperty(obj, key)) {
            size++;
        }
    }
    return size;
}

/**
 * Is the object empty of any
 * properties?
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api public
 */
export function isEmpty(obj) {
    return keys(obj).length === 0;
}

/**
 * Get the keys for all the properties
 * of an object
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */
export function keys(obj) {
    if ('keys' in Object) {
        return Object.keys(obj);
    }
    const keys = [];
    for (const key in obj) {
        if (hasOwnProperty(obj, key)) {
            keys.push(key);
        }
    }
    return keys;
}

/**
 * Get the values for all the properties
 * of an object
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */
export function values(obj) {
    const values = [];
    for (const key in obj) {
        if (hasOwnProperty(obj, key)) {
            values.push(obj[key]);
        }
    }
    return values;
}

/**
 * Does the object contain the provided
 * value?
 *
 * @param {Object} obj
 * @param {*} value
 * @return {Boolean}
 * @api public
 */
export function contains(obj, value) {
    for (const key in obj) {
        if (hasOwnProperty(obj, key) && obj[key] === value) {
            return true;
        }
    }
    return false;
}

/**
 * Remove all the properties associated with
 * the provided keys
 *
 * @param {Object} obj
 * @param {...String} keys
 * @api public
 */
export function removeKeys(obj, ...keys) {
    keys.forEach((key) => {
        if (hasOwnProperty(obj, key)) {
            delete obj[key];
        }
    });
}

/**
 * Remove all the properties associated with
 * the provided value
 *
 * @param {Object} obj
 * @param {...String} values
 * @api public
 */
export function removeValues(obj, ...values) {
    values.forEach((value) => {
        for (const key in obj) {
            if (hasOwnProperty(obj, key) && obj[key] === value) {
                delete obj[key];
            }
        }
    });
}

/**
 * Clear the object of all properties
 *
 * @param {Object} obj
 * @api public
 */
export function clear(obj) {
    for (const key in obj) {
        if (hasOwnProperty(obj, key)) {
            delete obj[key];
        }
    }
}

/**
 * Get an array of an object's own
 * enumerable properties in [key, value]
 * pairs
 *
 * @param {Object} props
 * @return {Array}
 * @api public
 */
export function entries(obj) {
    if ('entries' in Object) {
        return Object.entries(obj);
    }
    const items = [];
    for (const key in obj) {
        if (hasOwnProperty(obj, key) && isEnumerable(obj, key)) {
            items.push([key, obj[key]]);
        }
    }
    return items;
}
