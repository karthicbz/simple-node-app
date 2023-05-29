const http = require('http');
const path = require('path');
const fs = require('fs');

const port = process.env.port || 8080;
const hostname = 'localhost';

const server = http.createServer((req, res)=>{
    if(req.url.endsWith('.css')){
        res.writeHead(200, {'Content-Type':'text/css'});
        // console.log(req.url);
        fs.readFile('./styles/style.css', (err, data)=>{
            if(err){
                console.log(err);
            }
            res.end(data);
        });
    }else{
        const url = (req.url === '/')?'/index':req.url;
        res.writeHead(200, {'Content-Type':'text/html'});
        fs.readFile(`./pages/${url}.html`, (err, data)=>{
            if(err){
                fs.readFile('./pages/404.html', (err, data)=>{
                    res.end(data);
                })
            }else{
                res.end(data);
            }
        })
    }
})

server.listen(port, hostname, ()=>{
    console.log(`server running on port http://localhost:${port}`);
})