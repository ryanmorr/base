/**
 * Facilitate inheritance by creating a delegate
 * of a superclass on the prototype of a subclass
 *
 * @param {Function} subclass
 * @param {Function} superclass
 * @api public
 */
export default function inherit(subclass, superclass) {
    subclass.prototype = Object.create(superclass.prototype, {
        constructor: {
            value: subclass
        }
    });
}
