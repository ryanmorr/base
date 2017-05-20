import { expect } from 'chai';
import sinon from 'sinon';
import { dom } from '../../../src';

const { write } = dom;

// Polyfill `requestAnimationFrame`
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || ((cb) => setTimeout(cb, 1000 / 60));

// Polyfill `cancelAnimationFrame`
window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || ((id) => clearTimeout(id));

// Wait to execute a function
function timeout(fn) {
    setTimeout(fn, 100);
}

describe('dom/write', () => {
    it('should schedule a frame to write to the DOM', (done) => {
        const fn = sinon.spy();
        const spy = sinon.spy(window, 'requestAnimationFrame');

        write(fn);
        timeout(() => {
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

        timeout(() => {
            expect(fn.called).to.equal(true);
            expect(fn2.called).to.equal(true);
            expect(requestSpy.callCount).to.equal(2);
            expect(cancelSpy.callCount).to.equal(1);
            done();
        });
    });
});
