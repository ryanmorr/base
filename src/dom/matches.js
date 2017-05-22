/**
 * Import dependencies
 */
import { documentElement } from './index';
import { prefix } from '../lang';

/**
 * Use feature testing to obtain
 * the proper `matches` method
 */
const method = prefix(documentElement, [
    'matches',
    'matchesSelector',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'oMatchesSelector',
    'msMatchesSelector'
]);

/**
 * Does an element match a CSS
 * selector string
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */
export default function matches(el, selector) {
    return el[method](selector);
}
