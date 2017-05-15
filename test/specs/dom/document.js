import { expect } from 'chai';
import { dom } from '../../../src';

const {
    doc,
    documentElement,
    head,
    body,
    getDocumentTitle,
    setDocumentTitle,
    getViewportHeight,
    getViewportWidth,
    getDocumentHeight,
    getDocumentWidth,
    getDocumentScrollLeft,
    getDocumentScrollTop,
    setDocumentScroll,
    isInDocument
} = dom;

describe('dom/document', () => {
    const document = window.document;

    it('should provide the document, document element, head, and body nodes', () => {
        expect(doc).to.equal(document);
        expect(documentElement).to.equal(document.documentElement);
        expect(head).to.equal(document.head);
        expect(body).to.equal(document.body);
    });

    describe('getDocumentTitle', () => {
        it('should return the title of the page', () => {
            expect(getDocumentTitle()).to.equal(document.title);
        });
    });

    describe('setDocumentTitle', () => {
        it('should set the title of the page', () => {
            const title = document.title;
            setDocumentTitle('foo');
            expect(document.title).to.equal('foo');
            document.title = title;
        });
    });

    describe('getViewportHeight', () => {
        it('should get the height of the viewport in pixels', () => {
            expect(getViewportHeight()).to.equal(document.documentElement.clientHeight);
        });
    });

    describe('getViewportWidth', () => {
        it('should get the width of the viewport in pixels', () => {
            expect(getViewportWidth()).to.equal(document.documentElement.clientWidth);
        });
    });

    describe('getDocumentHeight', () => {
        it('should get the height of the full document in pixels', () => {
            const docHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
                document.documentElement.clientHeight
            );
            expect(getDocumentHeight()).to.equal(docHeight);
        });
    });

    describe('getDocumentWidth', () => {
        it('should get the width of the full document in pixels', () => {
            const docWidth = Math.max(
                document.body.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.scrollWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth
            );
            expect(getDocumentWidth()).to.equal(docWidth);
        });
    });

    describe('getDocumentScrollLeft', () => {
        it('should get the amount the document has scrolled from the left in pixels', () => {
            expect(getDocumentScrollLeft()).to.equal(window.pageXOffset);
        });
    });

    describe('getDocumentScrollTop', () => {
        it('should get the amount the document has scrolled from the top in pixels', () => {
            expect(getDocumentScrollTop()).to.equal(window.pageYOffset);
        });
    });

    describe('setDocumentScroll', () => {
        it('should set the amount to scroll the document from the left in pixels', () => {
            const el = document.createElement('div');
            el.style.width = '2000px';
            el.style.height = '2000px';
            document.body.appendChild(el);

            setDocumentScroll(30, 40);
            expect(window.pageXOffset).to.equal(30);
            expect(window.pageYOffset).to.equal(40);

            document.body.removeChild(el);
        });
    });

    describe('isInDocument', () => {
        const el = document.createElement('div');

        it('should return true if an element is currently rendered to the DOM', () => {
            document.body.appendChild(el);
            expect(isInDocument(el)).to.equal(true);
        });

        it('should return false if an element is not currently rendered to the DOM', () => {
            document.body.removeChild(el);
            expect(isInDocument(el)).to.equal(false);
        });
    });
});
