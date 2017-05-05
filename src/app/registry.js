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
function get(id) {
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
function add(id, obj) {
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
function remove(id) {
    if (id in objects) {
        delete objects[id];
    }
    for (const key in objects) {
        if (objects[key] === id) {
            delete objects[key];
        }
    }
}

/**
 * Declare `registry` namespace and export
 */
const registry = {get, add, remove};
export default registry;
