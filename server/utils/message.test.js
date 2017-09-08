const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {

    it('should return correct message object', () => {
        var from = 'user1';
        var text = 'Test message';
        var output = generateMessage(from, text);
        expect(output).toInclude({from, text});
        expect(output.createdAt).toBeA('number');
    });
});

describe('generateLocalMessage', () => {
    it('should return correct location', () => {
        var latitude = 1;
        var longitude = 3;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`
        var output = generateLocationMessage('Admin', 1, 3);
        expect(output).toInclude({
            from: 'Admin',
            url
        });
    });
});
