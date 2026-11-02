import { createServer } from 'node:http';
import { readFile,stat } from 'node:fs/promises';
import { resolve,extname } from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.json':'application/json','.xml':'application/xml','.txt':'text/plain'};
createServer(async(req,res)=>{
 try {
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/api/admin/session'){res.writeHead(200,{'Content-Type':'application/json'});res.end('{"authenticated":false}');return;}
  let file=resolve(root,'.'+decodeURIComponent(url.pathname));let status=200;
  if(file!==root&&!file.startsWith(root+'/')){res.writeHead(403);res.end();return;}
  try{if((await stat(file)).isDirectory()) file+='/index.html';await stat(file);}catch{try{file=resolve(root,'.'+decodeURIComponent(url.pathname).replace(/\/$/,'')+'.html');await stat(file);}catch{file=root+'/404.html';status=404;}}
  const body=await readFile(file);res.writeHead(status,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
 }catch{res.writeHead(500);res.end();}
}).listen(4173,'127.0.0.1',()=>console.log('Preview http://127.0.0.1:4173'));
