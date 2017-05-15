import { expect } from 'chai';
import { events } from '../../../src';

const { onDOMReady } = events;

function isDOMReady() {
    return /complete|loaded|interactive/.test(document.readyState);
}

describe('events/ondomready', () => {
    it('should return a promise that fullfills once the DOM has finished loading', (done) => {
        const promise = onDOMReady();
        expect(promise).to.be.a('promise');

        promise.then(() => {
            expect(isDOMReady()).to.equal(true);
            done();
        });
    });

    it('should support supplying a callback function as an optional parameter', (done) => {
        onDOMReady(() => {
            expect(isDOMReady()).to.equal(true);
            done();
        });
    });
});
