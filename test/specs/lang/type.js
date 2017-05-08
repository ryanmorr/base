/* eslint-disable no-new-wrappers */

import { expect } from 'chai';
import { isArray, isBoolean, isDate, isError, isFunction, isNode, isNull, isNumber, isObject, isRegExp, isString, isUndefined, type } from '../../../src/lang';

describe('lang/type', () => {
    let iframe;
    const crossFrame = window.crossFrame = {};

    before(() => {
        // Create objects from another context
        iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const iframeWindow = iframe.contentWindow;
        const iframeDocument = iframe.contentDocument || iframeWindow.document;
        iframeDocument.write(`
            <script>
            parent.crossFrame.array = [];
            parent.crossFrame.boolean = new Boolean(false);
            parent.crossFrame.date = new Date();
            parent.crossFrame.error = new Error();
            parent.crossFrame.function = (function(){});
            parent.crossFrame.node = document.createElement('div');
            parent.crossFrame.null = null;
            parent.crossFrame.number = new Number(123);
            parent.crossFrame.object = {};
            parent.crossFrame.regexp = /foo/;
            parent.crossFrame.string = new String("");
            parent.crossFrame.undefined = undefined;
            </script>
        `);
        iframeDocument.close();
    });

    after(() => {
        // Clean up iframe
        document.body.removeChild(iframe);
        iframe = null;
        delete window.crossFrame;
    });

    describe('isArray', () => {
        it('should return true for arrays', () => {
            expect(isArray([])).to.be.true;
        });

        it('should return true for cross-frame arrays', () => {
            expect(isArray(crossFrame.array)).to.equal(true);
        });

        it('should return false for anything not an array', () => {
            const args = (function() { return arguments; })(1, 2, 3);
            const instance = new function() {};
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
            expect(isArray(document.createElement('div'))).to.be.false;
        });
    });

    describe('isBoolean', () => {
        it('should return true for booleans', () => {
            expect(isBoolean(true)).to.be.true;
            expect(isBoolean(false)).to.be.true;
            expect(isBoolean(new Boolean(false))).to.be.true;
        });

        it('should return true for cross-frame booleans', () => {
            expect(isBoolean(crossFrame.boolean)).to.equal(true);
        });

        it('should return false for anything not a boolean', () => {
            const instance = new function() {};
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
            expect(isBoolean(document.createElement('div'))).to.be.false;
        });
    });

    describe('isNumber', () => {
        it('should return true for numbers', () => {
            expect(isNumber(123)).to.be.true;
            expect(isNumber(0x45)).to.be.true;
            expect(isNumber(0.314e2)).to.be.true;
            expect(isNumber(new Number())).to.be.true;
            expect(isNumber(Infinity)).to.be.true;
            expect(isNumber(Number.POSITIVE_INFINITY)).to.be.true;
            expect(isNumber(Number.NEGATIVE_INFINITY)).to.be.true;
        });

        it('should return true for cross-frame numbers', () => {
            expect(isNumber(crossFrame.number)).to.equal(true);
        });

        it('should return false for anything not a number', () => {
            const instance = new function() {};
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
            expect(isNumber(document.createElement('div'))).to.be.false;
        });
    });

    describe('isFunction', () => {
        it('should return true for functions', () => {
            expect(isFunction(function foo() {})).to.be.true;
            expect(isFunction(() => {})).to.be.true;
        });

        it('should return true for cross-frame functions', () => {
            expect(isFunction(crossFrame.function)).to.equal(true);
        });

        it('should return false for anything not a function', () => {
            const instance = new function() {};
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
            expect(isFunction(document.createElement('div'))).to.be.false;
        });
    });

    describe('isString', () => {
        it('should return true for strings', () => {
            expect(isString('foo')).to.be.true;
            expect(isString(new String('foo'))).to.be.true;
        });

        it('should return true for cross-frame strings', () => {
            expect(isString(crossFrame.string)).to.equal(true);
        });

        it('should return false for anything not a string', () => {
            const instance = new function() {};
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
            expect(isString(document.createElement('div'))).to.be.false;
        });
    });

    describe('isObject', () => {
        it('should return true for objects', () => {
            const instance = new function() {};
            expect(isObject({})).to.be.true;
            expect(isObject(Object.create(null))).to.be.true;
            expect(isObject(instance)).to.be.true;
        });

        it('should return true for cross-frame objects', () => {
            expect(isObject(crossFrame.object)).to.equal(true);
        });

        it('should return false for anything not an object', () => {
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
            expect(isObject(document.createElement('div'))).to.be.false;
        });
    });

    describe('isDate', () => {
        it('should return true for date objects', () => {
            expect(isDate(new Date())).to.be.true;
        });

        it('should return true for cross-frame date objects', () => {
            expect(isDate(crossFrame.date)).to.equal(true);
        });

        it('should return false for anything not a date object', () => {
            const instance = new function() {};
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
            expect(isDate(document.createElement('div'))).to.be.false;
        });
    });

    describe('isError', () => {
        it('should return true for errors', () => {
            expect(isError(new Error())).to.be.true;
        });

        it('should return true for cross-frame errors', () => {
            expect(isError(crossFrame.error)).to.equal(true);
        });

        it('should return false for anything not an error', () => {
            const instance = new function() {};
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
            expect(isError(document.createElement('div'))).to.be.false;
        });
    });

    describe('isRegExp', () => {
        it('should return true for regular expressions', () => {
            expect(isRegExp(/foo/)).to.be.true;
            expect(isRegExp(new RegExp('foo'))).to.be.true;
        });

        it('should return true for cross-frame regular expressions', () => {
            expect(isRegExp(crossFrame.regexp)).to.equal(true);
        });

        it('should return false for anything not a regular expression', () => {
            const instance = new function() {};
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
            expect(isRegExp(document.createElement('div'))).to.be.false;
        });
    });

    describe('isNode', () => {
        it('should return true for DOM nodes', () => {
            expect(isNode(document)).to.be.true;
            expect(isNode(document.createElement('div'))).to.be.true;
            expect(isNode(document.createTextNode('foo'))).to.be.true;
            expect(isNode(document.createComment('foo'))).to.be.true;
            expect(isNode(document.createDocumentFragment())).to.be.true;
        });

        it('should return true for cross-frame DOM nodes', () => {
            expect(isNode(crossFrame.node)).to.equal(true);
        });

        it('should return false for anything not a DOM node', () => {
            const instance = new function() {};
            expect(isNode([])).to.be.false;
            expect(isNode({})).to.be.false;
            expect(isNode(true)).to.be.false;
            expect(isNode('foo')).to.be.false;
            expect(isNode(function() {})).to.be.false;
            expect(isNode(123)).to.be.false;
            expect(isNode(new Date())).to.be.false;
            expect(isNode(undefined)).to.be.false;
            expect(isNode(/foo/)).to.be.false;
            expect(isNode(new Error())).to.be.false;
            expect(isNode(instance)).to.be.false;
        });
    });

    describe('isNull', () => {
        it('should return true for null', () => {
            expect(isNull(null)).to.be.true;
        });

        it('should return true for cross-frame null', () => {
            expect(isNull(crossFrame.null)).to.equal(true);
        });

        it('should return false for anything not null', () => {
            const instance = new function() {};
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
            expect(isNull(document.createElement('div'))).to.be.false;
        });
    });

    describe('isUndefined', () => {
        it('should return true for undefined', () => {
            expect(isUndefined(undefined)).to.be.true;
            expect(isUndefined(void 0)).to.be.true;
        });

        it('should return true for cross-frame undefined', () => {
            expect(isUndefined(crossFrame.undefined)).to.equal(true);
        });

        it('should return false for anything not undefined', () => {
            const instance = new function() {};
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
            expect(isUndefined(document.createElement('div'))).to.be.false;
        });
    });

    describe('type', () => {
        it('should return an object\'s type as a string', () => {
            const args = (function() { return arguments; })(1, 2, 3);
            const nan = Math.sqrt(-1);

            expect(type(undefined)).to.equal('undefined');
            expect(type([])).to.equal('array');
            expect(type({})).to.equal('object');
            expect(type(true)).to.equal('boolean');
            expect(type('foo')).to.equal('string');
            expect(type(function() {})).to.equal('function');
            expect(type(123)).to.equal('number');
            expect(type(new Date())).to.equal('date');
            expect(type(null)).to.equal('null');
            expect(type(/foo/)).to.equal('regexp');
            expect(type(new Error())).to.equal('error');
            expect(type(nan)).to.equal('nan');
            expect(type(args)).to.equal('arguments');
            expect(type(window)).to.equal('global');
            expect(type(document)).to.equal('document');
            expect(type(document.createElement('div'))).to.equal('element');
            expect(type(document.createTextNode('foo'))).to.equal('textnode');
            expect(type(document.createComment('foo'))).to.equal('commentnode');
            expect(type(document.createDocumentFragment())).to.equal('documentfragment');
            expect(type(document.childNodes)).to.equal('nodelist');
        });
    });
});
