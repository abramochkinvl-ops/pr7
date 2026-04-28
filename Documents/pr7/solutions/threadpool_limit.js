const http = require("http");
const crypto = require("crypto");

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/threadpool-limit") {

        const start = Date.now();

        const tasks = 8;

        let completed = 0;

        for (let i = 0; i < tasks; i++) {
            crypto.pbkdf2("password", "salt", 100000, 64, "sha512", () => {

                completed++;

                if (completed === tasks) {
                    const durationMs = Date.now() - start;

                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");

                    res.end(JSON.stringify({
                        tasks,
                        durationMs
                    }));
                }
            });
        }

        return;
    }

    res.statusCode = 404;
    res.end("Not Found");
});

server.listen(process.argv[2] || 3000);