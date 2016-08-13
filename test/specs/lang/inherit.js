import { expect } from 'chai';
import { inherit } from '../../../src/lang';

describe('lang/inherit', () => {
    it('should be able to inherit the properties of one function\'s prototype to another function\s prototype', () => {
        const A = function() {};
        A.prototype.foo = function() {
            return 'bar';
        };
        const B = function() {};
        inherit(B, A);
        const b = new B();
        expect('foo' in b).to.be.true;
        expect(b.foo).to.be.a('function');
        expect(b.foo()).to.equal('bar');
    });

    it('should set the constructor of the subclass to the constructor function', () => {
        const A = function() {};
        const B = function() {};
        inherit(B, A);
        const b = new B();
        expect(b.constructor).to.equal(B);
    });
});
