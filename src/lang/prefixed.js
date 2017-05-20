/**
 * Get the supported object method for
 * the current environment
 *
 * @param {*} object
 * @param {Array} properties
 * @return {Function|Null}
 * @api public
 */
export default function prefixed(object, properties) {
    const prop = properties.reduce((supportedProp, prop) => {
        if (supportedProp) {
            return supportedProp;
        }
        return prop in object ? prop : supportedProp;
    }, null);
    if (!prop) {
        return null;
    }
    return object[prop].bind(object);
}
