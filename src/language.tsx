import {createContext,useContext} from 'react';
export const RoutePath=createContext('/');
export function LanguageSwitch(){const path=useContext(RoutePath);return <a className="language-switch" href={'/ar'+(path==='/'?'':path)} lang="ar" hrefLang="ar">العربية</a>}
