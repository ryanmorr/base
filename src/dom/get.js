/**
 * Import dependencies
 */
import { toArray } from '../array';
import { isString } from '../lang';

/**
 * Resolve a value to return
 * a raw DOM node
 *
 * @param {String|Node} el
 * @return {Element}
 * @api public
 */
export function resolve(el) {
    if (isString(el)) {
        return find(el);
    }
    if (el.nodeName && el.nodeType > 0) {
        return el;
    }
    return null;
}

/**
 * Find a single element based on a
 * CSS selector string
 *
 * @param {String} selector
 * @param {Node} root (optional)
 * @return {Element|Null}
 * @api public
 */
export function find(selector, root = document) {
    return resolve(root).querySelector(selector);
}

/**
 * Query for all element matching a
 * CSS selector string
 *
 * @param {String} selector
 * @param {Node} root (optional)
 * @return {NodeList}
 * @api public
 */
export function query(selector, root = document) {
    return toArray(resolve(root).querySelectorAll(selector));
}
