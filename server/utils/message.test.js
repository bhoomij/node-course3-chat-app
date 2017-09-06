const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {

    it('should return correct message object', () => {
        var from = 'user1';
        var text = 'Test message';
        var output = generateMessage(from, text);
        expect(output).toInclude({from, text});
        expect(output.createdAt).toBeA('number');
    });
});