const path = require("path");
const fs = require("fs");

const usersPath = path.join(__dirname, "..", "db", "users.json");

class AuthModel {
    login(credentials) {
        return new Promise((resolve, reject) => {
            const users = fs.readFileSync(usersPath, { encoding: "utf-8" });
            const foundUser = users.find(user => {
                user.username === credentials.username &&
                user.password === credentials.password
            });

            if (foundUser) {
                resolve({ message: "User logged in", user: foundUser });
            } else {
                reject({ message: "No such user found" });
            };
        })
    };
    logout() {
        return new Promise((resolve, reject) => {
            resolve({ message: "User logged out successfully" });
        });
    };
};

module.exports = AuthModel;