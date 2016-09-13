/**
 * Import dependencies
 */
import { isString } from '../lang';
import { enumerate } from '../object';

/**
 * Hash map containing all configuration
 * options
 */
const cfg = Object.create(null);

/**
 * Get or set a configuration option
 *
 * @param {String|Object} name
 * @param {*} value (optional)
 * @api public
 */
export default function config(name, value) {
    if (arguments.length === 1) {
        if (isString(name)) {
            return name in cfg ? cfg[name] : null;
        }
        enumerate(name, (key, val) => config(key, val));
    } else {
        cfg[name] = value;
    }
}
