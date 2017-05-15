import { expect } from 'chai';
import sinon from 'sinon';
import { array } from '../../../src';

const {
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
} = array;

describe('array/array', () => {
    describe('toArray', () => {
        it('should convert an array-like object or iterable object to an array', () => {
            const args = (function() { return arguments; })(1, 2, 3);
            const array = toArray(args);
            expect(toArray(document.childNodes)).to.be.an('array');
            expect(array).to.be.an('array');
            expect(array).to.deep.equal([1, 2, 3]);
        });
    });

    describe('each', () => {
        it('should iterate in order (left-to-right)', () => {
            const array = [1, 2, 3, 4, 5];
            each(array, (num, i, arr) => {
                expect(num).to.equal(i + 1);
                expect(arr).to.equal(array);
            });
        });

        it('should support providing an optional context', () => {
            const array = [1, 2, 3, 4, 5];
            const context = {multiplier: 0};

            each(array, function(num) {
                expect(num * this.multiplier).to.equal(0);
            }, context);
        });
    });

    describe('eachRight', () => {
        it('should iterate in reverse order (right-to-left)', () => {
            const array = [1, 2, 3, 4, 5];
            const reverse = [];

            eachRight(array, function(num, i, arr) {
                expect(num).to.equal(i + 1);
                expect(arr).to.equal(array);
                reverse.push(num);
            }, context);

            expect(reverse).to.deep.equal([5, 4, 3, 2, 1]);
        });

        it('should support providing an optional context', () => {
            const array = [1, 2, 3, 4, 5];
            const context = {multiplier: 0};

            eachRight(array, function(num) {
                expect(num * this.multiplier).to.equal(0);
            }, context);
        });
    });

    describe('filter', () => {
        it('should iterate in order (left-to-right)', () => {
            const array = [1, 2, 3, 4, 5];
            filter(array, (num, i, arr) => {
                expect(num).to.equal(i + 1);
                expect(arr).to.equal(array);
            });
        });

        it('should create a new array for the array elements that pass a condition', () => {
            const array = [1, 2, 3, 4, 5];
            const newArray = filter(array, (num) => num > 2);
            expect(newArray).to.be.an('array');
            expect(newArray).to.not.equal(array);
            expect(newArray).to.deep.equal([3, 4, 5]);
        });
    });

    describe('map', () => {
        it('should iterate in order (left-to-right)', () => {
            const array = [1, 2, 3, 4, 5];
            map(array, (num, i, arr) => {
                expect(num).to.equal(i + 1);
                expect(arr).to.equal(array);
            });
        });

        it('should create a new array with the results of a calling function on every element in the array', () => {
            const array = [1, 2, 3, 4, 5];
            const newArray = map(array, (num) => num * 2);
            expect(newArray).to.be.an('array');
            expect(newArray).to.not.equal(array);
            expect(newArray).to.deep.equal([2, 4, 6, 8, 10]);
        });
    });

    describe('every', () => {
        it('should iterate in order (left-to-right)', () => {
            const array = [1, 2, 3, 4, 5];
            every(array, (num, i, arr) => {
                expect(num).to.equal(i + 1);
                expect(arr).to.equal(array);
                return true;
            });
        });

        it('should check if every element in the array passes the test', () => {
            const array = [1, 2, 3, 4, 5];
            let count = 0;
            const returnValue = every(array, (num, i) => {
                count++;
                return i < 3;
            });

            expect(count).to.equal(4);
            expect(returnValue).to.equal(false);
        });
    });

    describe('some', () => {
        it('should iterate in order (left-to-right)', () => {
            const array = [1, 2, 3, 4, 5];
            some(array, (num, i, arr) => {
                expect(num).to.equal(i + 1);
                expect(arr).to.equal(array);
                return false;
            });
        });

        it('should check if some element in the array passes the test', () => {
            const array = [1, 2, 3, 4, 5];
            let count = 0;
            const returnValue = some(array, (num, i) => {
                count++;
                return i === 3;
            });

            expect(count).to.equal(4);
            expect(returnValue).to.equal(true);
        });
    });

    describe('indexOf', () => {
        it('should return the index of a value if it exists in the array', () => {
            const array = [1, 2, 3, 4, 5];
            expect(indexOf(array, 3)).to.equal(2);
        });

        it('should return -1 if a value does\'t exist in the array', () => {
            const array = [1, 2, 3, 4, 5];
            expect(indexOf(array, 6)).to.equal(-1);
        });

        it('should support searching from a optionally provided index', () => {
            const array = [1, 2, 3, 4, 5, 1];
            expect(indexOf(array, 1, 1)).to.equal(5);
        });
    });

    describe('lastIndexOf', () => {
        it('should return this last index of a value if it exists in the array', () => {
            const array = [1, 2, 3, 4, 5, 6, 5, 4];
            expect(lastIndexOf(array, 5)).to.equal(6);
        });

        it('should return -1 if a value does\'t exist in the array', () => {
            const array = [1, 2, 3, 4, 5, 6, 5, 4];
            expect(lastIndexOf(array, 7)).to.equal(-1);
        });

        it('should support searching from a optionally provided index', () => {
            const array = [1, 2, 3, 4, 5, 6, 5, 4];
            expect(lastIndexOf(array, 5, 5)).to.equal(4);
        });
    });

    describe('reduce', () => {
        it('should supply an accumulator for each element of the array in order (left-to-right) to reduce it to a single value', () => {
            const array = [1, 2, 3, 4, 5];
            const accumulator = [];
            const total = reduce(array, (prev, curr, i) => {
                prev[i] = (curr + 1);
                return prev;
            }, accumulator);

            expect(total).to.equal(accumulator);
            expect(total).to.deep.equal([2, 3, 4, 5, 6]);
        });
    });

    describe('reduceRight', () => {
        it('should supply an accumulator for each element of the array in reverse order (right-to-left) to reduce it to a single value', () => {
            const array = [1, 2, 3, 4, 5];
            const accumulator = [];
            const total = reduceRight(array, (prev, curr, i) => {
                prev.push((curr + i));
                return prev;
            }, accumulator);

            expect(total).to.equal(accumulator);
            expect(total).to.deep.equal([9, 7, 5, 3, 1]);
        });
    });

    describe('contains', () => {
        it('should return true if a provided value exists within the array', () => {
            const array = [1, 2, 3, 4, 5];
            expect(contains(array, 1)).to.be.true;
        });

        it('should return false if a provided value does\'t exist within the array', () => {
            const array = [1, 2, 3, 4, 5];
            expect(contains(array, 6)).to.be.false;
        });
    });

    describe('unique', () => {
        it('should create a new array with the duplicate values removed', () => {
            const array = [1, 2, 1, 3, 4, 5, 5];
            const array2 = unique(array);
            expect(array2).to.deep.equal([1, 2, 3, 4, 5]);
        });
    });

    describe('isEmpty', () => {
        it('should return true if the array is empty', () => {
            const array = [];
            expect(isEmpty(array)).to.be.true;
        });

        it('should return false if the array is not empty', () => {
            const array = [1, 2, 3, 4, 5];
            expect(isEmpty(array)).to.be.false;
        });
    });

    describe('random', () => {
        it('should return a random element from the array', () => {
            const array = [1, 2, 3, 4, 5];
            const spy = sinon.spy(Math, 'random');

            const val = random(array);
            expect(spy.calledOnce).to.be.true;
            expect(array.indexOf(val)).to.not.equal(-1);
            spy.restore();
        });
    });

    describe('remove', () => {
        it('should remove all occurences of a value from an array', () => {
            const array = [1, 2, 1, 4, 5];
            remove(array, 1);
            expect(array).to.deep.equal([2, 4, 5]);
        });
    });

    describe('removeAt', () => {
        it('should remove the element of an array at the provided index', () => {
            const array = ['foo', 'bar', 'baz'];
            removeAt(array, 1);
            expect(array).to.deep.equal(['foo', 'baz']);
        });
    });

    describe('include', () => {
        it('should add an element to an array if it doesn\'t already exist', () => {
            const array = [1, 2, 3, 4, 5];
            include(array, 6);
            expect(array).to.deep.equal([1, 2, 3, 4, 5, 6]);
        });

        it('should not add an element to an array if it already exists', () => {
            const array = [1, 2, 3, 4, 5];
            include(array, 1);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });
    });

    describe('insert', () => {
        it('should add an element to an array at the provided index', () => {
            const array = [1, 2, 4, 5];
            insert(array, 3, 2);
            expect(array).to.deep.equal([1, 2, 3, 4, 5]);
        });
    });

    describe('copy', () => {
        it('should create a copy of an array', () => {
            const array = [1, 2, 3, 4, 5];
            const copied = copy(array);
            expect(copied).to.not.equal(array);
            expect(copied).to.deep.equal(array);
        });
    });

    describe('find', () => {
        it('should return the array element that satisfies a condition', () => {
            const array = [1, 2, 3, 4, 5];
            const value = find(array, (item) => item === 3);
            expect(value).to.equal(3);
        });
    });

    describe('findIndex', () => {
        it('should return the index of the array element that satisfies a condition', () => {
            const array = [1, 2, 3, 4, 5];
            const value = findIndex(array, (item) => item === 4);
            expect(value).to.equal(3);
        });
    });

    describe('clear', () => {
        it('should remove all elements from the array', () => {
            const array = [1, 2, 3, 4, 5];
            clear(array);
            expect(array.length).to.equal(0);
        });
    });
});
