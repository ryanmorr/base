/**
 * Import dependencies
 */
import { isString, isNull } from '../lang';
import { enumerate } from '../object';

/**
 * Get an attribute of an
 * element
 *
 * @param {Element} el
 * @param {String} attr
 * @return {String}
 * @api public
 */
export function getAttribute(el, attr) {
    return el.hasAttribute(attr) ? el.getAttribute(attr) : null;
}

/**
 * Set an attribute on an
 * element
 *
 * @param {Element} el
 * @param {String|Object} attr
 * @param {String|Number|Boolean} value (optional)
 * @api public
 */
export function setAttribute(el, attr, value) {
    if (isString(attr)) {
        if (isNull(value) || value === false) {
            removeAttribute(el, attr);
        } else {
            el.setAttribute(attr, value);
        }
        return;
    }
    enumerate(attr, (key, value) => setAttribute(el, key, value));
}

/**
 * Remove an attribute on an
 * element
 *
 * @param {Element} el
 * @param {String} attr
 * @api public
 */
export function removeAttribute(el, attr) {
    el.removeAttribute(attr);
}
