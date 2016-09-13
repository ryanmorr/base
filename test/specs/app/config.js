import { expect } from 'chai';
import { config } from '../../../src/app';

describe('app/config', () => {
    it('should support setting and getting a value', () => {
        config('foo', 1);
        expect(config('foo')).to.equal(1);
    });

    it('should return null if the config name doesn\'t exist', () => {
        expect(config('bar')).to.equal(null);
    });

    it('should support setting multiple values by providing an object literal', () => {
        config({foo: 10, bar: 20, baz: 30});
        expect(config('foo')).to.equal(10);
        expect(config('bar')).to.equal(20);
        expect(config('baz')).to.equal(30);
    });
});
