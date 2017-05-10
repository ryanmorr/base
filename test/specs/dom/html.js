import { expect } from 'chai';
import { isHTML, toHTML, toFragment } from '../../../src/dom';

describe('dom/html', () => {
    describe('isHTML', () => {
        it('should return true for HTML strings', () => {
            expect(isHTML('<div></div>')).to.equal(true);
        });

        it('should return false for anything not an HTML string', () => {
            expect(isHTML('foo')).to.equal(false);
            expect(isHTML('< foo >')).to.equal(false);
        });
    });

    describe('toHTML', () => {
        it('should convert a DOM element into an HTML string', () => {
            const el = document.createElement('div');
            el.setAttribute('id', 'foo');
            el.setAttribute('class', 'bar');

            expect(toHTML(el)).to.equal('<div id="foo" class="bar"></div>');
        });
    });

    describe('toFragment', () => {
        it('should parse an HTML string into a document fragment', () => {
            const frag = toFragment('<div></div><span></span>');

            expect(frag.nodeType).to.equal(11);
            expect(frag.childNodes.length).to.equal(2);
            expect(frag.firstChild.nodeName).to.equal('DIV');
            expect(frag.lastChild.nodeName).to.equal('SPAN');
        });
    });
});
