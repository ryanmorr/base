import { expect } from 'chai';
import { closest } from '../../../src/dom';

describe('dom/traversal', () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <section class="foo">
            <div class="bar">
                <span class="baz"></span>
            </div>
        </section>
    `;

    describe('closest', () => {
        it('should get the first element that matches a CSS selector by traversing up the DOM tree', () => {
            const span = container.querySelector('.baz');
            const div = container.querySelector('.bar');
            const section = container.querySelector('.foo');

            span.closest = null;
            expect(closest(span, '.baz')).to.equal(span);
            expect(closest(span, '.bar')).to.equal(div);
            expect(closest(span, '.foo')).to.equal(section);
        });
    });
});
