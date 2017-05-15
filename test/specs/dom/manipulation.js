import { expect } from 'chai';
import { dom } from '../../../src';

const { prepend, append, setText, clearText, empty, remove } = dom;

describe('dom/manipulation', () => {
    const container = document.createElement('div');
    container.id = 'container';

    before(() => {
        document.body.appendChild(container);
    });

    after(() => {
        document.body.removeChild(container);
    });

    beforeEach(() => {
        container.innerHTML = '<i></i><span></span>';
    });

    describe('prepend', () => {
        it('should insert a node as the first child of a parent node', () => {
            const el = document.createElement('div');

            prepend(container, el);
            expect(container.firstChild).to.equal(el);
        });

        it('should support selector strings', () => {
            const el = document.createElement('div');
            el.id = 'foo';
            document.body.appendChild(el);

            prepend(container, '#foo');
            expect(container.firstChild).to.equal(el);
        });

        it('should support a composable element array', () => {
            prepend(container, ['em']);
            expect(container.firstChild.nodeName).to.equal('EM');
        });

        it('should support HTML strings', () => {
            prepend(container, '<article></article>');
            expect(container.firstChild.nodeName).to.equal('ARTICLE');
        });
    });

    describe('append', () => {
        it('should insert a node as the last child of a parent node', () => {
            const el = document.createElement('div');

            append(container, el);
            expect(container.lastChild).to.equal(el);
        });

        it('should support selector strings', () => {
            const el = document.createElement('div');
            el.id = 'foo';
            document.body.appendChild(el);

            append(container, '#foo');
            expect(container.lastChild).to.equal(el);
        });

        it('should support a composable element array', () => {
            append(container, ['em']);
            expect(container.lastChild.nodeName).to.equal('EM');
        });

        it('should support HTML strings', () => {
            append(container, '<article></article>');
            expect(container.lastChild.nodeName).to.equal('ARTICLE');
        });
    });

    describe('setText', () => {
        it('should set the text of an element', () => {
            const el = document.createElement('div');
            expect(el.textContent).to.equal('');
            setText(el, 'foo');
            expect(el.textContent).to.equal('foo');
        });
    });

    describe('clearText', () => {
        it('should remove all the direct decendant text nodes of an element', () => {
            const el = document.createElement('div');
            el.appendChild(document.createTextNode('foo'));
            el.appendChild(document.createTextNode('bar'));

            expect(el.textContent).to.equal('foobar');
            clearText(el);
            expect(el.textContent).to.equal('');
        });
    });

    describe('empty', () => {
        it('should remove all child nodes of an element', () => {
            const el = document.createElement('div');
            el.appendChild(document.createElement('div'));
            el.appendChild(document.createElement('span'));

            expect(el.childNodes.length).to.equal(2);
            empty(el);
            expect(el.childNodes.length).to.equal(0);
        });
    });

    describe('remove', () => {
        it('should remove an element from it\'s parent', () => {
            const el = document.createElement('div');
            document.body.appendChild(el);

            expect(el.parentNode).to.equal(document.body);
            remove(el);
            expect(el.parentNode).to.equal(null);
        });
    });
});
