import { expect } from 'chai';
import { getName } from '../../../src/lang';

describe('get-name', () => {
    it('should identify null and undefined', () => {
        expect(getName(null)).to.equal('null');
        expect(getName(undefined)).to.equal('undefined');
    });

    it('should return the name of a named function/class/constructor', () => {
        function foo() {}
        class qux {}
        expect(getName(foo)).to.equal('foo');
        expect(getName(qux)).to.equal('qux');
        expect(getName(Array)).to.equal('Array');
        expect(getName(Date)).to.equal('Date');
        expect(getName(Boolean)).to.equal('Boolean');
    });

    it('should return the name of an instance\'s constructor function', () => {
        function Foo() {}
        class Bar {}
        const foo = new Foo();
        const bar = new Bar();
        expect(getName(foo)).to.equal('Foo');
        expect(getName(bar)).to.equal('Bar');
        expect(getName([])).to.equal('Array');
        expect(getName({})).to.equal('Object');
        expect(getName(true)).to.equal('Boolean');
    });

    it('should support the displayName property if it is defined', () => {
        const foo = function() {}; // eslint-disable-line func-names
        foo.displayName = 'bar';
        expect(getName(foo)).to.equal('bar');
    });

    it('should return an empty string for anonymous functions', () => {
        // eslint-disable-next-line func-names, prefer-arrow-callback
        expect(getName(function() {})).to.equal('');
        expect(getName(() => {})).to.equal('');
    });
});
