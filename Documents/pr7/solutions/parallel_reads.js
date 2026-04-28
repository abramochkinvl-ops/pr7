const http = require("http");
const fs = require("fs").promises;

const PORT = process.argv[2] || 3000;

const readFile = (path) => fs.readFile(path, "utf8");

const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/parallel") {
        const start = Date.now();

        try {
            const [a, b, c] = await Promise.all([
                readFile("a.txt"),
                readFile("b.txt"),
                readFile("c.txt")
            ]);

            const end = Date.now();

            const result = {
                combined: a.trim() + b.trim() + c.trim(),
                elapsedMs: end - start
            };

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(result));
        } catch (err) {
            res.statusCode = 500;
            return res.end("Error reading files");
        }
    }

    res.statusCode = 404;
    res.end("Not Found");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});