
/**
 * The provided `subject` to the Populator is not the expected type.
 * @typedef {Error} populatorTypeError
 * @memberof Tools.__types
 */
export const populatorTypeError = {
    name: 'populatorTypeError',
    message: 'Expecting subject to be {Object}',
};

/**
 * The provided key cannot be used to populate the current property.
 * @typedef {Error} populatorKeyError
 * @memberof Tools.__types
 */
export const populatorKeyError = {
    name: 'populatorKeyError',
    message: 'Invalid property',
};

/**
 * @namespace __types
 * @memberof Tools
 */
export default {
    TypeError: populatorTypeError,
    KeyError: populatorKeyError,
};
