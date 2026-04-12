const express = require("express");
const app = express();

app.use(express.json());

app.get("/data", (req, res) => {
    const token = req.headers["authorization"];

    console.log("HTTP request");
    console.log("Authorization:", token);

    res.json({
        message: "HTTP working",
        token: token
    });
});

app.listen(3000, () => {
    console.log("HTTP server running on http://localhost:3000");
});