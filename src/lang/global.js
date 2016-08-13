/**
 * Is the object the global object?
 *
 * @param {*} obj
 * @return {Boolean}
 * @api private
 */
function isGlobal(obj) {
    return typeof obj !== 'undefined' && obj && obj.Object === Object;
}

/**
 * Import dependencies
 */
const global = (() => {
    if (typeof System === 'object' && System.global && isGlobal(System.global)) {
        return System.global;
    }
    /**
     * Browser
     */
    if (isGlobal(window)) {
        return window;
    }
    /**
     * Node
     */
    if (isGlobal(global)) {
        return global;
    }
    /**
     * Web Worker
     */
    if (isGlobal(self)) {
        return self;
    }
    /**
     * The `Function` constructor
     * executes in the global context
     */
    return Function('return this')(); // eslint-disable-line no-new-func
})();

/**
 * Export global
 */
export default global;
