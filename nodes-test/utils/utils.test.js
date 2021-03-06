const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {
    describe('#add', () => {
        it('should add two numbers', () => {
            var result = utils.add(33, 11);
            expect(result).toBe(44).toBeA('number');
        });
    });

    describe('#asyncAdd', () => {
        it('should async add two numbers', (done) => {
            utils.asyncAdd(4, 3, (result) => {
                expect(result).toBe(7).toBeA('number');
                done();
            });
        });
    });
    
    describe('#square', () => {
        it('should square a number', () => {
            var result = utils.square(3);
            expect(result).toBe(9).toBeA('number');
        });
    });
    
    describe('#asyncSquare', () => {
        it('should async square a number', (done) => {
            utils.asyncSquare(4, (result) => {
                expect(result).toBe(16).toBeA('number');
                done();
            });
        });
    });
    
    describe('#setName', () => {
        it('should verify first and last names are set', () => {
            var result = utils.setName({}, 'Rodrigo Zanetta');
            expect(result).toInclude({
                firstName: 'Rodrigo',
                lastName: 'Zanetta'
            });
        });
    });
});