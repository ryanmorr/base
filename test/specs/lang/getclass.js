import { expect } from 'chai';
import { getClass } from '../../../src/lang';

describe('lang/getClass', () => {
    it('should return the internal [[Class]] of an object without the cruft by default', () => {
        expect(getClass('foo')).to.equal('String');
        expect(getClass(123)).to.equal('Number');
        expect(getClass(true)).to.equal('Boolean');
        expect(getClass([])).to.equal('Array');
        expect(getClass({})).to.equal('Object');
    });

    it('should return the internal [[Class]] including the cruft when passed false as an optional second argument', () => {
        expect(getClass('foo', false)).to.equal('[object String]');
        expect(getClass(123, false)).to.equal('[object Number]');
        expect(getClass(true, false)).to.equal('[object Boolean]');
        expect(getClass([], false)).to.equal('[object Array]');
        expect(getClass({}, false)).to.equal('[object Object]');
    });
});
