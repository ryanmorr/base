/**
 * Import modules
 */
import * as lang from './lang';
import * as array from './array';

/**
 * Export module namespaces individually
 */
export {
    lang,
    array
};

/**
 * Declare and export `base` namespace
 */
const base = {lang, array};
export default base;
