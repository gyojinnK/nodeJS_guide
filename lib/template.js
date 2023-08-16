const template = {
    HTML: function (title, list, body, control) {
        return `
        <!doctype html>
        <html>
        <head>
            <title>WEB2 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
    `;
    },
    list: function (filelist) {
        let list = "<ul>";
        let i = 0;
        while (i < filelist.length) {
            list += `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`;
            i++;
        }
        list += "</ul>";
        return list;
    },
};

module.exports = template;

// const templateHTML = (title, list, body, control) => {
//     return `
//     <!doctype html>
//     <html>
//     <head>
//         <title>WEB1 - ${title}</title>
//         <meta charset="utf-8">
//     </head>
//     <body>
//         <h1><a href="/">WEB</a></h1>
//         ${list}
//         ${control}
//         ${body}
//     </body>
//     </html>
// `;
// };

// /**
//  *
//  * @param filelist ./data dir 속 파일의 리스트
//  * @returns list HTML 코드
//  */
// const templateList = (filelist) => {
//     let list = "<ul>";
//     let i = 0;
//     while (i < filelist.length) {
//         list += `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`;
//         i++;
//     }
//     list += "</ul>";
//     return list;
// };
