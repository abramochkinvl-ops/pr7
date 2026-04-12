const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();

app.get("/data", (req, res) => {
    console.log("HTTPS request");
    console.log("Authorization:", req.headers["authorization"]);

    res.json({
        message: "HTTPS OK",
        token: req.headers["authorization"]
    });
});

https.createServer({
    key: fs.readFileSync("./cert/key.pem"),
    cert: fs.readFileSync("./cert/cert.pem")
}, app).listen(3443, () => {
    console.log("HTTPS running on https://localhost:3443");
});