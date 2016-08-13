import { expect } from 'chai';
import { hashCode } from '../../../src/lang';

// Validate that a hash code is a number,
// finite, and an integer
function isValidHashCode(hash) {
    if (typeof hash !== 'number') {
        return false;
    }
    if (!isFinite(hash)) {
        return false;
    }
    if (hash % 1 !== 0) {
        return false;
    }
    return true;
}

describe('lang/hashCode', () => {
    it('should return 0 for null and undefined', () => {
        expect(hashCode(null)).to.equal(0);
        expect(hashCode(void 0)).to.equal(0);
    });

    it('should support strings', () => {
        const hash = hashCode('foo');
        expect(isValidHashCode(hash)).to.be.true;
    });

    it('should support numbers', () => {
        const hash = hashCode(123);
        expect(isValidHashCode(hash)).to.be.true;
    });

    it('should support booleans', () => {
        const hash = hashCode(true);
        expect(isValidHashCode(hash)).to.be.true;
    });

    it('should support dates', () => {
        const hash = hashCode(new Date());
        expect(isValidHashCode(hash)).to.be.true;
    });

    it('should support regular expressions', () => {
        const hash = hashCode(/foo/);
        expect(isValidHashCode(hash)).to.be.true;
    });

    it('should support functions', () => {
        const hash = hashCode(function() { return 1 + 1; });
        expect(isValidHashCode(hash)).to.be.true;
    });

    it('should support errors', () => {
        const hash = hashCode(new Error());
        expect(isValidHashCode(hash)).to.be.true;
    });

    it('should support arrays', () => {
        const hash = hashCode(['foo', 123, false]);
        expect(isValidHashCode(hash)).to.be.true;
    });

    it('should support objects', () => {
        const hash = hashCode({
            foo: 'foo',
            bar: 123,
            baz: /baz/
        });
        expect(isValidHashCode(hash)).to.be.true;
    });

    it('should return the same integer representation for two deeply equal objects', () => {
        const hash1 = hashCode({foo: 123, bar: ['foo', 'bar'], baz: {a: /foo/, b: true, c: new Date()}});
        const hash2 = hashCode({foo: 123, bar: ['foo', 'bar'], baz: {a: /foo/, b: true, c: new Date()}});
        expect(hash1).to.equal(hash2);
    });
});
