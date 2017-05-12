/**
 * Import dependencies
 */
import { matches } from './index';

/**
 * Get the first element that matches
 * a CSS selector by testing the element
 * itself and traversing up through its
 * ancestors in the DOM tree
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Element|Null}
 * @api public
 */
export function closest(el, selector) {
    if (el.closest) {
        return el.closest(selector);
    }
    while (el && el.nodeName.toLowerCase() !== 'body') {
        if (matches(el, selector)) {
            return el;
        }
        el = el.parentNode;
    }
    return null;
}
