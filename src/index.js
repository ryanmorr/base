/**
 * Import polyfills
 */
import 'es6-promise/auto';

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
import * as env from './env';

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
    events,
    env
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
    events,
    env
};

/**
 * Export `base` namespace
 */
export default base;
