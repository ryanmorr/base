/**
 * Import dependencies
 */
import { isUndefined, toString } from '../lang';

/**
 * Are we currently running on a Web
 * browser
 *
 * @return {Boolean}
 * @api public
 */
export function isBrowser() {
    return !!(!isUndefined(window) && !isUndefined(navigator) && window.document);
}

/**
 * Are we currently running on Node.js
 *
 * @return {Boolean}
 * @api public
 */
export function isNodeJs() {
    return !isBrowser() && !isUndefined(process) && toString(process) === 'process';
}
