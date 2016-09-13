import { expect } from 'chai';
import { config, isDebugging } from '../../../src/app';

describe('app/isDebugging', () => {
    it('should return false by default', () => {
        expect(isDebugging()).to.equal(false);
    });

    it('should support turning on debugging mode via the "debug" config option', () => {
        config('debug', true);
        expect(isDebugging()).to.equal(true);
        config('debug', false);
    });
});
