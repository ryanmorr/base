/**
 * Import dependencies
 */
import { isFunction } from '../lang';

/**
 * Create a hash map to store
 * all the object in
 */
const objects = Object.create(null);

/**
 * Get the object with the
 * provided ID from the registry
 * or null if not found
 *
 * @param {String} id
 * @return {*|Null}
 */
export function retrieve(id) {
    return id in objects ? objects[id] : null;
}

/**
 * Add an object to the registry with
 * the provided ID
 *
 * @param {String} id
 * @param {*} obj
 * @api public
 */
export function register(id, obj) {
    if (arguments.length === 1) {
        obj = id;
        if ('id' in obj && isFunction(obj.id)) {
            id = obj.id();
        }
    }
    if (!(id in objects)) {
        objects[id] = obj;
    }
}

/**
 * Remove an object with the
 * provided ID or object from the
 * registry
 *
 * @param {String} id
 * @api public
 */
export function unregister(id) {
    if (id in objects) {
        delete objects[id];
    }
    for (const key in objects) {
        if (objects[key] === id) {
            delete objects[key];
        }
    }
}
