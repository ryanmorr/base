/**
 * Curry a function with prepending
 * arguments
 *
 * @param {Function} fn
 * @param {...*} args
 * @return {Function}
 * @api public
 */
export function curry(fn, ...args) {
    return (...newArgs) => fn.apply(this, args.concat(newArgs));
}

/**
 * Create a partial function with
 * default arguments that can be
 * overridden
 *
 * @param {Function} fn
 * @param {...*} args
 * @return {Function}
 * @api public
 */
export function partial(fn, ...args) {
    return (...newArgs) => {
        for (let i = 0, len = newArgs.length; i < len; i++) {
            args[i] = newArgs[i];
        }
        return fn.apply(this, args);
    };
}

/**
 * Create a function that always
 * returns the same value
 *
 * @param {*} value
 * @return {Function}
 * @api public
 */
export function constant(value) {
    return () => value;
}

/**
 * Create a function that caches
 * the return value on the initial
 * invocation and returns the same
 * value for every following invocation
 *
 * @param {ArrayLike} obj
 * @return {Array}
 * @api public
 */
export function cache(fn) {
    let called = false, value;
    return () => {
        if (!called) {
            value = fn();
            called = true;
        }
        return value;
    };
}

/**
 * Create a function that wraps the
 * provided function in a try/catch
 * block
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */
export function protect(fn) {
    return (...args) => {
        try {
            return fn.apply(this, args);
        } catch (e) {
            return void 0;
        }
    };
}

/**
 * Creates the composition of the
 * functions passed in
 *
 * @param {...Function} functions
 * @return {Function}
 * @api public
 */
export function compose(...functions) {
    const length = functions.length;
    return (...args) => {
        let result;
        if (length) {
            result = functions[length - 1].apply(this, args);
        }
        for (let i = length - 2; i >= 0; i--) {
            result = functions[i].call(this, result);
        }
        return result;
    };
}

/**
 * Generic factory function to construct
 * an object given the constructor and
 * the arguments
 *
 * @param {Function} constructor
 * @param {...*} args
 * @return {Function}
 * @api public
 */
export function factory(constructor, ...args) {
    return (...newArgs) => {
        args = args.concat(newArgs);
        return new constructor(...args); // eslint-disable-line new-cap
    };
}
