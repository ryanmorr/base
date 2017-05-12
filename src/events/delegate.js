/**
 * Import dependencies
 */
import { closest } from '../dom';

/**
 * Enable event delegation on an element
 * for specific child elements matching a
 * selector string
 *
 * @param {Element} el
 * @param {String} type
 * @param {String} selector
 * @param {Function} fn
 * @api public
 */
export default function delegate(el, type, selector, fn) {
    el.addEventListener(type, (e) => {
        const target = closest(e.target, selector);
        if (target) {
            fn.call(target, e, target);
        }
    });
}
