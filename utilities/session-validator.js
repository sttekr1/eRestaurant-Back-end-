const validateAuthenticatedSession = (req, res, next) => {
    const isAuthenticated = req.session?.authenticated;
    if (isAuthenticated) {
        next();
    } else {
        res.status(401).send({ message: "Not authenticated" });
    }
};

const validateAdminSession = (req, res, next) => {
    const isAdmin = req.session?.isAdmin;
    const isAuthenticated = req.session?.authenticated;

    if (isAdmin && isAuthenticated) {
        next();
    } else {
        res.status(403).send({ message: "Not autohrized" });
    }
};

module.exports = { validateAuthenticatedSession, validateAdminSession };