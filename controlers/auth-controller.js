const AuthModel = require("../models/auth-models");
const authModel = new AuthModel();

class AuthController {
    login(credentials) {
        return authModel.login(credentials);
    };
    logout() {
        return authModel.logout();
    };
};

module.exports = AuthController;