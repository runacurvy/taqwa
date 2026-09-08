import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {paths,render} from '../dist-ssr/render.js';
const template=await readFile('dist/index.html','utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const description='Business launch, project management and digital transformation for Muslim founders worldwide. United States · Egypt. Build with Taqwa.';
const origin=process.env.SITE_URL?new URL(process.env.SITE_URL).origin:null;
for(const path of [...paths,'/404']){
 const {title,html}=render(path);
 const head=`<meta name="description" content="${escape(description)}"/><meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(description)}"/><meta property="og:type" content="website"/>`+(origin?`<link rel="canonical" href="${origin}${path==='/'?'':path}"/>`:'');
 const file=path==='/404'?'dist/404.html':join('dist',path,'index.html');
 await mkdir(join(file,'..'),{recursive:true});
 await writeFile(file,template.replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace('<!--route-head-->',head).replace('<div id="root">','<div id="root" data-prerendered="true">').replace('<!--route-html-->',html));
}
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nDisallow: /api/\n'+(origin?`Sitemap: ${origin}/sitemap.xml\n`:''));
if(origin)await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>`<url><loc>${origin}${p}</loc></url>`).join('')+'</urlset>');
console.log(`Prerendered ${paths.length} pages plus the 404 page.`);
