"use strict";

class userStorage {
    static #users = {
        id: ["test", "한송무"],
        psword: ["1234","1234"],
        name: ["테스트", "에물"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});;
        return newUsers; 
    }
}

module.exports = userStorage;