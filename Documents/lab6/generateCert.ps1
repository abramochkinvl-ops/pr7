const express = require("express");

const app = express();

app.get("/data", (req, res) => {
    res.json({
        message: "Simulated HTTPS endpoint",
        note: "In real HTTPS traffic is encrypted"
    });
});

app.listen(3443, () => {
    console.log("HTTPS simulation running on https://localhost:3443");
});