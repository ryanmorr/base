/**
 * Import dependencies
 */
import { isArray } from '../lang';

/**
 * Store a generic array for contextual
 * method adoption
 */
const array = [];

/**
 * Use to convert array-likes to arrays
 */
const slice = array.slice;

/**
 * Convert an array-like object into
 * an array
 *
 * @param {Array|ArrayLike} obj
 * @return {Array}
 * @api public
 */
export const toArray = Array.from || function toArray(obj) {
    if (isArray(obj)) {
        return obj;
    }
    return slice.call(obj);
};

/**
 * Iterate through the values of an array
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @api public
 */
export function each(arr, fn, ctx) {
    array.forEach.call(arr, fn, ctx || arr);
}

/**
 * Iterate through the values of an array
 * in reverse order
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @api public
 */
export function eachRight(arr, fn, ctx) {
    for (let i = arr.length - 1; i >= 0; --i) {
        fn.call(ctx || arr[i], arr[i], i, arr);
    }
}

/**
 * Calls a function for each item in an
 * array, and if the function returns
 * true adds the item to a new array
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @return {Array}
 * @api public
 */
export function filter(arr, fn, ctx) {
    return array.filter.call(arr, fn, ctx);
}

/**
 * Calls a function for each item in
 * an array and inserts the result into
 * a new array
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @return {Array}
 * @api public
 */
export function map(arr, fn, ctx) {
    return array.map.call(arr, fn, ctx);
}

/**
 * Call a function for each item of an
 * array and returns true if all calls
 * return true
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @return {Boolean}
 * @api public
 */
export function every(arr, fn, ctx) {
    return array.every.call(arr, fn, ctx);
}

/**
 * Calls a function for each item of an
 * array and returns true if any call
 * returns true
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @return {Boolean}
 * @api public
 */
export function some(arr, fn, ctx) {
    return array.some.call(arr, fn, ctx);
}

/**
 * Returns the index of the first item of
 * an array with a specified value, or -1
 * if the item is not present in the array
 *
 * @param {Array|ArrayLike} arr
 * @param {*} obj
 * @param {Number} fromIndex (optional)
 * @return {Number}
 * @api public
 */
export function indexOf(arr, obj, fromIndex = 0) {
    return array.indexOf.call(arr, obj, fromIndex);
}

/**
 * Returns the index of the last item of
 * an array with a specified value, or -1
 * if the item is not present in the array
 *
 * @param {Array|ArrayLike} arr
 * @param {*} obj
 * @param {Number} fromIndex (optional)
 * @return {Number}
 * @api public
 */
export function lastIndexOf(arr, obj, fromIndex = arr.length - 1) {
    return array.lastIndexOf.call(arr, obj, fromIndex);
}

/**
 * Reduce an array to a single value
 * using an accumulator
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} initialValue
 * @return {*}
 * @api public
 */
export function reduce(arr, fn, initialValue) {
    return array.reduce.call(arr, fn, initialValue);
}

/**
 * Reduce an array to a single value
 * using an accumulator in reverse order
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} initialValue
 * @return {*}
 * @api public
 */
export function reduceRight(arr, fn, initialValue) {
    return array.reduceRight.call(arr, fn, initialValue);
}

/**
 * Does the array contain the provided
 * object?
 *
 * @param {Array|ArrayLike} arr
 * @param {*} obj
 * @return {Boolean}
 * @api public
 */
export function contains(arr, obj) {
    if (array.includes) {
        return array.includes.call(arr, obj);
    }
    return indexOf(arr, obj) !== -1;
}

/**
 * Returns a new array without any
 * duplications
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @return {Array}
 * @api public
 */
export function unique(arr) {
    const a = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!contains(a, arr[i])) {
            a.push(arr[i]);
        }
    }
    return a;
}

/**
 * Is the array empty?
 *
 * @param {Array|ArrayLike} arr
 * @return {Boolean}
 * @api public
 */
export function isEmpty(arr) {
    return arr.length === 0;
}

/**
 * Return a random item from an array
 *
 * @param {Array|ArrayLike} arr
 * @return {*}
 * @api public
 */
export function random(arr) {
    return arr[Math.round((Math.random() * (arr.length - 1)))];
}

/**
 * Removes all occurrences of a value
 * from an array
 *
 * @param {Array|ArrayLike} arr
 * @param {*} obj
 * @api public
 */
export function remove(arr, obj) {
    each(arr, (val, index) => {
        if (val === obj) {
            removeAt(arr, index);
        }
    });
}

/**
 * Removes an item from the array at the
 * provided index
 *
 * @param {Array|ArrayLike} arr
 * @param {Number} index
 * @api public
 */
export function removeAt(arr, index) {
    array.splice.call(arr, index, 1);
}

/**
 * Adds an object to the array if it's
 * not already in the array
 *
 * @param {Array|ArrayLike} arr
 * @param {*} obj
 * @api public
 */
export function include(arr, obj) {
    if (!contains(arr, obj)) {
        array.push.call(arr, obj);
    }
}

/**
 * Inserts an object at the given index
 * of the array
 *
 * @param {Array|ArrayLike} arr
 * @param {*} obj
 * @param {Number} index
 * @api public
 */
export function insert(arr, obj, index) {
    array.splice.call(arr, index, 0, obj);
}

/**
 * Clones the array into a new array
 *
 * @param {Array|ArrayLike} arr
 * @return {Array}
 * @api public
 */
export function copy(arr) {
    return array.slice.call(arr);
}

/**
 * Search an array for the first item
 * that satisfies a given condition and
 * return that item
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @return {*}
 * @api public
 */
export function find(arr, fn, ctx) {
    if (array.find) {
        return array.find.call(arr, fn, ctx);
    }
    const index = findIndex(arr, fn, ctx);
    return index === -1 ? null : arr[index];
}

/**
 * Search an array for the first item
 * that satisfies a given condition and
 * return its index
 *
 * @param {Array|ArrayLike} arr
 * @param {Function} fn
 * @param {*} ctx (optional)
 * @return {Number}
 * @api public
 */
export function findIndex(arr, fn, ctx) {
    if (array.findIndex) {
        return array.findIndex.call(arr, fn, ctx);
    }
    for (let i = 0, len = arr.length; i < len; i++) {
        if (fn.call(ctx || arr[i], arr[i], i, arr)) {
            return i;
        }
    }
    return -1;
}

/**
 * Clears the array
 *
 * @param {Array|ArrayLike} arr
 * @api public
 */
export function clear(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        removeAt(arr, i);
    }
    arr.length = 0;
}
