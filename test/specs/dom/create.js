import { expect } from 'chai';
import { dom } from '../../../src';

const { createHTML, createElement } = dom;

describe('dom/create', () => {
    describe('createHTML', () => {
        it('should be able to create an HTML tag', () => {
            expect(createHTML('div')).to.equal('<div></div>');
        });

        it('should support self-closing HTML/SVG tags', () => {
            expect(createHTML('img')).to.equal('<img />');
            expect(createHTML('path')).to.equal('<path />');
        });

        it('should support attributes', () => {
            expect(createHTML('span', {id: 'foo', class: 'bar'})).to.equal('<span id="foo" class="bar"></span>');
        });

        it('should support child nodes as a string', () => {
            expect(createHTML('div', null, 'foo')).to.equal('<div>foo</div>');
            expect(createHTML('div', null, '<i></i>')).to.equal('<div><i></i></div>');
        });

        it('should support composable child nodes as additional arguments', () => {
            const html = createHTML('div', null,
                ['i', {id: 'foo'}],
                ['span', {class: 'bar'}],
                ['em']
            );
            expect(html).to.equal('<div><i id="foo"></i><span class="bar"></span><em></em></div>');
        });
    });

    describe('createElement', () => {
        it('should be able to create a DOM element', () => {
            const el = createElement('div');
            expect(el.nodeName).to.equal('DIV');
        });

        it('should support attributes', () => {
            const el = createElement('span', {id: 'foo', class: 'bar'});
            expect(el.nodeName).to.equal('SPAN');
            expect(el.id).to.equal('foo');
            expect(el.className).to.equal('bar');
        });

        it('should support child nodes by providing a DOM node', () => {
            const span = document.createElement('span');
            const el = createElement('div', null, span);
            expect(el.firstChild).to.equal(span);

            const text = document.createTextNode('foo');
            const el2 = createElement('div', null, text);
            expect(el2.firstChild).to.equal(text);
        });

        it('should support child nodes by providing DOM nodes as additional arguments', () => {
            const i = document.createElement('i');
            const span = document.createElement('span');
            const el = createElement('div', null, i, span);
            expect(el.firstChild).to.equal(i);
            expect(el.lastChild).to.equal(span);
        });

        it('should support composable child nodes as additional arguments', () => {
            const el = createElement('div', null,
                ['i', {id: 'foo'}],
                ['span', {class: 'bar'}],
                ['em']
            );
            const children = el.childNodes;
            const child1 = children[0];
            const child2 = children[1];
            const child3 = children[2];
            expect(child1.nodeName).to.equal('I');
            expect(child1.id).to.equal('foo');
            expect(child2.nodeName).to.equal('SPAN');
            expect(child2.className).to.equal('bar');
            expect(child3.nodeName).to.equal('EM');
        });

        it('should support appending text content', () => {
            const el = createElement('div', null, 'foo');
            expect(el.textContent).to.equal('foo');
        });
    });
});
