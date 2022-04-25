const session = require("express-session");

module.exports = session({
    secret: "secure_session_id",
    name: "private_session_name",

    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // equivalent to 24 hours
    },
    saveUninitialized: false,
    resave: false
});