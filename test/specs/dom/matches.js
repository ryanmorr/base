import { expect } from 'chai';
import { dom } from '../../../src';

const { matches } = dom;

describe('dom/matches', () => {
    const container = document.createElement('div');
    container.innerHTML = '<div id="test-element" class="class1 class2 class3" attr="value" attr2="some random text" lang="en-us"></div><div></div>';
    const el = container.querySelector('#test-element');

    it('should return true for an element with a matching selector string', () => {
        const selectors = [
            'div',
            '#test-element',
            '.class1',
            '.class2',
            '.class1.class2.class3',
            '[attr]',
            '[attr=value]',
            '[attr="value"]',
            '[attr][attr2][lang]',
            '[attr2~="random"]',
            '[attr2*="rand"]',
            '[attr2^="some"]',
            '[attr2$="text"]',
            '[lang|="en"]',
            ':first-child',
            'div#test-element.class1.class2.class3[attr=value][attr2="some random text"][lang="en-us"]'
        ];
        selectors.forEach((selector) => expect(matches(el, selector)).to.equal(true));
    });

    it('should return false for an element with a non-matching selector string', () => {
        const selectors = [
            'span',
            '#element',
            '.class12',
            ':last-child',
            '[foo]'
        ];
        selectors.forEach((selector) => expect(matches(el, selector)).to.equal(false));
    });
});
