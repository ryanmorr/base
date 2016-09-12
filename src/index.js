/**
 * Import modules
 */
import * as lang from './lang';
import * as array from './array';
import * as object from './object';

/**
 * Export module namespaces individually
 */
export {
    lang,
    array,
    object
};

/**
 * Declare `base` namespace
 */
const base = {
    lang,
    array,
    object
};

/**
 * Export `base` namespace
 */
export default base;
