/**
 * Import dependencies
 */
import { entries, merge } from './index';

/**
 * Get a bare object (no prototype) for the
 * purpose of a simple hash map
 *
 * @param {...Object} props
 * @return {Object}
 * @api public
 */
export default function hashmap(...props) {
    const map = Object.create(null);
    if (typeof Symbol !== 'undefined' && Symbol.iterator) {
        Object.defineProperty(map, Symbol.iterator, {
            enumerable: false,
            writable: false,
            configurable: false,
            value: () => ({
                items: entries(map),
                next() {
                    return {
                        done: this.items.length === 0,
                        value: this.items.shift()
                    };
                }
            })
        });
    }
    if (props.length) {
        merge(map, ...props);
    }
    return map;
}
