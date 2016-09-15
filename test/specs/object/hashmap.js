import { expect } from 'chai';
import { hashmap } from '../../../src/object';

describe('object/hashmap', () => {
    it('should be an object', () => {
        const map = hashmap();
        expect(map).to.be.an('object');
    });

    it('should support assigning and reading properties', () => {
        const map = hashmap();
        map.foo = 1;
        map.bar = 2;

        expect(map['foo']).to.equal(1); // eslint-disable-line dot-notation
        expect(map.bar).to.equal(2);
    });

    it('should support enumeration', () => {
        const map = hashmap();
        map.foo = 1;
        map.bar = 2;

        let i = 0;
        const keys = Object.keys(map);
        for (const prop in map) {
            expect(prop).to.equal(keys[i]);
            expect(map[prop]).to.equal(map[keys[i]]);
            i++;
        }
    });

    it('should not have a prototype or inherited properties/methods', () => {
        const map = hashmap();
        expect(Object.getPrototypeOf(map)).to.equal(null);
        let hasProps = false;
        /* eslint-disable no-unused-vars */
        for (const key in map) {
            hasProps = true;
        }
        /* eslint-enable no-unused-vars */
        expect(hasProps).to.equal(false);
        Object.getOwnPropertyNames(Object.prototype).forEach((prop) => {
            expect(prop in map).to.equal(false);
        });
    });

    it('should allow object literal as an argument to populate the map with its properties', () => {
        const map = hashmap({foo: 1, bar: 2});
        expect(map).to.eql({foo: 1, bar: 2});
    });

    it('should allow multiple object literals as parameters (right overwrites left)', () => {
        const map = hashmap({foo: 1, bar: 2}, {baz: 3, qux: 4}, {foo: 10});
        expect(map).to.eql({foo: 10, bar: 2, baz: 3, qux: 4});
    });

    if (typeof Symbol !== 'undefined' && Symbol.iterator) {
        it('should be iterable', () => {
            const map = hashmap({foo: 1, bar: 2});
            expect(Symbol.iterator in map).to.equal(true);
            const descriptor = Object.getOwnPropertyDescriptor(map, Symbol.iterator);
            expect(descriptor.configurable).to.equal(false);
            expect(descriptor.enumerable).to.equal(false);
            expect(descriptor.writable).to.equal(false);
        });

        it('should support for...of loops', () => {
            const map = hashmap({foo: 1, bar: 2});
            let i = 0;
            const keys = Object.keys(map);
            for (const [key, value] of map) {
                expect(key).to.equal(keys[i]);
                expect(value).to.equal(map[keys[i++]]);
            }
        });

        it('should support iterator syntax', () => {
            const map = hashmap({foo: 1, bar: 2});
            let i = 0;
            const entries = Object.entries(map);
            const iter = map[Symbol.iterator]();
            expect(iter.next().value).to.eql(entries[i++]);
            expect(iter.next().value).to.eql(entries[i++]);
            expect(iter.next().done).to.eql(true);
        });
    }
});
