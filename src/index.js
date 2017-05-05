/**
 * Import modules
 */
import * as app from './app';
import * as lang from './lang';
import * as array from './array';
import * as object from './object';
import * as func from './function';
import * as string from './string';
import * as css from './css';

/**
 * Export module namespaces individually
 */
export {
    app,
    lang,
    array,
    object,
    func,
    string,
    css
};

/**
 * Declare `base` namespace
 */
const base = {
    app,
    lang,
    array,
    object,
    func,
    string,
    css
};

/**
 * Export `base` namespace
 */
export default base;
