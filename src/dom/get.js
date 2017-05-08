/**
 * Import dependencies
 */
import { doc } from './index';
import { toArray } from '../array';
import { isString, isNode } from '../lang';

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
    if (isNode(el)) {
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
export function find(selector, root = doc) {
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
export function query(selector, root = doc) {
    return toArray(resolve(root).querySelectorAll(selector));
}
