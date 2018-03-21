var expect = require('expect');

var {generateMessage} = require('./message');

describe(`./server/utils/message.js`, () => {
    describe('generateMessage', () => {
        it('should generate the correct message object', () => {
            var message = generateMessage('Simba', 'Hakuna Matata!');
            
            expect(message.from).toBe('Simba');
            expect(message.text).toBe('Hakuna Matata!');
            expect(message.createdAt).toBeA('number');
        });
    });
});