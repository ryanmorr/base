import { expect } from 'chai';
import { register, unregister, retrieve } from '../../../src/app';
import { BaseObject } from '../../../src/lang';

describe('app/registry', () => {
    it('should support adding an object to the registry', () => {
        const foo = 123;
        register('foo', foo);
        expect(retrieve('foo')).to.equal(123);
    });

    it('should use an object\'s id method if it exists and no id is provided to store the object', () => {
        const obj = new BaseObject();
        register(obj);
        expect(retrieve(obj.id())).to.equal(obj);
    });

    it('should return null if the id doesn\'t exist within the registry', () => {
        expect(retrieve('bar')).to.equal(null);
    });

    it('should support removing an object from the registry via the id', () => {
        const bar = 456;
        register('bar', bar);
        expect(retrieve('bar')).to.equal(456);
        unregister('bar');
        expect(retrieve('bar')).to.equal(null);
    });

    it('should support removing an object from the registry via the object itself', () => {
        const bar = 456;
        register('bar', bar);
        expect(retrieve('bar')).to.equal(456);
        unregister(bar);
        expect(retrieve('bar')).to.equal(null);
    });
});
