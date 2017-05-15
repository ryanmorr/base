import { expect } from 'chai';
import { dom } from '../../../src';

const { getProperty, setProperty, removeProperty } = dom;

describe('dom/properties', () => {
    const el = document.createElement('div');

    describe('getProperty', () => {
        it('should get the attribute of an element', () => {
            el.id = 'foo';
            expect(getProperty(el, 'id')).to.equal('foo');
        });

        it('should return null for unsupported attributes', () => {
            expect(getProperty(el, 'foo')).to.equal(null);
        });
    });

    describe('setProperty', () => {
        it('should set the attribute to the provided value', () => {
            setProperty(el, 'class', 'bar');
            expect(el.className).to.equal('bar');
        });

        it('should be able to provide a hash map of attributes/values to set multiple attributes at once', () => {
            setProperty(el, {
                foo: 'a',
                bar: 'b',
                baz: 'c'
            });
            expect(el.foo).to.equal('a');
            expect(el.bar).to.equal('b');
            expect(el.baz).to.equal('c');
        });
    });

    describe('removeProperty', () => {
        it('should remove the provided attribute', () => {
            el.foo = 'bar';
            expect('foo' in el).to.equal(true);
            removeProperty(el, 'foo');
            expect('foo' in el).to.equal(false);
        });
    });
});
