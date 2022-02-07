"use strict";

const { sql, pool } = require("../config/db");

class userStorage {

    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});     
        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);

        if (isAll) return users;

        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers; 
    }
    

    static getUsers(isAll, ...fields) {
    }
 
    static async getUserInfo(id) {
      return new Promise((resolve, reject) => {

        pool.request()
        .input('input_id', sql.VarChar, id)
        .query("SELECT * FROM _SMMember WHERE id = @input_id", (err, data) => {
        if (err) reject(err);
        resolve(data.recordset[0]);
        
        });
      });
    }

    static async save(userInfo) {
      return new Promise((resolve, reject) => {

        pool.request()
        .input('input_id', sql.VarChar, userInfo.id)
        .input('input_name', sql.VarChar, userInfo.name)
        .input('input_psword', sql.VarChar, userInfo.psword)
        .query("INSERT INTO _SMMember(id, name, psword) VALUES(@input_id, @input_name, @input_psword)", (err) => {
        if (err) reject(err);
        resolve( {success: true} );
        });
      });
    }
}

module.exports = userStorage;