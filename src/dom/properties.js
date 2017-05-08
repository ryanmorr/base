/**
 * Import dependencies
 */
import { isString } from '../lang';
import { enumerate } from '../object';

/**
 * Map HTML attributes to DOM properties
 */
const propertyMap = {
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    for: 'htmlFor',
    class: 'className',
    maxlength: 'maxLength',
    cellspacing: 'cellSpacing',
    cellpadding: 'cellPadding',
    rowspan: 'rowSpan',
    colspan: 'colSpan',
    usemap: 'useMap',
    frameborder: 'frameBorder',
    contenteditable: 'contentEditable'
};

/**
 * Get a property of an
 * element
 *
 * @param {Element} el
 * @param {String} prop
 * @return {String}
 * @api public
 */
export function getProperty(el, prop) {
    prop = propertyMap[prop] || prop;
    return prop in el ? el[prop] : null;
}

/**
 * Set an attribute on an
 * element
 *
 * @param {Element} el
 * @param {String|Object} prop
 * @param {String|Number|Boolean} value (optional)
 * @api public
 */
export function setProperty(el, prop, value) {
    if (isString(prop)) {
        prop = propertyMap[prop] || prop;
        el[prop] = value;
        return;
    }
    enumerate(prop, (key, value) => setProperty(el, key, value));
}

/**
 * Remove an attribute on an
 * element
 *
 * @param {Element} el
 * @param {String} prop
 * @api public
 */
export function removeProperty(el, prop) {
    prop = propertyMap[prop] || prop;
    delete el[prop];
}
