import { expect } from 'chai';
import { lang } from '../../../src';

const { port } = lang;

describe('lang/port', () => {
    it('should be able to port an object method to be used standalone', () => {
        const each = port([].forEach);
        const array = [1, 2, 3, 4, 5];
        each(array, (item, i) => {
            array[i] = (item * i);
        });
        expect(array).to.deep.equal([0, 2, 6, 12, 20]);
    });
});
