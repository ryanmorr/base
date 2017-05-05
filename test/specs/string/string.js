import { expect } from 'chai';
import { toCamelCase, toKebabCase } from '../../../src/string';

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
});
