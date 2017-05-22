import { expect } from 'chai';
import { lang } from '../../../src';

const { prefix, prefixed } = lang;

describe('lang/prefix', () => {
    describe('prefix', () => {
        it('should get the supported object property name for the current environment', () => {
            const el = document.createElement('div');
            el.className = 'foo';

            const matches = prefix(el, [
                'matches',
                'matchesSelector',
                'webkitMatchesSelector',
                'mozMatchesSelector',
                'oMatchesSelector',
                'msMatchesSelector'
            ]);

            expect(matches).to.be.a('string');
            expect(el[matches]('.foo')).to.equal(true);
        });

        it('should return null if no supported property is found', () => {
            const el = document.createElement('div');
            el.className = 'foo';

            const matches = prefix(el, [
                'foo',
                'bar'
            ]);

            expect(matches).to.equal(null);
        });
    });

    describe('prefixed', () => {
        it('should get the supported object method for the current environment', () => {
            const el = document.createElement('div');
            el.className = 'foo';

            const matches = prefixed(el, [
                'matches',
                'matchesSelector',
                'webkitMatchesSelector',
                'mozMatchesSelector',
                'oMatchesSelector',
                'msMatchesSelector'
            ]);

            expect(matches).to.be.a('function');
            expect(matches('.foo')).to.equal(true);
        });

        it('should return null if no supported method is found', () => {
            const el = document.createElement('div');
            el.className = 'foo';

            const matches = prefixed(el, [
                'foo',
                'bar'
            ]);

            expect(matches).to.equal(null);
        });
    });
});
