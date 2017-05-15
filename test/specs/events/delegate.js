import { expect } from 'chai';
import simulant from 'simulant';
import { events } from '../../../src';

const { delegate } = events;

describe('events/delegate', () => {
    it('should delegate an event handler to a child element matching a CSS selector', (done) => {
        const el = document.createElement('div');
        el.innerHTML = '<section><div class="foo"><span></span></div></section>';
        const div = el.querySelector('div');
        const span = el.querySelector('span');
        document.body.appendChild(el);

        delegate(el, 'click', '.foo', function onClick(e, target) {
            expect(this).to.equal(div);
            expect(target).to.equal(div);
            expect(e).to.be.instanceof(Event);
            document.body.removeChild(el);
            done();
        });

        simulant.fire(span, simulant('click'));
    });
});
