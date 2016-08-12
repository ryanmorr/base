import { expect } from 'chai';
import { hasOwnProperty } from '../../../src/lang';

describe('lang/hasOwnProperty', () => {
    it('should return true for direct properties', () => {
        const obj = {foo: 1, bar: 2};
        Object.defineProperty(obj, 'baz', {enumerable: false});
        expect(hasOwnProperty(obj, 'foo')).to.be.true;
        expect(hasOwnProperty(obj, 'bar')).to.be.true;
        expect(hasOwnProperty(obj, 'baz')).to.be.true;
    });

    it('should return false for properties inherited via the prototype chain', () => {
        expect(hasOwnProperty({}, 'hasOwnProperty')).to.be.false;
    });
});
