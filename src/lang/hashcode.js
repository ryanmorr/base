/**
 * Import dependencies
 */
import { getClass } from './index';

/**
 * Generate a hash code for an object
 * based on its value/indexed items/properties
 *
 * @param {*} obj
 * @return {Number}
 * @api public
 */
export default function hashCode(obj) {
    let hash = 0;
    switch (getClass(obj)) {
        case 'Null':
        case 'Undefined':
            return 0;
        case 'Array':
            for (let i = 0, len = obj.length; i < len; i++) {
                hash += hashCode(i + hashCode(obj[i]));
            }
            return hash;
        case 'Object':
            for (const prop in obj) {
                hash += hashCode(prop + hashCode(obj[prop]));
            }
            return hash;
        default:
            const str = obj.toString();
            for (let i = 0, len = str.length; i < len; i++) {
                hash = (((hash << 5) - hash) + str.charCodeAt(i)) & 0xFFFFFFFF;
            }
            return hash;
    }
}
