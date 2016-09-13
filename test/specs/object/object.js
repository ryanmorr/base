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
    describe('enumerate', () => {
        it('should iterate an object\'s own enumerable key/value pairs of an object', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            enumerate(object, function(key, value, obj) {
                expect(key).to.be.a('string');
                expect(value).to.be.a('number');
                expect(obj).to.equal(object);
                expect(this).to.be.a('number');
            });
        });
    });

    describe('merge', () => {
        it('should copy the own enumerable properties from one or more objects to a target object', () => {
            const target = {};
            const object1 = {foo: 1, bar: 2};
            const object2 = {baz: 3};
            const object3 = {foo: 10, qux: 4};
            const returnValue = merge(target, object1, object2, object3);
            expect(returnValue).to.equal(target);
            expect(target).to.deep.equal({foo: 10, bar: 2, baz: 3, qux: 4});
        });
    });

    describe('filter', () => {
        it('should create a new object for the own enumerable key/value pairs that pass a condition', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            const newObject = filter(object, (key, value) => value > 1);
            expect(newObject).to.be.a('object');
            expect(newObject).to.not.equal(object);
            expect(newObject).to.deep.equal({bar: 2, baz: 3});
        });
    });

    describe('map', () => {
        it('should create a new object with the results of a calling function on every own enumerable key/value pair in the object', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            const newObject = map(object, (key, value) => value * 2);
            expect(newObject).to.be.a('object');
            expect(newObject).to.not.equal(object);
            expect(newObject).to.deep.equal({foo: 2, bar: 4, baz: 6});
        });
    });

    describe('size', () => {
        it('should return the number of own enumerable key/value pairs on an object', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            expect(size(object)).to.equal(3);
        });

        it('should return 0 of an object has no own enumerable properties', () => {
            const object = {};
            expect(size(object)).to.equal(0);
        });
    });

    describe('isEmpty', () => {
        it('should return true if the object has no own enumerable properties', () => {
            const object = {};
            expect(isEmpty(object)).to.be.true;
        });

        it('should return false if the object has own enumerable properties', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            expect(isEmpty(object)).to.be.false;
        });
    });

    describe('keys', () => {
        it('should return the keys of an object\'s own enumerable properties as an array', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            expect(keys(object)).to.deep.equal(['foo', 'bar', 'baz']);
        });
    });

    describe('values', () => {
        it('should return the values of an object\'s own enumerable properties as an array', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            expect(values(object)).to.deep.equal([1, 2, 3]);
        });
    });

    describe('contains', () => {
        it('should return true if an object has an own enumerable property with a value matching the provided value', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            expect(contains(object, 1)).to.be.true;
        });

        it('should return false if an object has an own enumerable property with no value matching the provided value', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            expect(contains(object, 4)).to.be.false;
        });
    });

    describe('removeKeys', () => {
        it('should remove all own enumerable properties that match the provided key(s)', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            removeKeys(object, 'foo', 'bar');
            expect(object).to.deep.equal({baz: 3});
        });
    });

    describe('removeValues', () => {
        it('should remove all own enumerable properties with values that match the provided value(s)', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            removeValues(object, 2, 3);
            expect(object).to.deep.equal({foo: 1});
        });
    });

    describe('clear', () => {
        it('should remove all own properties from the provided object', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            clear(object);
            expect(size(object)).to.equal(0);
        });
    });

    describe('entries', () => {
        it('should return an array of an object\'s own enumerable properties as an array ([key, value])', () => {
            const object = {foo: 1, bar: 2, baz: 3};
            expect(entries(object)).to.deep.equal([['foo', 1], ['bar', 2], ['baz', 3]]);
        });
    });
});
