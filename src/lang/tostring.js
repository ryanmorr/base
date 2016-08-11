/**
 * Cache toString
 */
const objectToString = {}.toString;

/**
 * Get the internal [[Class]] of
 * an object
 *
 * @param {*} obj
 * @param {Boolean} strip (optional)
 * @return {String}
 * @api public
 */
export default function toString(obj, strip = true) {
    const type = objectToString.call(obj);
    return strip ? type.slice(8, -1) : type;
}
