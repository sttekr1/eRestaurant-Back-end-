const express = require("express");
const router = require("./router-const");
const session = require("./session-const");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "0.0.0.0"

app.use(session);
app.use(router);

app.listen(PORT, HOST, () => console.log(`Server is listening on port: ${PORT}`));

// console.log(uuid());