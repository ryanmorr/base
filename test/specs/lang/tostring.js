/* eslint-disable max-len, no-unused-expressions */

import { expect } from 'chai';
import { toString } from '../../../src/lang';

describe('lang/toString', () => {
    it('should return the internal [[Class]] of an object without the cruft be default', () => {
        expect(toString('foo')).to.equal('String');
        expect(toString(123)).to.equal('Number');
        expect(toString(true)).to.equal('Boolean');
        expect(toString([])).to.equal('Array');
        expect(toString({})).to.equal('Object');
    });

    it('should return the internal [[Class]] including the cruft when passed false as an optional second argument', () => {
        expect(toString('foo', false)).to.equal('[object String]');
        expect(toString(123, false)).to.equal('[object Number]');
        expect(toString(true, false)).to.equal('[object Boolean]');
        expect(toString([], false)).to.equal('[object Array]');
        expect(toString({}, false)).to.equal('[object Object]');
    });
});
