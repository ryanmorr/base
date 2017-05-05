/**
 * Common variables
 */
const camelRe = /-(\w)/g;
const kebabRe = /([a-z])([A-Z])/g;

/**
 * Convert kebab-case to camel-case
 *
 * @param {String} str
 * @return {String}
 * @api public
 */
export function toCamelCase(str) {
    return str.replace(camelRe, (all, m1) => m1.toUpperCase());
}

/**
 * Convert camel-case to kebab-case
 *
 * @param {String} str
 * @return {String}
 * @api public
 */
export function toKebabCase(str) {
    return str.replace(kebabRe, (all, m1, m2) => m1 + '-' + m2.toLowerCase());
}
