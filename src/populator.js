import { Is } from '@gik/tools-checker';
import Thrower from '@gik/tools-thrower';
import Mapper from '@gik/tools-mapper';
import Types from './types';

const { KeyError, KeyTypeError, ParamError } = Types;
/**
 * Allows properties in an object to inherit values from sibling properties.
 * This specially useful when creating JSON configuration files.
 *
 * @module populator
 *
 * @param {Object} subject - The object you need to be populated.
 * @returns {Object} - An object copy with references replaced.
 *
 * @example @lang js
 * const subject = {
 *     a: { b: { c: 'world' } },
 *     d: "hello ${a.b.c}${e}",
 *     e: "!!!",
 * };
 * const result = Populator(subject);
 * // result:
 * // { a: { b: { c: 'world' } }, d: "hello world!!!", e: "!!!" };
 */
export default function Populator(subject) {

    if (!Is.object(subject))
        Thrower([ParamError.message, 'subject', 'Object', typeof subject], ParamError.name);

    const replacer = (obj, replaces) => Object.keys(obj).reduce((result, key) => ({
        ...result,
        // if current key represents an object, be recursive, otherwise replace.
        [key]: Is.object(obj[key]) ?
            replacer(obj[key], replaces) :
            function replace(val) {
                if (!Is.string(val) || val.indexOf('${') === -1) return val;
                do { // eslint-disable-line no-constant-condition
                    const match = val.match(/\$\{([^}]+)\}/);
                    if (!match) break;
                    const prop = match[1];
                    const repl = replaces[prop];
                    // make sure the property exist
                    if (repl === undefined)
                        Thrower([KeyError.message, key, prop], KeyError.name);
                    // only allow numbers and strings for replacements
                    if (!Is.number(repl) && !Is.string(repl)) {
                        Thrower(
                            [KeyTypeError.message, key, prop, typeof repl],
                            KeyTypeError.name,
                        );
                    }
                    val = [ // eslint-disable-line no-param-reassign
                        val.substr(0, match.index),
                        replaces[match[1]],
                        val.substr(match.index + match[0].length),
                    ].join('');
                } while (true); // eslint-disable-line no-constant-condition
                return val;
            }.call(null, obj[key]),
    }), {});

    return replacer(subject, Mapper(subject));
}
