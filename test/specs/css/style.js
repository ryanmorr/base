import { expect } from 'chai';
import { css } from '../../../src';

const { getStyle, setStyle } = css;

describe('css/style', () => {
    const el = document.createElement('div');
    before(() => document.body.appendChild(el));
    after(() => document.body.removeChild(el));

    describe('getStyle', () => {
        it('should get the computed style of an element', () => {
            el.style.width = '40px';
            expect(getStyle(el, 'width')).to.equal('40px');
        });

        it('should be able to handle kebab-case style properties', () => {
            el.style.backgroundColor = 'rgb(60, 60, 60)';
            expect(getStyle(el, 'background-color')).to.equal('rgb(60, 60, 60)');
        });

        it('should return null for unsupported styles', () => {
            expect(getStyle(el, 'foo')).to.equal(null);
        });
    });

    describe('setStyle', () => {
        it('should set the style property to the provided value', () => {
            setStyle(el, 'width', '55px');
            expect(el.style.width).to.equal('55px');
        });

        it('should be able to handle kebab-case style properties', () => {
            setStyle(el, 'background-color', 'rgb(60, 60, 60)');
            expect(el.style.backgroundColor).to.equal('rgb(60, 60, 60)');
        });

        it('should be able to provide a hash map of properties/values to set multiple styles at once', () => {
            setStyle(el, {
                height: '23px',
                color: 'rgb(20, 20, 20)',
                'overflow-x': 'hidden'
            });
            expect(el.style.height).to.equal('23px');
            expect(el.style.color).to.equal('rgb(20, 20, 20)');
            expect(el.style.overflowX).to.equal('hidden');
        });
    });
});
