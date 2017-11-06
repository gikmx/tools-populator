/* globals test,expect */
import { Replacer } from '@gik/tools-thrower';
import Populator from '../lib/populator';
import Types from '../lib/types';

test('should throw an error when sent a non-object as subject', () => {
    expect.assertions(2);
    try {
        Populator('foo');
    } catch (err) {
        expect(err.name).toBe(Types.ParamError.name);
        const msg = Replacer(Types.ParamError.message, ['subject', 'Object', 'string']);
        expect(err.message).toBe(msg);
    }
});

test('should throw when using non existent key.', () => {
    expect.assertions(2);
    try {
        Populator({ a: '${b}' });
    } catch (err) {
        expect(err.name).toBe(Types.KeyError.name);
        const msg = Replacer(Types.KeyError.message, ['a', 'b']);
        expect(err.message).toBe(msg);
    }
});

test('should throw when using invalid key.', () => {
    expect.assertions(2);
    try {
        Populator({ a: true, b: '${a}' });
    } catch (err) {
        expect(err.name).toBe(Types.KeyTypeError.name);
        const msg = Replacer(Types.KeyTypeError.message, ['b', 'a', 'boolean']);
        expect(err.message).toBe(msg);
    }
});

test('should resolve the example correctly', () => {
    expect.assertions(2);
    const subject = {
        a: { b: { c: 'world' } },
        d: 'hello ${a.b.c}${e}',
        e: '!!!',
        f: ['${e}', '${a.b.c}'],
    };
    expect(() => Populator(subject)).not.toThrow();
    expect(Populator(subject)).toEqual({
        a: { b: { c: 'world' } },
        d: 'hello world!!!',
        e: '!!!',
        f: ['!!!', 'world'],
    });
});
