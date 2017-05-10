/**
 * Import dependencies
 */
import { doc, resolve } from './index';
import { toArray } from '../array';

/**
 * Append a node as the first child
 * of an element
 *
 * @param {Element} el
 * @param {String|Node|Array} child
 * @api public
 */
export function prepend(el, child) {
    el = resolve(el);
    child = resolve(child);
    if ('prepend' in el) {
        el.prepend(child);
        return;
    }
    el.insertBefore(child, el.firstChild);
}

/**
 * Append a node to an element
 *
 * @param {Element} el
 * @param {String|Node|Array} child
 * @api public
 */
export function append(el, child) {
    resolve(el).appendChild(resolve(child));
}

/**
 * Set the text content of an
 * element
 *
 * @param {Element} el
 * @param {String} text
 * @api public
 */
export function setText(el, text) {
    clearText(el);
    resolve(el).appendChild(doc.createTextNode(text));
}

/**
 * Clear the text content of an
 * element
 *
 * @param {Element} el
 * @api public
 */
export function clearText(el) {
    el = resolve(el);
    toArray(el.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
            el.removeChild(child);
        }
    });
}

/**
 * Remove all of an elements child
 * nodes
 *
 * @param {Element} el
 * @api public
 */
export function empty(el) {
    el = resolve(el);
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

/**
 * Remove elements from the DOM
 *
 * @param {Element} el
 * @api public
 */
export function remove(el) {
    el = resolve(el);
    if (el.parentNode) {
        el.parentNode.removeChild(el);
    }
}
