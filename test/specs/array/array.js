import { expect } from 'chai';
import sinon from 'sinon';
import {
    toArray,
    each,
    eachRight,
    filter,
    map,
    every,
    some,
    indexOf,
    lastIndexOf,
    reduce,
    reduceRight,
    contains,
    unique,
    isEmpty,
    random,
    remove,
    removeAt,
    include,
    insert,
    copy,
    find,
    findIndex,
    clear
} from '../../../src/array';

describe('array/array', () => {
    it('toArray', () => {
        const args = (function() { return arguments; })(1, 2, 3);
        expect(toArray(args)).to.be.an('array');
        expect(toArray(document.childNodes)).to.be.an('array');
        expect(toArray(args)).to.deep.equal([1, 2, 3]);
    });

    it('each', () => {
        const array = [1, 2, 3, 4, 5];
        const context = {multiplier: 0};

        each(array, function(num, i, arr) {
            expect(num).to.equal(i + 1);
            expect(arr).to.equal(array);
            expect(num * this.multiplier).to.equal(0);
        }, context);
    });

    it('eachRight', () => {
        const array = [1, 2, 3, 4, 5];
        const context = {multiplier: 0};
        const reverse = [];

        eachRight(array, function(num, i, arr) {
            expect(num).to.equal(i + 1);
            expect(arr).to.equal(array);
            expect(num * this.multiplier).to.equal(0);
            reverse.push(num);
        }, context);

        expect(reverse).to.deep.equal([5, 4, 3, 2, 1]);
    });

    it('filter', () => {
        const array = [1, 2, 3, 4, 5];
        const newArray = filter(array, (num) => num > 2);
        expect(newArray).to.be.an('array');
        expect(newArray).to.not.equal(array);
        expect(newArray).to.deep.equal([3, 4, 5]);
    });

    it('map', () => {
        const array = [1, 2, 3, 4, 5];
        const newArray = map(array, (num) => num * 2);
        expect(newArray).to.be.an('array');
        expect(newArray).to.not.equal(array);
        expect(newArray).to.deep.equal([2, 4, 6, 8, 10]);
    });

    it('every', () => {
        const array = [1, 2, 3, 4, 5];
        let count = 0;
        const returnValue = every(array, (num, i) => {
            count++;
            return i < 3;
        });

        expect(count).to.equal(4);
        expect(returnValue).to.equal(false);
    });

    it('some', () => {
        const array = [1, 2, 3, 4, 5];
        let count = 0;
        const returnValue = some(array, (num, i) => {
            count++;
            return i === 3;
        });

        expect(count).to.equal(4);
        expect(returnValue).to.equal(true);
    });

    it('indexOf', () => {
        const array = [1, 2, 3, 4, 5];
        expect(indexOf(array, 3)).to.equal(2);
        expect(indexOf(array, 6)).to.equal(-1);
    });

    it('lastIndexOf', () => {
        const array = [1, 2, 3, 4, 5, 6, 5, 4];
        expect(lastIndexOf(array, 5)).to.equal(6);
        expect(lastIndexOf(array, 5, 5)).to.equal(4);
        expect(lastIndexOf(array, 7)).to.equal(-1);
    });

    it('reduce', () => {
        const array = [1, 2, 3, 4, 5];
        const accumulator = [];
        const total = reduce(array, (prev, curr, i) => {
            prev[i] = (curr + 1);
            return prev;
        }, accumulator);

        expect(total).to.equal(accumulator);
        expect(total).to.deep.equal([2, 3, 4, 5, 6]);
    });

    it('reduceRight', () => {
        const array = [1, 2, 3, 4, 5];
        const accumulator = [];
        const total = reduceRight(array, (prev, curr, i) => {
            prev.push((curr + i));
            return prev;
        }, accumulator);

        expect(total).to.equal(accumulator);
        expect(total).to.deep.equal([9, 7, 5, 3, 1]);
    });

    it('contains', () => {
        const array = [1, 2, 3, 4, 5];
        expect(contains(array, 1)).to.be.true;
        expect(contains(array, 6)).to.be.false;
    });

    it('unique', () => {
        const array = [1, 2, 1, 3, 4, 5, 5];
        const array2 = unique(array);
        expect(array2).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('isEmpty', () => {
        const array = [1, 2, 3, 4, 5];
        expect(isEmpty(array)).to.be.false;
        array.length = 0;
        expect(isEmpty(array)).to.be.true;
    });

    it('random', () => {
        const array = [1, 2, 3, 4, 5];
        const spy = sinon.spy(Math, 'random');

        const val = random(array);
        expect(spy.calledOnce).to.be.true;
        expect(array.indexOf(val)).to.not.equal(-1);
        spy.restore();
    });

    it('remove', () => {
        const array = [1, 2, 1, 4, 5];
        remove(array, 1);
        expect(array).to.deep.equal([2, 1, 4, 5]);
    });

    it('removeAt', () => {
        const array = ['foo', 'bar', 'baz'];
        removeAt(array, 1);
        expect(array).to.deep.equal(['foo', 'baz']);
    });

    it('include', () => {
        const array = [1, 2, 3, 4, 5];
        include(array, 6);
        expect(array).to.deep.equal([1, 2, 3, 4, 5, 6]);
        include(array, 1);
        expect(array).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });

    it('insert', () => {
        const array = [1, 2, 4, 5];
        insert(array, 3, 2);
        expect(array).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('copy', () => {
        const array = [1, 2, 3, 4, 5];
        const copied = copy(array);
        expect(copied).to.not.equal(array);
        expect(copied).to.deep.equal(array);
    });

    it('find', () => {
        const array = [1, 2, 3, 4, 5];
        const value = find(array, (item) => item === 3);
        expect(value).to.equal(3);
    });

    it('findIndex', () => {
        const array = [1, 2, 3, 4, 5];
        const value = findIndex(array, (item) => item === 4);
        expect(value).to.equal(3);
    });

    it('clear', () => {
        const array = [1, 2, 3, 4, 5];
        clear(array);
        expect(array.length).to.equal(0);
    });
});
