/**
 * Import dependencies
 */
import { doc, setProperty } from './index';
import { isArray, type } from '../lang';
import { each } from '../array';
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
 * @param {Object} props (optional)
 * @param {Array|String} children (optional)
 * @return {String}
 * @api public
 */
export function createHTML(tag, props = null, children = null) {
    const html = ['<' + tag];
    enumerate(props, (prop, value) => {
        html.push(` ${prop}="${value}"`);
    });
    if (selfClosingTags.indexOf(tag) !== -1) {
        html.push(' />');
    } else {
        html.push('>');
        if (children) {
            if (isArray(children)) {
                each(children, (child) => {
                    html.push(createHTML(...child));
                });
            } else {
                html.push(children);
            }
        }
        html.push('</' + tag + '>');
    }
    return html.join('');
}

/**
 * Create a DOM element
 *
 * @param {String} tag
 * @param {Object} props (optional)
 * @param {String|Array|Node|NodeList} children (optional)
 * @return {Element}
 * @api public
 */
export function createElement(tag, props = null, children = null) {
    const el = doc.createElement(tag);
    if (props) {
        enumerate(props, (key, value) => {
            setProperty(el, key, value);
        });
    }
    if (children) {
        switch (type(children)) {
            case 'element':
            case 'textnode':
                el.appendChild(children);
                break;
            case 'array':
                each(children, (child) => {
                    el.appendChild(
                        isArray(child) ? createElement(...child) : child
                    );
                });
                break;
            default:
                el.appendChild(doc.createTextNode(children));
        }
    }
    return el;
}
