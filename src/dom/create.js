/**
 * Import dependencies
 */
import { doc, setProperty } from './index';
import { isArray, type } from '../lang';
import { enumerate } from '../object';

/**
 * List of self-closing tags
 */
const selfClosingTags = [
    // HTML
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
    // SVG
    'circle',
    'ellipse',
    'line',
    'path',
    'polygon',
    'polyline',
    'rect',
    'stop',
    'use'
];

/**
 * Create an HTML markup string
 *
 * @param {String} tag
 * @param {Object|Null} props (optional)
 * @param {...Array|String} children (optional)
 * @return {String}
 * @api public
 */
export function createHTML(tag, props = null, ...children) {
    const html = ['<' + tag];
    enumerate(props, (prop, value) => {
        html.push(` ${prop}="${value}"`);
    });
    if (selfClosingTags.indexOf(tag) !== -1) {
        html.push(' />');
    } else {
        html.push('>');
        children.forEach((child) => {
            if (isArray(child)) {
                html.push(createHTML(...child));
            } else {
                html.push(child);
            }
        });
        html.push('</' + tag + '>');
    }
    return html.join('');
}

/**
 * Create a DOM element
 *
 * @param {String} tag
 * @param {Object|Null} props (optional)
 * @param {...String|Array|TextNode|Element} children (optional)
 * @return {Element}
 * @api public
 */
export function createElement(tag, props = null, ...children) {
    const el = doc.createElement(tag);
    if (props) {
        enumerate(props, (key, value) => {
            setProperty(el, key, value);
        });
    }
    children.forEach((child) => {
        switch (type(child)) {
            case 'element':
            case 'textnode':
                el.appendChild(child);
                break;
            case 'array':
                el.appendChild(isArray(child) ? createElement(...child) : child);
                break;
            default:
                el.appendChild(doc.createTextNode(child));
        }
    });
    return el;
}
