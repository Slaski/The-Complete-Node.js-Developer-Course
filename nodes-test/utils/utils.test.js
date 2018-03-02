const utils = require('./utils');

it('should add two numbers', () => {
    var result = utils.add(33, 11);
    if (result !== 44) {
        throw new Error(`Expected 44, but got ${result}.`);
    }
});

it('should square a number', () => {
    var result = utils.square(3);
    if (result !== 9) {
        throw new Error(`Expected 9, but got ${result}.`);
    }
});