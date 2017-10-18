
/**
 * The provided `subject` to the Populator is not the expected type.
 * @typedef {Error}
 * @memberof Types
 */
export const PupulatorParamError = {
    name: 'PupulatorParamError',
    message: 'Invalid parameter «%s». Expecting {%s}, got "%s',
};

/**
 * The provided key cannot be used to populate the current property.
 * @typedef {Error}
 * @memberof Types
 */
export const PopulatorKeyError = {
    name: 'PopulatorKeyError',
    message: 'The key "%s" cannot be used on «%s» because it does not exist.',
};

/**
 * The provided key cannot be used because is not a valid type.
 * @typedef {Error}
 * @memberof Types
 */
export const PopulatorKeyTypeError = {
    name: 'PopulatorKeyTypeError',
    message: 'The key "%s" cannot be used on «%s». Expecting {string|number}, got "%s"',
};

export default {
    ParamError: PupulatorParamError,
    KeyError: PopulatorKeyError,
    KeyTypeError: PopulatorKeyTypeError,
};
