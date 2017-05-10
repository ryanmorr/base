/**
 * Import dependencies
 */
import { doc } from './index';

/**
 * Common variables
 */
const htmlRe = /<[a-z][\s\S]*>/;
const supportsTemplate = 'content' in doc.createElement('template');

/**
 * Is the string an HTML
 * string
 *
 * @param {String} str
 * @return {Boolean}
 * @api public
 */
export function isHTML(str) {
    return htmlRe.test(str);
}

/**
 * Convert a DOM element into
 * an HTML string
 *
 * @param {Element} el
 * @return {String}
 * @api public
 */
export function toHTML(el) {
    return el.outerHTML;
}

/**
 * Convert an HTML string into
 * a document fragment
 *
 * @param {String} html
 * @return {DocumentFragment}
 * @api public
 */
export function toFragment(html) {
    if (supportsTemplate) {
        const template = doc.createElement('template');
        template.innerHTML = html;
        return doc.importNode(template.content, true);
    }
    const frag = doc.createDocumentFragment();
    const div = doc.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) {
        frag.appendChild(div.firstChild);
    }
    return frag;
}
