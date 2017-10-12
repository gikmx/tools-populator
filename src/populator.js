import { Is } from '@gik/tools-checker';
import Thrower from '@gik/tools-thrower';
import Mapper from '@gik/tools-mapper';

import { populatorTypeError as TypeErr, populatorKeyError as KeyErr } from './types';

/**
 * Allows properties in an object to inherit values from sibling properties.
 * This specially useful when creating JSON configuration files.
 *
 * @name pupulator
 * @memberof Tools
 *
 * @param {Object} subject - The object you need to be populated.
 * @returns {Object}
 *
 * @example
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
        throw Thrower(`${TypeErr.message}, got '${typeof subject}'`, TypeErr.name);

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
                    const repl = replaces[match[1]];
                    const emsg = `${KeyErr.message} '${key}'`;
                    // make sure the property exist
                    if (repl === undefined)
                        throw Thrower(`${emsg} does not exist.`, KeyErr.name);
                    // only allow numbers and strings for replacements
                    if (!Is.number(repl) && !Is.string(repl)) {
                        throw Thrower(
                            `${emsg}. Expecting {string|number}, got '${typeof repl}'`,
                            KeyErr.name,
                        );
                    }
                    val = [ // eslint-disable-line no-param-reassign
                        val.substr(0, match.index),
                        replaces[match[1]],
                        val.substr(match.index + match[0].length),
                    ].join('');
                } while (true);
                return val;
            }.call(null, obj[key]),
    }), {});

    return replacer(subject, Mapper(subject));
}
