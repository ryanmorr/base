import { expect } from 'chai';
import { lang } from '../../../src';

const { global } = lang;

describe('lang/global', () => {
    it('should be the global object', () => {
        expect(global.Math).to.equal(Math);
        expect(global.JSON).to.equal(JSON);
        expect(global.String).to.equal(String);
        expect(global.Array).to.equal(Array);
        expect(global.Number).to.equal(Number);
        expect(global.Boolean).to.equal(Boolean);
        expect(global.Object).to.equal(Object);
        expect(global.Function).to.equal(Function);
        expect(global.Date).to.equal(Date);
        expect(global.RegExp).to.equal(RegExp);
    });
});
