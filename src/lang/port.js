/**
 * Port an object method to be
 * used standalone
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */
export default function port(fn) {
    return Function.prototype.bind.call(Function.call, fn);
}
