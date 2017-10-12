import Test from 'ava';
import Populator from '../lib/populator';
import Types from '../lib/types';

Test('should throw an error when sent a non-object as subject', test =>
    test.throws(() => Populator('foo'), err =>
        err.name === Types.TypeError.name &&
        err.message.indexOf(Types.TypeError.message) === 0,
    ),
);

Test('should throw when using invalid property as key', (test) => {
    test.plan(2);
    test.throws(() => Populator({ a: '${b}' }), err =>
        err.name === Types.KeyError.name &&
        err.message.indexOf(Types.KeyError.message) === 0,
    );
    test.throws(() => Populator({ a: true, b: '${a}' }), err =>
        err.name === Types.KeyError.name &&
        err.message.indexOf(Types.KeyError.message) === 0,
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
