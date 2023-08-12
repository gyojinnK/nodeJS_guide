let http = require("http");
let fs = require("fs");
let app = http.createServer((req, res) => {
    let url = req.url;
    if (req.url == "/") {
        url = "/index.html";
    }
    if (req.url == "/favicon.ico") {
        return res.writeHead(404);
    }
    res.writeHead(200);
    console.log(__dirname + url);
    res.end(fs.readFileSync(__dirname + url));
});
app.listen(3000);
