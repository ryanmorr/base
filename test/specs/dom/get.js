import { expect } from 'chai';
import { dom, array } from '../../../src';

const { toArray } = array;
const { resolve, find, query } = dom;

describe('dom/get', () => {
    const el = document.createElement('div');
    el.id = 'foo';
    for (let i = 0; i < 3; i++) el.appendChild(document.createElement('i'));

    before(() => document.body.appendChild(el));
    after(() => document.body.removeChild(el));

    describe('resolve', () => {
        it('should return a DOM element if provided a selector string', () => {
            expect(resolve('#foo')).to.equal(el);
        });

        it('should parse an HTML string and return a DOM node', () => {
            expect(resolve('<div></div>').nodeType).to.equal(1);
            expect(resolve('<div></div><div></div>').nodeType).to.equal(11);
        });

        it('should return the DOM node if provided one', () => {
            const textnode = document.createTextNode('foo');
            expect(resolve(el)).to.equal(el);
            expect(resolve(textnode)).to.equal(textnode);
        });

        it('should create and return a DOM node if provided a composable array', () => {
            const el = resolve(['div']);
            expect(el.nodeName).to.equal('DIV');
        });

        it('should return null if provided anything other than a string or DOM node', () => {
            expect(resolve(true)).to.equal(null);
            expect(resolve(123)).to.equal(null);
        });
    });

    describe('find', () => {
        it('should return a single DOM element that matches the provided selector string', () => {
            expect(find('#foo')).to.equal(el);
        });

        it('should optionally allow passing a contextual element to constrain the search', () => {
            expect(find('i'), el).to.equal(el.firstChild);
        });

        it('should optionally allow passing a selector string for a contextual element to constrain the search', () => {
            expect(find('i'), el).to.equal(el.firstChild);
        });

        it('should return null if no element is found', () => {
            expect(find('#bar')).to.equal(null);
        });
    });

    describe('query', () => {
        it('should return an array of DOM elements that matches the provided selector string', () => {
            const elements = query('i');
            expect(elements).to.be.an.array;
            expect(elements).to.have.lengthOf(3);
            expect(elements).to.deep.equal(toArray(el.childNodes));
        });

        it('should optionally allow passing a contextual element to constrain the search', () => {
            const elements = query('i', el);
            expect(elements).to.have.lengthOf(3);
            expect(elements).to.deep.equal(toArray(el.childNodes));
        });

        it('should optionally allow passing a selector string for a contextual element to constrain the search', () => {
            const elements = query('i', '#foo');
            expect(elements).to.have.lengthOf(3);
            expect(elements).to.deep.equal(toArray(el.childNodes));
        });
    });
});
