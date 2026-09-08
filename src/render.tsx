import {renderToString} from 'react-dom/server';
import {routes,resolveRoute} from './routes';
export const paths=Object.keys(routes);
export function render(path:string){const route=resolveRoute(path);return {title:route.title+' | Taqwa Agency',html:renderToString(route.element)}}
