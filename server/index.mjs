import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {submitInquiry} from './inquiries.mjs';
const dev=process.argv.includes('--dev');
const port=Number(process.env.PORT)||3000;
const publicRoot=resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.json':'application/json'};
const json=(res,status,body)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(body))};
let vite;
const server=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/api/inquiries'){
   if(req.method!=='POST'){json(res,405,{error:'Method not allowed'});return}
   if(!(req.headers['content-type']||'').includes('application/json')){json(res,415,{error:'Expected JSON'});return}
   if(req.headers['sec-fetch-site']==='cross-site'){json(res,403,{error:'Please submit the form from this website.'});return}
   const chunks=[];let bytes=0;
   for await(const chunk of req){bytes+=chunk.length;if(bytes>20000){json(res,413,{error:'Please shorten your project description.'});return}chunks.push(chunk)}
   let payload;try{payload=JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{json(res,400,{error:'Invalid form data'});return}
   const result=await submitInquiry(payload);json(res,result.status,result.body);return;
  }
  if(url.pathname.startsWith('/api/')){json(res,404,{error:'Not found'});return}
  if(dev){vite.middlewares(req,res,()=>{res.writeHead(404);res.end('Not found')});return}
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return}
  const pathname=decodeURIComponent(url.pathname);let file=resolve(publicRoot,'.'+pathname);
  if(file!==publicRoot&&!file.startsWith(publicRoot+sep)){res.writeHead(403);res.end();return}
  let status=200;
  try{const info=await stat(file);if(info.isDirectory())file=resolve(file,'index.html');await stat(file)}catch{file=resolve(publicRoot,'404.html');status=404}
  const data=await readFile(file);res.writeHead(status,{'Content-Type':mime[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':pathname.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache'});res.end(req.method==='HEAD'?undefined:data);
 }catch{if(!res.headersSent){res.writeHead(500,{'Content-Type':'text/plain'});res.end('The site could not complete this request.')}else res.end()}
});
if(dev){const {createServer:createViteServer}=await import('vite');vite=await createViteServer({server:{middlewareMode:true,host:'0.0.0.0',hmr:{server}},appType:'spa'})}
server.listen(port,'0.0.0.0',()=>console.log(`Taqwa Agency listening on port ${port}`));
