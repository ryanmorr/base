/**
 * Import dependencies
 */
import { hasOwnProperty, mixin, inherit, uid, hashCode } from './index';

/**
 * Define default property descriptors
 */
const propertyDefaults = {
    enumerable: true,
    configurable: true,
    writable: true
};

/**
 * Name of the `id` property, use Symbol
 * if supported as a means of protection
 */
const id = (() => {
    if (typeof Symbol === 'function' && typeof Symbol() === 'symbol') {
        return Symbol('id');
    }
    return '$id';
})();

/**
 * Print a message to the console
 *
 * @param {String} type
 * @param {String} msg
 * @api private
 */
export function print(type, msg) {
    /* eslint-disable no-console */
    if (console && type in console) {
        console[type](msg);
    }
    /* eslint-enable no-console */
}

/**
 * Format a message to be identifiable to
 * the originating class and instance
 *
 * @param {Object} obj
 * @param {String} msg
 * @return {String}
 * @api private
 */
export function formatMessage(obj, msg) {
    return `${obj.getClassName()}(#${obj.id()}): ${msg}`;
}

/**
 * Abstract class to provide additional
 * functionality and helper methods for
 * other classes to inherit
 *
 * @class BaseObject
 * @api public
 */
export default class BaseObject {

    /**
     * Instantiate the object, optionally provided
     * a key/value map of configuration properties
     *
     * @constructor
     * @param {Object} properties (optional)
     * @api public
     */
    constructor(properties) {
        this.defineProperty(id, uid(), {
            enumerable: false,
            configurable: false,
            writable: false
        });
        if (properties) {
            this.defineProperties(properties);
        }
        this.initialize();
    }

    /**
     * Initialize the instance, override this
     * and not the constructor
     *
     * @api public
     */
    initialize() {}

    /**
     * Class destructor to purge references
     *
     * @return {BaseObject}
     * @api public
     */
    destroy() {
        Object.getOwnPropertyNames(this).forEach((prop) => {
            if (prop !== id) {
                this.removeProperty(prop);
            }
        });
        // Ensure `destroy` can only be called once
        this.destroy = () => this.warn('Instance already destroyed');
        return this;
    }

    /**
     * Return the unique identifier for
     * this instance
     *
     * @return {String}
     * @api public
     */
    id() {
        return this[id];
    }

    /**
     * Define properties for the instance
     *
     * @param {Object} properties
     * @return {BaseObject}
     * @api public
     */
    defineProperties(properties) {
        for (const name in properties) {
            if (hasOwnProperty(properties, name)) {
                this.defineProperty(name, properties[name]);
            }
        }
        return this;
    }

    /**
     * Define a property for the instance
     * and optionally provide a descriptor
     *
     * @param {String} name
     * @param {*} value
     * @param {Object} descriptor (optional)
     * @return {BaseObject}
     * @api public
     */
    defineProperty(name, value, descriptor = {}) {
        Object.defineProperty(this, name, mixin({value}, propertyDefaults, descriptor));
        return this;
    }

    /**
     * Check the existence of an instance
     * property
     *
     * @param {String} name
     * @return {Boolean}
     * @api public
     */
    hasProperty(name) {
        return name in this;
    }

    /**
     * Get the value of an instance property
     *
     * @param {String} name
     * @return {*}
     * @api public
     */
    getProperty(name) {
        return this.hasProperty(name) ? this[name] : null;
    }

    /**
     * Set the value of an instance property,
     * differs from `defineProperty` by not
     * including descriptor
     *
     * @param {String} name
     * @param {*} value
     * @return {BaseObject}
     * @api public
     */
    setProperty(name, value) {
        this[name] = value;
        return this;
    }

    /**
     * Remove an instance property if it exists
     *
     * @param {String} name
     * @return {BaseObject}
     * @api public
     */
    removeProperty(name) {
        if (!this.hasProperty(name)) {
            this.warn(`"${name}" property does not exist`);
        } else {
            delete this[name];
        }
        return this;
    }

    /**
     * Get the instance properties in a
     * key/value hash map
     *
     * @return {Object}
     * @api public
     */
    getProperties() {
        const map = Object.create(null);
        let obj = this;
        do {
            // eslint-disable-next-line no-loop-func
            Object.getOwnPropertyNames(obj).forEach((prop) => {
                if (prop !== id && !(prop in map)) {
                    map[prop] = obj[prop];
                }
            });
        } while ((obj = Object.getPrototypeOf(obj)));
        return map;
    }

    /**
     * Generate a hash code for an instance
     * based on its properties
     *
     * @return {String}
     * @api public
     */
    hashCode() {
        return hashCode(this.getProperties());
    }

    /**
     * Log to the console
     *
     * @param {String} msg
     * @return {BaseObject}
     * @api public
     */
    log(msg) {
        print('log', formatMessage(this, msg));
        return this;
    }

    /**
     * Log a warning to the console
     *
     * @param {String} msg
     * @return {BaseObject}
     * @api public
     */
    warn(msg) {
        print('warn', formatMessage(this, msg));
        return this;
    }

    /**
     * Throw an error that is identifiable to
     * the originating class and instance
     *
     * @param {String} msg
     * @api public
     */
    error(msg) {
        throw new Error(formatMessage(this, msg));
    }

    /**
     * Get the name of the class as a
     * string
     *
     * @return {String}
     * @api public
     */
    getClassName() {
        return this.constructor.name;
    }

    /**
     * Convert a hash map of instance properties
     * (not including functions) into a JSON
     * string
     *
     * @return {String}
     * @api public
     */
    toJSON() {
        const props = this.getProperties();
        return JSON.stringify(Object.keys(props).reduce((map, key) => {
            if (typeof props[key] === 'function') {
                return map;
            }
            map[key] = props[key];
            return map;
        }, {}));
    }

    /**
     * Get the instance type
     *
     * @return {String}
     * @api public
     */
    toString() {
        return `[object ${this.getClassName()}]`;
    }

    /**
     * Return an integer representation when the
     * instance is converted to a primitive
     *
     * @return {Number}
     * @api public
     */
    valueOf() {
        return this.hashCode();
    }

    /**
     * Add properties to the class prototype
     *
     * @static
     * @param {...Object} mixins
     * @api public
     */
    static mixin(...mixins) {
        return mixin(this.prototype, ...mixins);
    }

    /**
     * Inherit from class
     *
     * @static
     * @param {Function} subclass
     * @return {Function}
     * @api public
     */
    static extend(subclass) {
        inherit(subclass, this);
        return subclass;
    }
}
