/**
 * Import modules
 */
import * as app from './app';
import * as lang from './lang';
import * as array from './array';
import * as object from './object';

/**
 * Export module namespaces individually
 */
export {
    app,
    lang,
    array,
    object
};

/**
 * Declare `base` namespace
 */
const base = {
    app,
    lang,
    array,
    object
};

/**
 * Export `base` namespace
 */
export default base;
