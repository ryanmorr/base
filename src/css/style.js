/**
 * Import dependencies
 */
import { isString } from '../lang';
import { enumerate } from '../object';
import { toCamelCase } from '../string';

/**
 * Get the computed value of a style
 * property for an element
 *
 * @param {Element} el
 * @param {String} prop
 * @param {String} pseudoEl (optional)
 * @return {String}
 * @api public
 */
export function getStyle(el, prop, pseudoEl = null) {
    if (prop.indexOf('-') !== -1) {
        prop = toCamelCase(prop);
    }
    const view = el.ownerDocument.defaultView;
    const style = view.getComputedStyle(el, pseudoEl);
    return prop in style ? style[prop] : null;
}

/**
 * Set the style for an element
 *
 * @param {Element} el
 * @param {String} prop
 * @param {String|Number|Boolean} value
 * @api public
 */
export function setStyle(el, prop, value) {
    if (isString(prop)) {
        if (prop.indexOf('-') !== -1) {
            prop = toCamelCase(prop);
        }
        el.style[prop] = value;
        return;
    }
    enumerate(prop, (key, value) => {
        setStyle(el, key, value);
    });
}
