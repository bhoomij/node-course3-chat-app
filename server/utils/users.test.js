const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: 2,
            name: 'Jen',
            room: 'React Course'
        }, {
            id: 3,
            name: 'John',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var user = {
            id: 123,
            name: 'user1',
            room: 'test room'
        };
        var users = new Users();
        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return userlist for node course', () => {
        var list = users.getUserList('Node Course');
        expect(list).toEqual(['Mike', 'John']);
    });

    it('should return userlist for react course', () => {
        var list = users.getUserList('React Course');
        expect(list).toEqual(['Jen']);
    });

    it('should find user by id', () => {
        var user = users.getUser(1);
        expect(user).toEqual(users.users[0]);
    });

    it('should not find user for invalid id', () => {
        var user = users.getUser(10);
        expect(user).toNotExist();
    });

    it('should remove user', () => {
        var userId = 1;
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user for invalid id', () => {
        var userId = 100;
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
});
