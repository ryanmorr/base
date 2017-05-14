import { expect } from 'chai';
import { toCamelCase, toKebabCase, substitute, isEmpty, stripNewlines, canonicalizeNewlines, collapseWhitespace } from '../../../src/string';

describe('string/string', () => {
    describe('toCamelCase', () => {
        it('should convert kebab-case to camel-case', () => {
            expect(toCamelCase('foo-bar-baz-qux')).to.equal('fooBarBazQux');
        });
    });

    describe('toKebabCase', () => {
        it('should convert camel-case to kebab-case', () => {
            expect(toKebabCase('fooBarBazQux')).to.equal('foo-bar-baz-qux');
        });
    });

    describe('substitute', () => {
        it('should substitute the placeholders (%s) of a string with the provided values', () => {
            expect(substitute('a %s b %s c %s', 'foo', 'bar', 'baz')).to.equal('a foo b bar c baz');
        });
    });

    describe('isEmpty', () => {
        it('should return true if a string is empty or contains whitespace', () => {
            expect(isEmpty('')).to.equal(true);
            expect(isEmpty('')).to.equal(true);
            expect(isEmpty(' ')).to.equal(true);
            expect(isEmpty('    ')).to.equal(true);
            expect(isEmpty(' \t\t\n\xa0   ')).to.equal(true);
        });

        it('should return false if a string is not empty or does not contains whitespace', () => {
            expect(isEmpty(' abc \t\xa0')).to.equal(false);
            expect(isEmpty(' a b c \t')).to.equal(false);
            expect(isEmpty(';')).to.equal(false);
        });
    });

    describe('stripNewlines', () => {
        it('should replace all new line characters with a single space', () => {
            expect(stripNewlines('some\nlines\rthat\r\nare\n\nsplit')).to.equal('some lines that are split');
        });
    });

    describe('canonicalizeNewlines', () => {
        it('should replace Windows and Mac new line characters with unix style', () => {
            expect(canonicalizeNewlines('some\nlines\rthat\r\nare\n\nsplit')).to.equal('some\nlines\nthat\nare\n\nsplit');
        });
    });

    describe('collapseWhitespace', () => {
        it('should converts multiple whitespace chars to a single space, and strips leading and trailing whitespace', () => {
            expect(collapseWhitespace('  abc')).to.equal('abc');
            expect(collapseWhitespace('abc  ')).to.equal('abc');
            expect(collapseWhitespace('  abc  ')).to.equal('abc');
            expect(collapseWhitespace('\xa0\n\t abc\xa0\n\t ')).to.equal('abc');
            expect(collapseWhitespace('a   b    c')).to.equal('a b c');
            expect(collapseWhitespace('a\t\t\tb\tc')).to.equal('a b c');
            expect(collapseWhitespace(' \ta \t \t\tb\t\n\xa0  c  \t\n')).to.equal('a b c');
        });
    });
});
