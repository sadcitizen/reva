import { expect } from 'chai';
import createValidator from './create-validator';

describe('createValidator', () => {
    const isEven = createValidator(value => value % 2 === 0);

    it('returns a function', () => {
        expect(isEven).to.be.a('function');
        expect(isEven()).to.be.a('function');
        expect(isEven()()).to.be.a('function');
    });

    it('returns a valid validation result', () => {
        const result = isEven('The value must be an even number')()(2);

        expect(result).to.have.property('isValid').that.is.a('boolean');
        expect(result).to.have.property('error').that.is.a('string');
    });

    it('works with error message as function', () => {
        const isOdd = createValidator(value => value % 2 !== 0);

        const result = isOdd(value => `${value} is not an odd number`)()(2);

        expect(result).to.have.property('isValid').that.is.a('boolean');
        expect(result).to.have.property('error').that.is.a('string');
    });
});
