/**
 * Get the supported object property
 * name for the current environment
 *
 * @param {*} object
 * @param {Array} properties
 * @return {String|Null}
 * @api public
 */
export function prefix(object, properties) {
    return properties.reduce((supportedProp, prop) => {
        if (supportedProp) {
            return supportedProp;
        }
        return prop in object ? prop : supportedProp;
    }, null);
}

/**
 * Get the supported object method for
 * the current environment
 *
 * @param {*} object
 * @param {Array} properties
 * @return {Function|Null}
 * @api public
 */
export function prefixed(object, properties) {
    const prop = prefix(object, properties);
    if (!prop) {
        return null;
    }
    return object[prop].bind(object);
}
