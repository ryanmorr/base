/**
 * Import dependencies
 */
import { doc, createElement, isHTML, toFragment} from './index';
import { toArray } from '../array';
import { isString, isNode, isArray } from '../lang';

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
        if (isHTML(el)) {
            const frag = toFragment(el);
            return frag.childNodes.length === 1 ? frag.firstChild : frag;
        }
        return find(el);
    }
    if (isNode(el)) {
        return el;
    }
    if (isArray(el)) {
        return createElement(...el);
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
