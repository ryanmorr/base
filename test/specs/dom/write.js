import { expect } from 'chai';
import sinon from 'sinon';
import { dom } from '../../../src';

const { write } = dom;

// Polyfill `requestAnimationFrame` and 'cancelAnimationFrame'
// for PhantomJS
window.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || function requestAnimationFrame(cb) { return window.setTimeout(cb, 1000 / 60); };

window.cancelAnimationFrame = window.cancelAnimationFrame
    || function cancelAnimationFrame(id) { window.clearTimeout(id); };

describe('dom/write', () => {
    it('should schedule a frame to write to the DOM', (done) => {
        const fn = sinon.spy();
        const spy = sinon.spy(window, 'requestAnimationFrame');

        write(fn);
        requestAnimationFrame(() => {
            expect(fn.called).to.equal(true);
            expect(spy.called).to.equal(true);
            spy.restore();
            done();
        });
    });

    it('should only schedule one frame per cycle', (done) => {
        const fn = sinon.spy();
        const fn2 = sinon.spy();
        const requestSpy = sinon.spy(window, 'requestAnimationFrame');
        const cancelSpy = sinon.spy(window, 'cancelAnimationFrame');

        write(fn);
        expect(requestSpy.callCount).to.equal(1);
        expect(cancelSpy.callCount).to.equal(0);

        write(fn2);
        expect(requestSpy.callCount).to.equal(2);
        expect(cancelSpy.callCount).to.equal(1);

        requestSpy.restore();
        cancelSpy.restore();

        requestAnimationFrame(() => {
            expect(fn.called).to.equal(true);
            expect(fn2.called).to.equal(true);
            expect(requestSpy.callCount).to.equal(2);
            expect(cancelSpy.callCount).to.equal(1);
            done();
        });
    });
});
