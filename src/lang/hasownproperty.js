/**
 * Use an external `hasOwnProperty` method to
 * safequard against conflicting property names
 */
const hasOwnProp = {}.hasOwnProperty;

/**
 * Determine whether an object has the specified
 * property as a direct property of that object
 *
 * @param {Object} obj
 * @param {String} name
 * @return {Boolean}
 * @api public
 */
export default function hasOwnProperty(obj, name) {
    return hasOwnProp.call(obj, name);
}
