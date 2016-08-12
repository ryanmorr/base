/* eslint-disable no-new-wrappers */

import { expect } from 'chai';
import { isArray, isBoolean, isDate, isError, isFunction, isNull, isNumber, isObject, isRegExp, isString, isUndefined } from '../../../src/lang';

describe('lang/type', () => {
    let iframe;
    const crossFrame = window.crossFrame = {};
    const instance = new function Foo() {};

    before(() => {
        // Create objects from another context
        iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const iframeWindow = iframe.contentWindow;
        const iframeDocument = iframe.contentDocument || iframeWindow.document;
        iframeDocument.write([
            '<script>',
            'parent.crossFrame.array = [];',
            'parent.crossFrame.string = new String("");',
            'parent.crossFrame.number = new Number(123);',
            'parent.crossFrame.function = (function(){});',
            'parent.crossFrame.date = new Date();',
            'parent.crossFrame.regexp = /foo/;',
            'parent.crossFrame.null = null;',
            'parent.crossFrame.boolean = new Boolean(false);',
            'parent.crossFrame.undefined = undefined;',
            'parent.crossFrame.object = {};',
            'parent.crossFrame.error = new Error();',
            '</script>'
        ].join('\n'));
        iframeDocument.close();
    });

    after(() => {
        // Clean up iframe
        document.body.removeChild(iframe);
        iframe = null;
        delete window.crossFrame;
    });

    it('isArray', () => {
        // Should match
        expect(isArray([])).to.be.true;
        expect(isArray(crossFrame.array)).to.equal(true, 'support for cross-frame arrays');
        // Should not match
        const args = (function() { return arguments; })(1, 2, 3);
        expect(isArray(args)).to.be.false;
        expect(isArray(document.childNodes)).to.be.false;
        expect(isArray({})).to.be.false;
        expect(isArray(true)).to.be.false;
        expect(isArray('foo')).to.be.false;
        expect(isArray(function() {})).to.be.false;
        expect(isArray(123)).to.be.false;
        expect(isArray(new Date())).to.be.false;
        expect(isArray(null)).to.be.false;
        expect(isArray(undefined)).to.be.false;
        expect(isArray(/foo/)).to.be.false;
        expect(isArray(new Error())).to.be.false;
        expect(isArray(instance)).to.be.false;
    });

    it('isString', () => {
        // Should match
        expect(isString('foo')).to.be.true;
        expect(isString(new String('foo'))).to.be.true;
        expect(isString(crossFrame.string)).to.equal(true, 'support for cross-frame strings');
        // Should not match
        expect(isString([])).to.be.false;
        expect(isString({})).to.be.false;
        expect(isString(true)).to.be.false;
        expect(isString(function() {})).to.be.false;
        expect(isString(123)).to.be.false;
        expect(isString(new Date())).to.be.false;
        expect(isString(null)).to.be.false;
        expect(isString(undefined)).to.be.false;
        expect(isString(/foo/)).to.be.false;
        expect(isString(new Error())).to.be.false;
        expect(isString(instance)).to.be.false;
    });

    it('isNumber', () => {
        // Should match
        expect(isNumber(123)).to.be.true;
        expect(isNumber(0x45)).to.be.true;
        expect(isNumber(0.314e2)).to.be.true;
        expect(isNumber(new Number())).to.be.true;
        expect(isNumber(Infinity)).to.be.true;
        expect(isNumber(Number.POSITIVE_INFINITY)).to.be.true;
        expect(isNumber(Number.NEGATIVE_INFINITY)).to.be.true;
        expect(isNumber(crossFrame.number)).to.equal(true, 'support for cross-frame numbers');
        // Should not match
        expect(isNumber({})).to.be.false;
        expect(isNumber(true)).to.be.false;
        expect(isNumber('foo')).to.be.false;
        expect(isNumber(function() {})).to.be.false;
        expect(isNumber(new Date())).to.be.false;
        expect(isNumber(null)).to.be.false;
        expect(isNumber(undefined)).to.be.false;
        expect(isNumber(/foo/)).to.be.false;
        expect(isNumber(new Error())).to.be.false;
        expect(isNumber(instance)).to.be.false;
    });

    it('isBoolean', () => {
        // Should match
        expect(isBoolean(true)).to.be.true;
        expect(isBoolean(false)).to.be.true;
        expect(isBoolean(new Boolean(false))).to.be.true;
        expect(isBoolean(crossFrame.boolean)).to.equal(true, 'support for cross-frame booleans');
        // Should not match
        expect(isBoolean({})).to.be.false;
        expect(isBoolean('foo')).to.be.false;
        expect(isBoolean(function() {})).to.be.false;
        expect(isBoolean(123)).to.be.false;
        expect(isBoolean(new Date())).to.be.false;
        expect(isBoolean(null)).to.be.false;
        expect(isBoolean(undefined)).to.be.false;
        expect(isBoolean(/foo/)).to.be.false;
        expect(isBoolean(new Error())).to.be.false;
        expect(isBoolean(instance)).to.be.false;
    });

    it('isDate', () => {
        // Should match
        expect(isDate(new Date())).to.be.true;
        expect(isDate(crossFrame.date)).to.equal(true, 'support for cross-frame dates');
        // Should not match
        expect(isDate([])).to.be.false;
        expect(isDate({})).to.be.false;
        expect(isDate(true)).to.be.false;
        expect(isDate('foo')).to.be.false;
        expect(isDate(function() {})).to.be.false;
        expect(isDate(123)).to.be.false;
        expect(isDate(null)).to.be.false;
        expect(isDate(undefined)).to.be.false;
        expect(isDate(/foo/)).to.be.false;
        expect(isDate(new Error())).to.be.false;
        expect(isDate(instance)).to.be.false;
    });

    it('isError', () => {
        // Should match
        expect(isError(new Error())).to.be.true;
        expect(isError(crossFrame.error)).to.equal(true, 'support for cross-frame errors');
        // Should not match
        expect(isError([])).to.be.false;
        expect(isError({})).to.be.false;
        expect(isError(true)).to.be.false;
        expect(isError('foo')).to.be.false;
        expect(isError(function() {})).to.be.false;
        expect(isError(123)).to.be.false;
        expect(isError(new Date())).to.be.false;
        expect(isError(null)).to.be.false;
        expect(isError(undefined)).to.be.false;
        expect(isError(/foo/)).to.be.false;
        expect(isError(instance)).to.be.false;
    });

    it('isFunction', () => {
        // Should match
        expect(isFunction(function foo() {})).to.be.true;
        expect(isFunction(() => {})).to.be.true;
        expect(isFunction(crossFrame.function)).to.equal(true, 'support for cross-frame functions');
        // Should not match
        expect(isFunction([])).to.be.false;
        expect(isFunction({})).to.be.false;
        expect(isFunction(true)).to.be.false;
        expect(isFunction('foo')).to.be.false;
        expect(isFunction(123)).to.be.false;
        expect(isFunction(new Date())).to.be.false;
        expect(isFunction(null)).to.be.false;
        expect(isFunction(undefined)).to.be.false;
        expect(isFunction(/foo/)).to.be.false;
        expect(isFunction(new Error())).to.be.false;
        expect(isFunction(instance)).to.be.false;
    });

    it('isObject', () => {
        // Should match
        expect(isObject({})).to.be.true;
        expect(isObject(Object.create(null))).to.be.true;
        expect(isObject(instance)).to.be.true;
        expect(isObject(crossFrame.object)).to.equal(true, 'support for cross-frame objects');
        // Should not match
        expect(isObject([])).to.be.false;
        expect(isObject(true)).to.be.false;
        expect(isObject('foo')).to.be.false;
        expect(isObject(function() {})).to.be.false;
        expect(isObject(123)).to.be.false;
        expect(isObject(new Date())).to.be.false;
        expect(isObject(null)).to.be.false;
        expect(isObject(undefined)).to.be.false;
        expect(isObject(/foo/)).to.be.false;
        expect(isObject(new Error())).to.be.false;
    });

    it('isRegExp', () => {
        // Should match
        expect(isRegExp(/foo/)).to.be.true;
        expect(isRegExp(new RegExp('foo'))).to.be.true;
        expect(isRegExp(crossFrame.regexp)).to.equal(true, 'support for cross-frame regular expressions');
        // Should not match
        expect(isRegExp([])).to.be.false;
        expect(isRegExp({})).to.be.false;
        expect(isRegExp(true)).to.be.false;
        expect(isRegExp('foo')).to.be.false;
        expect(isRegExp(function() {})).to.be.false;
        expect(isRegExp(123)).to.be.false;
        expect(isRegExp(new Date())).to.be.false;
        expect(isRegExp(null)).to.be.false;
        expect(isRegExp(undefined)).to.be.false;
        expect(isRegExp(new Error())).to.be.false;
        expect(isRegExp(instance)).to.be.false;
    });

    it('isNull', () => {
        // Should match
        expect(isNull(null)).to.be.true;
        expect(isNull(crossFrame.null)).to.equal(true, 'support for cross-frame null');
        // Should not match
        expect(isNull([])).to.be.false;
        expect(isNull({})).to.be.false;
        expect(isNull(true)).to.be.false;
        expect(isNull('foo')).to.be.false;
        expect(isNull(function() {})).to.be.false;
        expect(isNull(123)).to.be.false;
        expect(isNull(new Date())).to.be.false;
        expect(isNull(undefined)).to.be.false;
        expect(isNull(/foo/)).to.be.false;
        expect(isNull(new Error())).to.be.false;
        expect(isNull(instance)).to.be.false;
    });

    it('isUndefined', () => {
        // Should match
        expect(isUndefined(undefined)).to.be.true;
        expect(isUndefined(void 0)).to.be.true;
        expect(isUndefined(crossFrame.undefined)).to.equal(true, 'support for cross-frame undefined');
        // Should not match
        expect(isUndefined([])).to.be.false;
        expect(isUndefined({})).to.be.false;
        expect(isUndefined(true)).to.be.false;
        expect(isUndefined('foo')).to.be.false;
        expect(isUndefined(function() {})).to.be.false;
        expect(isUndefined(123)).to.be.false;
        expect(isUndefined(new Date())).to.be.false;
        expect(isUndefined(null)).to.be.false;
        expect(isUndefined(/foo/)).to.be.false;
        expect(isUndefined(new Error())).to.be.false;
        expect(isUndefined(instance)).to.be.false;
    });
});
