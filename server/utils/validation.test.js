const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string value', () => {
        var input = 123;
        var output = isRealString(input);
        expect(output).toBeFalsy();
    });

    it('should reject empty string value', () => {
        var input = '   ';
        var output = isRealString(input);
        expect(output).toBeFalsy();
    });

    it('should accept proper string value', () => {
        var input = 'proper 124 string';
        var output = isRealString(input);
        expect(output).toBeTruthy();
    });
});