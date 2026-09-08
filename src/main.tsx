import {createRoot,hydrateRoot} from 'react-dom/client';
import {resolveRoute} from './routes';
import './globals.css';
const route=resolveRoute(window.location.pathname);
document.title=route.title+' | Taqwa Agency';
const root=document.getElementById('root')!;
if(root.dataset.prerendered==='true')hydrateRoot(root,route.element);else createRoot(root).render(route.element);

const ar=/^\/ar(?:\/|$)/.test(window.location.pathname);
document.documentElement.lang=ar?'ar':'en';
document.documentElement.dir=ar?'rtl':'ltr';
