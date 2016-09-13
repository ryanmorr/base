/**
 * Import dependencies
 */
import { config } from './index';
import { isBoolean } from '../lang';

/**
 * Is the application running
 * in debugging mode?
 *
 * @return {Boolean}
 * @api public
 */
export default function isDebugging() {
    const debug = config('debug');
    if (isBoolean(debug)) {
        return debug;
    }
    return false;
}
