let http = require("http");
let fs = require("fs");
let url = require("url");
let qs = require("querystring");
const path = require("path");

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
        <a href="/create">create</a>
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
    } else if (pathname === "/create") {
        fs.readdir("./data", (err, filelist) => {
            let title = "WEB - create";
            let list = templateList(filelist);
            res.writeHead(200); // 웹서버가 200을 준다는 것은 성공적으로 작업을 종료했다는 뜻
            res.end(
                templateHTML(
                    title,
                    list,
                    `
                    <form action="http://localhost:3000/create_process" method="post">
                        <p></p><input type="text" name="title" placeholder="title"/></p>
                        <p><textarea name='description' placeholder="input description this area!"></textarea></p>
                        <input type="submit"/>
                    </form>
                    `
                )
            );
        });
    } else if (pathname === "/create_process") {
        let body = "";
        // res.on() = 데이터의 조각(data)을 수신할 때 마다 on의 콜백함수를 호출함
        req.on("data", (data) => {
            body += data;
            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });
        // post로 전송된 데이터를 담은 body를 qs.parse(qs = require('querystring))로
        // parsing하여 post변수로 데이터 처리 가능
        req.on("end", () => {
            let post = qs.parse(body);
            let title = post.title;
            let description = post.description;

            fs.writeFile(`data/${title}`, description, "utf-8", (err) => {
                if (err) {
                    console.log(err.message);
                }
                // res.writeHead(200);
                // nodeJS에서 redirect사용법
                // writeHead(200) -> 페이지를 성공적으로 가져옴을 뜻함
                // writeHead(302, {Loction: specific spot}) -> Loction으로 페이지를 이동시킴
                res.writeHead(302, {
                    Location: `/?id=${title}`,
                });
                res.end("success");
            });
        });
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
});
app.listen(3000);
