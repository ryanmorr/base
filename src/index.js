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
import * as dom from './dom';
import * as events from './events';

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
    css,
    dom,
    events
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
    css,
    dom,
    events
};

/**
 * Export `base` namespace
 */
export default base;
