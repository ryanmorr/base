import { expect } from 'chai';
import { inherit } from '../../../src/lang';

describe('lang/inherit', () => {
    it('should be able to inherit the properties of one function\'s prototype to another function\s prototype', () => {
        function A() {}
        A.prototype.foo = function() {
            return 'bar';
        };
        function B() {}
        inherit(B, A);
        const b = new B();
        expect('foo' in b).to.be.true;
        expect(b.foo).to.be.a('function');
        expect(b.foo()).to.equal('bar');
    });

    it('should set the constructor of the subclass to the constructor function', () => {
        function A() {}
        function B() {}
        inherit(B, A);
        const b = new B();
        expect(b.constructor).to.equal(B);
    });
});
