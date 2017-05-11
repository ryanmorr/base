/**
 * Import dependencies
 */
import { isNull } from '../lang';
import { enumerate, hashmap } from '../object';

/**
 * Mixin for classes and objects to
 * support custom events
 *
 * @mixin
 * @api public
 */
const Observable = hashmap({

    /**
     * Define custom events for a class
     *
     * @param {...String} events
     * @api public
     */
    addEvents(...events) {
        this.customEvents = this.customEvents || hashmap();
        events.forEach((name) => {
            this.customEvents[name] = null;
        });
    },

    /**
     * Add a listener callback for a
     * custom event
     *
     * @param {String} name
     * @param {Function} fn
     * @param {*} ctx (optional)
     * @api public
     */
    addListener(name, fn, ctx = null) {
        let evt = this.customEvents[name];
        if (isNull(evt)) {
            evt = [];
            this.customEvents[name] = evt;
        }
        evt.push(ctx ? fn.bind(ctx) : fn);
    },

    /**
     * Remove a listener for a custom
     * event
     *
     * @param {String} name
     * @param {Function} fn
     * @api public
     */
    removeListener(name, fn) {
        const evt = this.customEvents[name];
        if (!isNull(evt)) {
            for (let i = 0, len = evt.length; i < len; i++) {
                if (evt[i] === fn) {
                    evt.splice(i, 1);
                    return;
                }
            }
        }
    },

    /**
     * Clear all listeners of custom
     * events
     *
     * @api public
     */
    clearListeners() {
        enumerate(this.customEvents, (name, evt) => {
            if (!isNull(evt)) {
                this.customEvents[name] = [];
            }
        });
    },

    /**
     * Dispatch a custom event to the
     * listeners
     *
     * @param {String} name
     * @param {...*} args
     * @api public
     */
    dispatchEvent(name, ...args) {
        const evt = this.customEvents[name];
        if (!isNull(evt) && evt.length) {
            evt.forEach((listener) => listener(...args));
        }
    }
});

/**
 * Alias `addListener` and `removeListener`
 * with the preferred `on` and `off` methods
 */
Observable.on = Observable.addListener;
Observable.off = Observable.removeListener;

/**
 * export `Observable`
 */
export default Observable;
