import { expect } from 'chai';
import sinon from 'sinon';
import { events } from '../../../src';

const { Observable } = events;

describe('events/Observable', () => {
    describe('addEvents', () => {
        it('should support explicity naming custom events for an object', () => {
            const obj = Object.create(Observable);

            expect(obj.addEvents).to.be.a('function');
            obj.addEvents('foo', 'bar', 'baz');

            expect(obj.customEvents.foo).to.equal(null);
            expect(obj.customEvents.bar).to.equal(null);
            expect(obj.customEvents.baz).to.equal(null);
        });
    });

    describe('addListener', () => {
        it('should support adding callback functions to custom events', () => {
            const obj = Object.create(Observable);
            obj.addEvents('foo');

            expect(obj.addListener).to.be.a('function');
            expect(obj.on).to.be.a('function');
            expect(obj.on).to.equal(obj.addListener);

            const fn = () => {};
            obj.on('foo', fn);

            expect(obj.customEvents.foo[0]).to.equal(fn);
        });
    });

    describe('removeListener', () => {
        it('should support removing callback functions from custom events', () => {
            const obj = Object.create(Observable);
            obj.addEvents('foo');

            expect(obj.removeListener).to.be.a('function');
            expect(obj.off).to.be.a('function');
            expect(obj.off).to.equal(obj.removeListener);

            const fn = () => {};
            obj.on('foo', fn);
            expect(obj.customEvents.foo[0]).to.equal(fn);

            obj.off('foo', fn);
            expect(obj.customEvents.foo[0]).to.not.exist;
        });
    });

    describe('clearListeners', () => {
        it('should support clearing all callback functions from custom events', () => {
            const obj = Object.create(Observable);
            obj.addEvents('foo', 'bar');

            expect(obj.clearListeners).to.be.a('function');

            obj.on('foo', () => {});
            obj.on('foo', () => {});
            obj.on('bar', () => {});
            obj.on('bar', () => {});

            expect(obj.customEvents.foo.length).to.equal(2);
            expect(obj.customEvents.bar.length).to.equal(2);

            obj.clearListeners();

            expect(obj.customEvents.foo.length).to.equal(0);
            expect(obj.customEvents.bar.length).to.equal(0);
        });
    });

    describe('dispatchEvent', () => {
        it('should support dispatching a custom event and passing the provided arguments', () => {
            const obj = Object.create(Observable);
            obj.addEvents('foo');

            expect(obj.dispatchEvent).to.be.a('function');

            const fn = sinon.spy();
            obj.on('foo', fn);

            obj.dispatchEvent('foo', 1, 2, 3);

            expect(fn.called).to.equal(true);
            expect(fn.calledWith(1, 2, 3)).to.equal(true);
        });
    });
});
