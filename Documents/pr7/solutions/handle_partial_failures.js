const http = require("http");
const fs = require("fs").promises;

const server = http.createServer((req, res) => {

    if (req.method === "POST" && req.url === "/error-handling") {

        req.setEncoding("utf8"); 

        req.setEncoding("utf8");

let body = "";

req.on("data", chunk => {
    body += chunk.toString();
});

req.on("end", () => {

    console.log("RAW BODY:", body);

    let files;

    try {
        files = JSON.parse(body);
    } catch (e) {
        res.statusCode = 400;
        return res.end("Invalid JSON");
    }

    if (!Array.isArray(files)) {
        res.statusCode = 400;
        return res.end("Invalid JSON");
    }

    Promise.allSettled(
        files.map(f => fs.readFile(f, "utf8"))
    ).then(results => {

        const successes = [];
        const failures = [];

        for (const r of results) {
            if (r.status === "fulfilled") {
                successes.push(r.value.trim());
            } else {
                failures.push(r.reason.message);
            }
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({
            successes,
            failures,
            total: files.length
        }));
    });
});

        return;
    }

    res.statusCode = 404;
    res.end("Not Found");
});

server.listen(process.argv[2] || 3000, () => {
    console.log("Server started");
});

console.log("CWD:", process.cwd());
console.log("__dirname:", __dirname);