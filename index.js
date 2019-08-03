const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Build File Path
    let filePath = path.join(
        __dirname,
        'Public',
        req.url === '/' ? 'home.html' :  req.url
    );
    console.log(filePath);
    var os = require('os');
 
    let extname = path.extname(filePath);
    // initial content type
    let contentType = 'text/html';
    //check ext and set content type
    switch(extname){
        case '.js':
            contentType = 'text/javascript'; break;
        case '.css':
            contentType = 'text/css'; break;
        case '.json':
            contentType = 'application/json'; break;
        case '.png':
            contentType = 'image/png'; break;
        case '.jpg':
            contentType = 'image/jpg'; break;      
    }

    if (req.method === 'POST') {
            res.end(`yoink`);//`Parsed data belonging to ${result.fname}`);
    }

    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                // PAGE NOT FOUND
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                });
            }
            else{
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else{
            //Success
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content);

        }

    });
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
