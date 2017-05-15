import { expect } from 'chai';
import { lang } from '../../../src';

const { uid } = lang;

describe('lang/uid', () => {
    it('should generate a unique ID for every invocation', () => {
        const ids = [];
        for (let i = 0; i < 1000; i++) {
            const id = uid();
            expect(ids).to.not.include(id);
            ids.push(id);
        }
    });
});
