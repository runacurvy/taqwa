import Home,{Story,Services,ServicePage,Portfolio,Resources,Article,Contact,Privacy,Shell} from './site';
export const routes:Record<string,{title:string,element:React.ReactNode}>={
 '/':{title:'You have the idea. Let’s build the business.',element:<Home/>},
 '/our-story':{title:'Our Story',element:<Story/>},
 '/what-we-do':{title:'What We Do',element:<Services/>},
 '/what-we-do/business-launch':{title:'Business Launch',element:<ServicePage slug="business-launch"/>},
 '/what-we-do/project-management':{title:'Project Management',element:<ServicePage slug="project-management"/>},
 '/what-we-do/digital-transformation':{title:'Digital Transformation & AI',element:<ServicePage slug="digital-transformation"/>},
 '/portfolio':{title:'Portfolio',element:<Portfolio/>},
 '/resources':{title:'Resources',element:<Resources/>},
 '/resources/before-you-build':{title:'Before You Build',element:<Article slug="before-you-build"/>},
 '/resources/less-chasing-more-progress':{title:'Less Chasing. More Progress.',element:<Article slug="less-chasing-more-progress"/>},
 '/resources/before-you-automate':{title:'Before You Automate',element:<Article slug="before-you-automate"/>},
 '/contact':{title:'Start a Project',element:<Contact/>},
 '/privacy':{title:'Privacy',element:<Privacy/>}
};
export function resolveRoute(path:string){return routes[path.replace(/\/$/,'')||'/']??{title:'Page Not Found',element:<Shell><section className="page-hero"><h1>This page is not here.</h1><p>Let’s get you back to the beginning.</p><a className="button" href="/">Back to Taqwa</a></section></Shell>}}
