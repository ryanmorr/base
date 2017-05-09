/**
 * Import dependencies
 */
import { documentElement } from './index';

/**
 * Use feature testing to obtain
 * the proper `matches` method
 */
const method = [
    'matches',
    'matchesSelector',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'oMatchesSelector',
    'msMatchesSelector'
].reduce((name, current) => {
    if (name) {
        return name;
    }
    return current in documentElement ? current : name;
}, null);


/**
 * Does an element match a CSS
 * selector string
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */
export default function matches(el, selector) {
    return el[method](selector);
}
