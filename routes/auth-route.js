const router = require("express").Router();
const AuthController = require("../controlers/auth-controller");

const authController = new AuthController();

router.post("/login", async (req, res) => {
    try {
        const credentials = req.body;
        const session = req.session;
        const login = await authController.login(credentials);

        session.authenticated = true;
        session.isAdmin = login.user.role === "admin";

        res.send({ message: login.message });
    } catch (error) {
        res.send(error);
    }
});

router.post("/logout", async (req, res) => {
    try {
        const credentials = req.body;
        const session = req.session;
        const logout = await authController.logout(credentials);

        session.destroy();
        res.clearCookie("private_session_name");
        res.send(logout.message);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;