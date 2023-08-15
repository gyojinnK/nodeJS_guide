let http = require("http");
let fs = require("fs");
let url = require("url");

/**
 *
 * @param title 글의 제목
 * @param list 글 목록 리스트
 * @param body 타이틀과 설명
 * @returns HTML 생성 코드
 */
const templateHTML = (title, list, body) => {
    return `
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
    </body>
    </html>
`;
};

/**
 *
 * @param filelist ./data dir 속 파일의 리스트
 * @returns list HTML 코드
 */
const templateList = (filelist) => {
    let list = "<ul>";
    let i = 0;
    while (i < filelist.length) {
        list += `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`;
        i++;
    }
    list += "</ul>";
    return list;
};

let app = http.createServer((req, res) => {
    let _url = req.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;

    if (pathname === "/") {
        if (queryData.id === undefined) {
            fs.readdir("./data", (err, filelist) => {
                console.log(filelist);
                let title = "Welcome";
                let description = "Hello, Node.js!";
                let list = templateList(filelist);
                res.writeHead(200); // 웹서버가 200을 준다는 것은 성공적으로 작업을 종료했다는 뜻
                res.end(
                    templateHTML(title, list, `<h2>${title}</h2>${description}`)
                );
            });
        } else {
            fs.readdir("./data", (err, filelist) => {
                console.log(filelist);
                fs.readFile(
                    `./data/${queryData.id}`,
                    "utf-8",
                    (err, description) => {
                        let title = queryData.id;
                        let list = templateList(filelist);
                        res.writeHead(200); // 웹서버가 200을 준다는 것은 성공적으로 작업을 종료했다는 뜻
                        res.end(
                            templateHTML(
                                title,
                                list,
                                `<h2>${title}</h2>${description}`
                            )
                        );
                    }
                );
            });
        }
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
});
app.listen(3000);
