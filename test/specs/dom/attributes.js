import { expect } from 'chai';
import { getAttribute, setAttribute, removeAttribute } from '../../../src/dom';

describe('dom/attributes', () => {
    const el = document.createElement('div');

    describe('getAttribute', () => {
        it('should get the attribute of an element', () => {
            el.setAttribute('id', 'foo');
            expect(getAttribute(el, 'id')).to.equal('foo');
        });

        it('should return null for unsupported attributes', () => {
            expect(getAttribute(el, 'foo')).to.equal(null);
        });
    });

    describe('setAttribute', () => {
        it('should set the attribute to the provided value', () => {
            setAttribute(el, 'class', 'bar');
            expect(el.className).to.equal('bar');
        });

        it('should be able to provide a hash map of attributes/values to set multiple attributes at once', () => {
            setAttribute(el, {
                foo: 'a',
                bar: 'b',
                baz: 'c'
            });
            expect(el.getAttribute('foo')).to.equal('a');
            expect(el.getAttribute('bar')).to.equal('b');
            expect(el.getAttribute('baz')).to.equal('c');
        });

        it('should remove the attribute if provided a null value', () => {
            setAttribute(el, 'foo', 'bar');
            expect(el.hasAttribute('foo')).to.equal(true);
            setAttribute(el, 'foo', null);
            expect(el.hasAttribute('foo')).to.equal(false);
        });

        it('should remove the attribute if provided a false value', () => {
            setAttribute(el, 'foo', 'bar');
            expect(el.hasAttribute('foo')).to.equal(true);
            setAttribute(el, 'foo', false);
            expect(el.hasAttribute('foo')).to.equal(false);
        });
    });

    describe('removeAttribute', () => {
        it('should remove the provided attribute', () => {
            el.setAttribute('foo', 'bar');
            expect(el.hasAttribute('foo')).to.equal(true);
            removeAttribute(el, 'foo');
            expect(el.hasAttribute('foo')).to.equal(false);
        });
    });
});
