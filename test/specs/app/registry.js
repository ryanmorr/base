import { expect } from 'chai';
import { app, lang } from '../../../src';

const { registry } = app;
const { BaseObject } = lang;

describe('app/registry', () => {
    it('should support adding an object to the registry', () => {
        const foo = 123;
        registry.add('foo', foo);
        expect(registry.get('foo')).to.equal(123);
    });

    it('should use an object\'s id method if it exists and no id is provided to store the object', () => {
        const obj = new BaseObject();
        registry.add(obj);
        expect(registry.get(obj.id())).to.equal(obj);
    });

    it('should return null if the id doesn\'t exist within the registry', () => {
        expect(registry.get('bar')).to.equal(null);
    });

    it('should support removing an object from the registry via the id', () => {
        const bar = 456;
        registry.add('bar', bar);
        expect(registry.get('bar')).to.equal(456);
        registry.remove('bar');
        expect(registry.get('bar')).to.equal(null);
    });

    it('should support removing an object from the registry via the object itself', () => {
        const bar = 456;
        registry.add('bar', bar);
        expect(registry.get('bar')).to.equal(456);
        registry.remove(bar);
        expect(registry.get('bar')).to.equal(null);
    });
});
