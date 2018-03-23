const expect = require('expect');

const {Users} = require('./users');

describe('./server/utils/users.js', () => {
    describe('Users', () => {
        var users;

        beforeEach(() => {
            users = new Users();
            users.users = [{
                id: 1,
                name: 'Du',
                room: 'Dark Room'
            }, {
                id: 2,
                name: 'Dudu',
                room: 'Red Room'
            }, {
                id: 3,
                name: 'Edu',
                room: 'Dark Room'
            }];
        });

        it('should add new user', () => {
            var user = users.addUser(123, 'Slaski', 'Red Room');

            expect(users.users.length).toBe(4);
            expect(users.users[3]).toEqual(user);
        });

        it('should remove a user', () => {
            var user = users.removeUser(2);

            expect(users.users.length).toBe(2);
            expect(user.id).toBe(2);
        });

        it('should not remove a non-existent user', () => {
            var user = users.removeUser(5);

            expect(users.users.length).toBe(3);
            expect(user).toNotExist();
        });

        it('should find user', () => {
            var user = users.getUser(2);

            expect(user.id).toBe(2);
            expect(user).toEqual(users.users[1]);
        });

        it('should not find a non-existent user', () => {
            var user = users.getUser(5);

            expect(user).toNotExist();
        });

        it('should return names for specific room', () => {
            var darkRoomNames = users.getUserList('Dark Room');
            var redRoomNames = users.getUserList('Red Room');

            expect(darkRoomNames).toEqual(['Du', 'Edu']);
            expect(redRoomNames).toEqual(['Dudu']);
        });
    });
});