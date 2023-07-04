const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromise = require('fs').promises
const EventEmitter = require('events')

class Emitter extends EventEmitter {}
// initialize object 

const myEmitter = new Emitter()

const PORT = 3500

const paths = path.join(__dirname,'views','logEvents.js')

const server = http.createServer((req,res)=>{

    const ext = path.extname(req.url)

    let contentType;

    switch(ext){
        case '.css':
            contentType='text/css'
            break;
            case '.js':
                contentType='text/javascript'
                break;
                case '.json':
                    contentType='application/json'
                    break;
                    case '.jpg':
                        contentType='image/jpeg'
                        break;
                        case '.png':
                            contentType='image/png'
                            break;
                            case '.txt':
                                contentType='text/plain'
                                break;
                                default:
                                    contentType='text/html  '
    }

    let filepath = contentType='text/html' && req.url === '/' ? 
    path.join(__dirname,'views','logEvents')
    :contentType='text/html' && req.url.slice(-1) === '/' ? path.join(__dirname,'views',req.url,'logEvents') : path.join(__dirname,req.url)

    console.log(filepath,'filee')

    if(!ext && req.url.slice(-1) !== '/' ) console.log(filepath)

    const fileExist = fs.existsSync(filepath)
})

server.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`)
})