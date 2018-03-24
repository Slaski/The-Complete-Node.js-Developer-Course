var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe(`./server/utils/message.js`, () => {
    describe('generateMessage', () => {
        it('should generate the correct message object', () => {
            var message = generateMessage('Simba', 'Hakuna Matata!');
            
            expect(message.from).toBe('Simba');
            expect(message.text).toBe('Hakuna Matata!');
            expect(message.createdAt).toBeA('number');
        });
    });

    describe('generateLocationMessage', () => {
        it('should generate correct location object', () => {
            var message = generateLocationMessage('Zé Colméia', -30, 30);

            expect(message.from).toBe('Zé Colméia');
            expect(message.url).toBe('https://www.google.com/maps?q=-30,30')
            expect(message.createdAt).toBeA('number');
        });
    });
});