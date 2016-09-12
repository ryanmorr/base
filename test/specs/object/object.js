import { expect } from 'chai';
import {
    enumerate,
    merge,
    filter,
    map,
    size,
    isEmpty,
    keys,
    values,
    contains,
    removeKeys,
    removeValues,
    clear,
    entries
} from '../../../src/object';

describe('object/object', () => {
    it('enumerate', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        enumerate(object, function(key, value, obj) {
            expect(key).to.be.a('string');
            expect(value).to.be.a('number');
            expect(obj).to.equal(object);
            expect(this).to.be.a('number');
        });
    });

    it('merge', () => {
        const object1 = {foo: 1, bar: 2};
        const object2 = {foo: 10, baz: 3};
        expect(merge(object1, object2)).to.deep.equal({foo: 10, bar: 2, baz: 3});
    });

    it('filter', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        const newObject = filter(object, (key, value) => value > 1);
        expect(newObject).to.be.a('object');
        expect(newObject).to.not.equal(object);
        expect(newObject).to.deep.equal({bar: 2, baz: 3});
    });

    it('map', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        const newObject = map(object, (key, value) => value * 2);
        expect(newObject).to.be.a('object');
        expect(newObject).to.not.equal(object);
        expect(newObject).to.deep.equal({foo: 2, bar: 4, baz: 6});
    });

    it('size', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        expect(size(object)).to.equal(3);
    });

    it('isEmpty', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        expect(isEmpty(object)).to.be.false;
        delete object.foo;
        delete object.bar;
        delete object.baz;
        expect(isEmpty(object)).to.be.true;
    });

    it('keys', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        expect(keys(object)).to.deep.equal(['foo', 'bar', 'baz']);
    });

    it('values', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        expect(values(object)).to.deep.equal([1, 2, 3]);
    });

    it('contains', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        expect(contains(object, 1)).to.be.true;
        expect(contains(object, 4)).to.be.false;
    });

    it('removeKeys', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        removeKeys(object, 'foo', 'bar');
        expect(object).to.deep.equal({baz: 3});
    });

    it('removeValues', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        removeValues(object, 2, 3);
        expect(object).to.deep.equal({foo: 1});
    });

    it('clear', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        clear(object);
        expect(size(object)).to.equal(0);
    });

    it('entries', () => {
        const object = {foo: 1, bar: 2, baz: 3};
        expect(entries(object)).to.deep.equal([['foo', 1], ['bar', 2], ['baz', 3]]);
    });
});
