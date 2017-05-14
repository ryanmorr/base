/**
 * Common variables
 */
const camelRe = /-(\w)/g;
const kebabRe = /([a-z])([A-Z])/g;
const substituteRe = /\%s/;
const emptyRe = /^[\s\xa0]*$/;
const stripNewlinesRe = /(\r\n|\r|\n)+/g;
const canonicalizeNewlinesRe = /(\r\n|\r|\n)/g;
const extraWhitespaceRe = /[\s\xa0]+/g;
const multipleSpacesRe = /^\s+|\s+$/g;

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

/**
 * Substitute the placeholders (%s)
 * of a string with the provided
 * values in sequential order
 *
 * @param {String} str
 * @param {...String|Number|Boolean} values
 * @return {String}
 * @api public
 */
export function substitute(str, ...values) {
    values.forEach((value) => {
        str = str.replace(substituteRe, value);
    });
    return str;
}

/**
 * Checks if a string is empty or
 * contains only whitespaces.
 *
 * @param {String} str
 * @return {Boolean}
 * @api public
 */
export function isEmpty(str) {
    return emptyRe.test(str);
}

/**
 * Replace all new line characters
 * with a single space
 *
 * @param {String} str
 * @return {String}
 * @api public
 */
export function stripNewlines(str) {
    return str.replace(stripNewlinesRe, ' ');
}

/**
 * Replaces Windows and Mac new line
 * characters with unix style
 *
 * @param {String} str
 * @return {String}
 * @api public
 */
export function canonicalizeNewlines(str) {
    return str.replace(canonicalizeNewlinesRe, '\n');
}

/**
 * Converts multiple whitespace chars
 * (spaces, non-breaking-spaces, new lines
 * and tabs) to a single space, and strips
 * leading and trailing whitespace
 *
 * @param {String} str
 * @return {String}
 * @api public
 */
export function collapseWhitespace(str) {
    return str.replace(extraWhitespaceRe, ' ').replace(multipleSpacesRe, '');
}
