import { expect } from 'chai';
import { mixin } from '../../../src/lang';

describe('lang/mixin', () => {
    let assign, undef;

    before(() => {
        assign = Object.assign;
        Object.assign = undef;
    });

    after(() => {
        Object.assign = assign;
    });

    it('should support merging of a source object onto a target object', () => {
        expect(mixin({foo: 1}, {bar: 2})).to.deep.equal({foo: 1, bar: 2});
    });

    it('should support merging of multiple source objects onto a target object (right overwrites left)', () => {
        expect(mixin({foo: 1}, {bar: 2}, {foo: 10, baz: 3})).to.deep.equal({foo: 10, bar: 2, baz: 3});
    });

    it('should return the target object', () => {
        const target = {};
        const returnValue = mixin(target, {foo: 1});
        expect(returnValue).to.equal(target);
    });

    it('should only merge own properties', () => {
        const Foo = function() {};
        Foo.prototype.foo = 1;
        const foo = new Foo();
        foo.bar = 2;
        expect(mixin({baz: 3}, foo)).to.deep.equal({bar: 2, baz: 3});
    });

    if (typeof Symbol !== 'undefined') {
        it('should support symbol properties', () => {
            const target = {};
            const source = {};
            const symbol = Symbol('foo');
            source[symbol] = 'bar';
            mixin(target, source);
            expect(target[symbol]).to.equal('bar');
        });

        it('should only copy enumerable symbols', () => {
            const target = {};
            const source = {};
            const symbol = Symbol('foo');
            Object.defineProperty(source, symbol, {
                enumerable: false,
                value: 'bar'
            });
            mixin(target, source);
            expect(target[symbol]).to.equal(void 0);
        });
    }
});
