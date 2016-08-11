/* eslint-disable no-new-wrappers */

import { expect } from 'chai';
import { isArray, isBoolean, isDate, isError, isFunction, isNull, isNumber, isObject, isRegExp, isString, isUndefined } from '../../../src/lang';

describe('lang/type', () => {
    it('isArray', () => {
        expect(isArray([])).to.equal(true);
    });

    it('isBoolean', () => {
        expect(isBoolean(true)).to.equal(true);
        expect(isBoolean(false)).to.equal(true);
        expect(isBoolean(new Boolean(false))).to.equal(true);
    });

    it('isDate', () => {
        expect(isDate(new Date())).to.equal(true);
    });

    it('isError', () => {
        expect(isError(new Error())).to.equal(true);
    });

    it('isFunction', () => {
        // eslint-disable-next-line prefer-arrow-callback
        expect(isFunction(function foo() {})).to.equal(true);
        expect(isFunction(() => {})).to.equal(true);
    });

    it('isNull', () => {
        expect(isNull(null)).to.equal(true);
    });

    it('isNumber', () => {
        expect(isNumber(123)).to.equal(true);
        expect(isNumber(0x45)).to.equal(true);
        expect(isNumber(0.314e2)).to.equal(true);
        expect(isNumber(new Number())).to.equal(true);
        expect(isNumber(Infinity)).to.equal(true);
        expect(isNumber(Number.POSITIVE_INFINITY)).to.equal(true);
        expect(isNumber(Number.NEGATIVE_INFINITY)).to.equal(true);
    });

    it('isObject', () => {
        expect(isObject({})).to.equal(true);
        expect(isObject(Object.create(null))).to.equal(true);
    });

    it('isRegExp', () => {
        expect(isRegExp(/foo/)).to.equal(true);
        expect(isRegExp(new RegExp('foo'))).to.equal(true);
    });

    it('isString', () => {
        expect(isString('foo')).to.equal(true);
        expect(isString(new String('foo'))).to.equal(true);
    });

    it('isUndefined', () => {
        expect(isUndefined(undefined)).to.equal(true);
        expect(isUndefined(void 0)).to.equal(true);
    });
});
