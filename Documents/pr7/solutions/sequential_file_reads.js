const http = require("http");
const fs = require("fs");

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/sequential") {
        const start = Date.now();

        fs.readFile("a.txt", "utf8", (err, dataA) => {
            if (err) {
                res.statusCode = 500;
                return res.end("Error reading a.txt");
            }

            fs.readFile("b.txt", "utf8", (err, dataB) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end("Error reading b.txt");
                }

                fs.readFile("c.txt", "utf8", (err, dataC) => {
                    if (err) {
                        res.statusCode = 500;
                        return res.end("Error reading c.txt");
                    }

                    const end = Date.now();

                    const result = {
                        combined: dataA.trim() + dataB.trim() + dataC.trim(),
                        elapsedMs: end - start
                    };

                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(result));
                });
            });
        });
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});