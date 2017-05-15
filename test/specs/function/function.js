import { expect } from 'chai';
import sinon from 'sinon';
import { func } from '../../../src';

const { curry, partial, constant, cache, protect, compose, factory } = func;

describe('function/function', () => {
    describe('curry', () => {
        const fn = curry((...args) => args.join(''), 1, 2, 3);

        it('should return a function with default arguments', () => {
            expect(fn).to.be.a('function');
            expect(fn()).to.equal('123');
        });

        it('should be able to append arguments in addition to the default arguments', () => {
            expect(fn(4, 5, 6)).to.equal('123456');
        });
    });

    describe('partial', () => {
        const fn = partial((...args) => args.join(''), 1, 2, 3);

        it('should return a function with default arguments', () => {
            expect(fn).to.be.a('function');
            expect(fn()).to.equal('123');
        });

        it('should be able to override the default arguments at the same index', () => {
            expect(fn(4, 5)).to.equal('453');
        });
    });

    describe('constant', () => {
        it('should create a function that always returns the same value', () => {
            const fn = constant(true);
            expect(fn).to.be.a('function');
            expect(fn()).to.equal(true);
        });
    });

    describe('cache', () => {
        it('should create a function that caches the return value on the initial invocation and returns the same value for every following invocation', () => {
            const spy = sinon.spy(() => 'foo');
            const fn = cache(spy);
            expect(fn).to.be.a('function');
            expect(fn()).to.equal('foo');
            expect(spy.callCount).to.equal(1);
            expect(fn()).to.equal('foo');
            expect(spy.callCount).to.equal(1);
        });
    });

    describe('protect', () => {
        it('should create a function that wraps the provided function in a try/catch block', () => {
            const fn = protect((err) => {
                if (err) {
                    throw new Error();
                }
                return 'foo';
            });
            expect(fn).to.be.a('function');
            expect(fn()).to.equal('foo');
            expect(() => fn(true)).to.not.throw(Error);
            expect(fn(true)).to.be.undefined;
        });
    });

    describe('compose', () => {
        it('should create the composition of the functions passed in', () => {
            const uppercase = (str) => str.toUpperCase();
            const prepend = (str) => '(' + str;
            const append = (str) => str + ')';
            const fn = compose(prepend, append, uppercase);
            expect(fn).to.be.a('function');
            expect(fn('foo')).to.equal('(FOO)');
        });
    });

    describe('factory', () => {
        it('should create a factory function for the provided constructor and arguments', () => {
            const constructor = function(...args) {
                this.args = args.join('');
            };
            const fn = factory(constructor, 1, 2, 3);
            const instance = fn();
            expect(fn).to.be.a('function');
            expect(instance).to.be.instanceof(constructor);
            expect(instance.args).to.equal('123');
        });
    });
});
