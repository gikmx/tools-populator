import Test from 'ava';
import Populator from '../lib/populator';
import Types from '../lib/types';

Test('should throw an error when sent a non-object as subject', test =>
    test.throws(() => Populator('foo'), err =>
        err.name === Types.ParamError.name &&
        err.message.match(/Invalid parameter «subject»/) !== null,
    ),
);

Test('should throw when using non existent key.', (test) => {
    test.throws(() => Populator({ a: '${b}' }), err =>
        err.name === Types.KeyError.name &&
        err.message.match(/it does not exist/) !== null,
    );
});

Test('should throw when using invalid key.', (test) => {
    test.throws(() => Populator({ a: true, b: '${a}' }), err =>
        err.name === Types.KeyTypeError.name &&
        err.message.match(/Expecting/) !== null,
    );
});

Test('should resolve the example correctly', (test) => {
    test.plan(2);
    const subject = {
        a: { b: { c: 'world' } },
        d: 'hello ${a.b.c}${e}',
        e: '!!!',
    };
    test.notThrows(() => Populator(subject));
    test.deepEqual(Populator(subject), {
        a: { b: { c: 'world' } },
        d: 'hello world!!!',
        e: '!!!',
    });
});
