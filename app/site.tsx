"use client";
import Link from 'next/link';
import {useState,useEffect} from 'react';
import {ArrowUpRight,ArrowRight,Plus,Minus,Menu,Check,ArrowDown,ShieldCheck,Lock,Camera,Send,Mail} from 'lucide-react';
import {motion} from 'motion/react';
import {Sheet,SheetTrigger,SheetContent,SheetTitle,SheetDescription,SheetClose} from '@/components/ui/sheet';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
import {PortfolioShowcase} from './portfolio-showcase';
const PAYHIP_CONSULTATION_URL = "https://payhip.com/b/gYfH7"; // Customize this with your Payhip Consultation product link
const nav=[['Our Story','/our-story'],['What We Do','/what-we-do'],['Portfolio','/portfolio'],['Resources','/resources']];
const services=[{slug:'business-launch',name:'Business Launch',front:'You have an idea.',back:'Let’s turn it into a business.',desc:'From the first questions to the final moving pieces. We shape the plan, bring the right people together, and help you launch.',items:['Business research','Business model','Product development','Supplier sourcing','Manufacturer & factory coordination','Packaging & brand','Websites & ecommerce','Technology & payments','Operations & customer journey','Team & launch supervision']},{slug:'project-management',name:'Project Management',front:'Too many moving pieces?',back:'We bring them together.',desc:'One clear direction for the people, decisions, and details your project depends on. You have the project. We keep it moving.',items:['Teams & suppliers','Manufacturers & contractors','Developers & designers','Vendors','Timelines & deliverables','Communication','Implementation & supervision','Launch preparation']},{slug:'digital-transformation',name:'Digital Transformation',front:'Have your systems grown with you?',back:'Let’s make work flow better.',desc:'Better-connected systems. Less repetitive work. Technology and automation chosen for what your business actually needs.',items:['Systems opportunity assessment','Internal tools & automation','Workflow automation','Customer service systems','CRM & lead management','Operations systems','Internal knowledge bases','Dashboards & integrations','Digital customer journeys','Implementation & training']},{slug:'resources',name:'Resources & Workshops',front:'Sometimes you don’t need an agency.',back:'You need the right knowledge.',desc:'Practical guides, thoughtful tools, and workshops to help you take the next step with more clarity.',items:[]}];
function CTA({children='Start a Project',href='/contact',light=false,dark=false}:{children?:React.ReactNode,href?:string,light?:boolean,dark?:boolean}){return <Link className={'button '+(dark?'dark':light?'light':'')} href={href}>{children}<ArrowUpRight size={18}/></Link>}
export function Header(){return <header className="header"><Link href="/" aria-label="Taqwa Agency home" className="logo"><img src="/taqwa-logo.svg" alt="Taqwa Agency Logo" style={{ height: '42px', width: 'auto' }} /></Link><nav aria-label="Main navigation" className="desktop-nav">{nav.map(([n,h])=><Link key={h} href={h}>{n}</Link>)}</nav><div className="nav-end"><Link className="nav-cta" href="/contact">Let’s talk <ArrowUpRight size={16}/></Link><Sheet><SheetTrigger className="mobile-toggle" aria-label="Open navigation"><Menu/></SheetTrigger><SheetContent className="mobile-menu"><SheetTitle className="menu-label">BUILD WITH TAQWA</SheetTitle><SheetDescription className="sr-only">Explore Taqwa Agency</SheetDescription>{[['Home','/'],...nav,['Contact','/contact']].map(([n,h],i)=><SheetClose asChild key={h}><Link href={h}><small>0{i+1}</small>{n}</Link></SheetClose>)}<p>United States · Egypt<br/>Serving clients worldwide</p></SheetContent></Sheet></div></header>}
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json() as { error?: string; ok?: boolean };
      if (!res.ok) throw new Error(data.error || 'Subscription failed.');
      setStatus('success');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Please try again.');
      setStatus('idle');
    }
  }

  return (
    <div className="footer-newsletter">
      <div className="newsletter-copy">
        <div className="eyebrow">NEWSLETTER</div>
        <h3>Stay close to the<br />work of building.</h3>
        <p>Receive practical insights on business development, systems, technology, and building meaningful businesses with purpose.</p>
        <p style={{ marginTop: '10px', fontSize: '15px', color: '#787b82' }}>Practical ideas, sent thoughtfully.</p>
      </div>
      <div className="newsletter-form-wrap">
        {status === 'success' ? (
          <div className="newsletter-success" role="status">
            <Check size={26} />
            <div>
              <strong>You’re on the list.</strong>
              <p>Thank you for subscribing. We will send our next insight directly to your inbox.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
            <div className="newsletter-input-row">
              <div className="field newsletter-field">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address for Taqwa Agency insights"
                />
              </div>
              <input
                className="honeypot"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <button
                type="submit"
                className="button newsletter-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
                <ArrowUpRight size={18} />
              </button>
            </div>
            {error && <p role="alert" className="error newsletter-error">{error}</p>}
            <p className="newsletter-note">Strictly zero spam · Unsubscribe anytime</p>
          </form>
        )}
      </div>
    </div>
  );
}

export function Footer(){return <footer><NewsletterForm/><div className="footer-top"><Link href="/" className="logo"><img src="/taqwa-logo.svg" alt="Taqwa Agency Logo" style={{ height: '42px', width: 'auto' }} /></Link><p>Good work. Clear intentions.<br/>Build with Taqwa.</p><div>{nav.map(([n,h])=><Link href={h} key={h}>{n}</Link>)}<Link href="/contact">Contact</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Taqwa Agency</span><span>United States · Egypt · Worldwide</span><Link href="/privacy">Privacy</Link></div></footer>}
export function Shell({children}:{children:React.ReactNode}){
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://payhip.com/payhip.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch (e) {}
    };
  }, []);
  return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></>
}
function Label({children}:{children:React.ReactNode}){return <div className="eyebrow">{children}</div>}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FinalCTA(){return <section className="final-cta"><FadeIn className="final-cta-layout"><div className="final-cta-copy"><Label>THE NEXT CHAPTER STARTS HERE</Label><h2>Are you still carrying<br/>the idea around?</h2><div><p>Tell us what you are thinking about building. You do not need to have every detail figured out before starting the conversation.</p><p style={{marginTop:'12px'}}>Helping you find clarity is part of the work.</p><CTA dark>Start the Conversation</CTA></div></div><div className="final-cta-aside" aria-hidden="true"><span className="cta-star-icon">✳</span></div></FadeIn></section>}
function ServiceCards(){const[open,setOpen]=useState<number|null>(null);return <div className="service-grid">{services.map((s,i)=><FadeIn delay={i*0.1} key={s.slug} className={'service-card tone-'+i+(open===i?' expanded':'')}><article style={{height:'100%',display:'flex',flexDirection:'column'}}><button aria-expanded={open===i} onClick={()=>setOpen(open===i?null:i)}><span className="card-meta">0{i+1}<span>{s.name}</span></span><h3>{open===i?s.back:s.front}</h3><span className="card-reveal">{open===i?'A little more clarity':'Explore the possibilities'}{open===i?<Minus/>:<Plus/>}</span></button>{open===i&&<div className="card-detail"><p>{s.desc}</p><Link href={i===3?'/resources':'/what-we-do/'+s.slug}>Explore {i===3?'resources':'this service'} <ArrowUpRight size={18}/></Link></div>}</article></FadeIn>)}</div>}
function Approach(){const[active,setActive]=useState(0);const words=['VISION','ARCHITECTURE','BUILD'];const text=['Before we begin building, we seek to understand what you are creating, why it matters, who it is for, and what success should look like. We examine the idea, the opportunity, the audience, the goals, and the wider context surrounding the business. This gives the project a clear direction before time and resources are committed to execution.','Once the vision is clear, we design the structure required to support it. Depending on the project, this may include the business model, offer, positioning, customer journey, brand, technology, operational systems, project team, partnerships, and implementation roadmap. This is where the idea becomes a coordinated plan.','We bring the plan into reality. We coordinate the right specialists, guide implementation, manage the moving parts, and keep the work connected to the original vision. From development and systems to launch and refinement, we help carry the project through the work required to make it real.'];return <section className="approach" id="approach"><FadeIn className="section-intro"><Label>THE TAQWA APPROACH</Label><p>Our approach is designed to move a meaningful idea from possibility into something clear, structured, and real.</p></FadeIn><FadeIn delay={0.2} className="approach-layout"><div>{words.map((w,i)=><button className={'approach-word '+(active===i?'active':'')} key={w} aria-expanded={active===i} onClick={()=>setActive(i)}><small>0{i+1}</small><span>{w}.</span><ArrowUpRight/></button>)}</div><div className="approach-note"><div className={'system-diagram phase-'+active} aria-hidden="true"><span>Purpose</span><span>People</span><b>{words[active]}</b><span>Systems</span><span>Execution</span></div><p key={active}>{text[active]}</p><span className="mono">0{active+1} / 03</span></div></FadeIn><FadeIn delay={0.3} className="approach-shariah"><div className="shariah-lead"><div className="shariah-badge"><ShieldCheck size={16}/><span>SHARIAH-CONSCIOUS DEVELOPMENT</span></div><h3>Building with purpose means considering more than profit.</h3></div><div className="shariah-body"><p>For projects involving additional religious considerations, we can coordinate consultation with trusted scholars to review ideas, business models, revenue structures, partnerships, and implementation plans.</p><p style={{marginTop:'10px'}}>This process gives founders the opportunity to seek clarity before committing significant time, money, and resources to the build.</p></div></FadeIn></section>}
export function BuildWithBetterInformation({isPage=false}:{isPage?:boolean}) {
  return (
    <section className={isPage ? "resources-page" : "resources-preview"} id="resources">
      <FadeIn className="section-intro">
        <Label>07 / BUILD WITH TAQWA</Label>
        <h2>Build with<br />better information.</h2>
        <p>A clearer next step can change everything. Explore our founder field guides, upcoming digital playbooks, and free community resources.</p>
      </FadeIn>

      <FadeIn delay={0.2} className="resource-portrait-grid">
        {/* Card 1: Blog & Field Guides */}
        <Link href="/resources" className="resource-portrait-card tone-0">
          <div className="card-top-row">
            <span className="card-cat-label">01 / FIELD GUIDES</span>
            <span className="card-tag-pill">3 ARTICLES</span>
          </div>
          <div className="card-center-block">
            <h3 className="card-display-title">Practical<br />Thinking.</h3>
            <p className="card-desc-text">Field notes on asking better questions, managing project dependencies, and operational decisions.</p>
          </div>
          <div className="card-bottom-row">
            <span className="card-action-text">Read the field guides</span>
            <span className="card-arrow-circle"><ArrowUpRight size={18}/></span>
          </div>
        </Link>

        {/* Card 2: Digital Products */}
        <Link href="/resources/digital-products" className="resource-portrait-card tone-1">
          <div className="card-top-row">
            <span className="card-cat-label">02 / DIGITAL PRODUCTS</span>
            <span className="card-tag-pill card-lock-pill"><Lock size={12}/> COMING SOON</span>
          </div>
          <div className="card-center-block">
            <h3 className="card-display-title">The Playbook<br />& Toolkits.</h3>
            <p className="card-desc-text">Actionable Notion templates, milestone trackers, and shariah-conscious business playbooks.</p>
          </div>
          <div className="card-bottom-row">
            <span className="card-action-text">Preview digital tools</span>
            <span className="card-arrow-circle"><ArrowUpRight size={18}/></span>
          </div>
        </Link>

        {/* Card 3: Free Resources */}
        <Link href="/resources/community" className="resource-portrait-card tone-2">
          <div className="card-top-row">
            <span className="card-cat-label">03 / FREE RESOURCES</span>
            <span className="card-tag-pill">CHANNELS & DISPATCH</span>
          </div>
          <div className="card-center-block">
            <h3 className="card-display-title">Channels<br />& Signals.</h3>
            <p className="card-desc-text">Instagram breakdowns, Telegram reflections, and our newsletter delivered to your inbox.</p>
          </div>
          <div className="card-bottom-row">
            <span className="card-action-text">Explore community channels</span>
            <span className="card-arrow-circle"><ArrowUpRight size={18}/></span>
          </div>
        </Link>
      </FadeIn>
    </section>
  );
}

export default function Home(){return <Shell><section className="hero"><motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.1}} className="hero-copy"><Label>BUSINESS BUILDERS. WITH PURPOSE.</Label><h1>You have the idea.<br/><span>Let’s build<br/>the business.</span></h1><p>Taqwa Agency helps Muslim founders turn ideas into operating businesses, bring complex projects together, and grow through digital transformation.</p><div className="hero-actions"><CTA/><Link className="text-link" href="/what-we-do">See What We Do <ArrowRight size={17}/></Link></div></motion.div><motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.8,delay:0.2}} className="hero-art"><img src="/architecture.webp" alt="Cobalt and porcelain architectural forms assembled into a bold, balanced structure" fetchPriority="high"/><div className="art-caption"><span>FROM POSSIBILITY<br/>TO SOMETHING REAL.</span><span>TAQWA<br/>FIG. 001</span></div></motion.div><div className="hero-base"><a href="#beginning">SCROLL TO EXPLORE <ArrowDown size={14}/></a></div></section><section id="beginning" className="recognition"><FadeIn className="recognition-copy"><Label>01 / FROM IDEA TO REALITY</Label><div><h2>An idea is only<br/>the beginning.</h2><div className="questions"><span>Where do I start?</span><span>Who do I need?</span><span>Who handles the technology?</span><span>How do I find the right suppliers?</span><span>Who manages all of this?</span></div><p>You can see what it could become. The difficult part is knowing how to get there.</p><strong>That is where we come in. <ArrowDown size={20}/></strong></div></FadeIn><FadeIn delay={0.2} className="recognition-sketch"><div className="architectural-blueprint"><div className="blueprint-header"><span className="blueprint-tag">SYSTEM SPEC · FIG. 002</span><span className="blueprint-coords">TAQWA ARCHITECTURE</span></div><div className="blueprint-canvas"><div className="blueprint-stage"><div className="stage-num">PHASE 01 — THE INITIAL SPARK</div><div className="stage-title">Raw Idea & Founder Ambition</div><div className="stage-items"><span>Unstructured Notes</span><span>Open Questions</span><span>Core Vision</span></div></div><div className="blueprint-arrow"><div className="arrow-line"></div><span className="arrow-badge">TAQWA ARCHITECTURE</span></div><div className="blueprint-stage"><div className="stage-num">PHASE 02 — THE COORDINATED ENGINE</div><div className="stage-title">Operating Business Structure</div><div className="stage-grid"><div className="bp-card"><small>OPS</small><strong>Suppliers & Production</strong></div><div className="bp-card"><small>TECH</small><strong>Digital Systems & Payments</strong></div><div className="bp-card"><small>COMM</small><strong>Customer Journeys</strong></div></div></div></div></div></FadeIn></section><section className="services-section"><FadeIn className="section-intro"><Label>02 / WHAT WE DO</Label><h2>Wherever you are,<br/>let’s move forward.</h2><Link className="text-link" href="/what-we-do">Our capabilities <ArrowUpRight size={18}/></Link></FadeIn><ServiceCards/></section><Approach/><section className="build-section"><FadeIn><Label>04 / BEYOND THE PLAN</Label><h2>We help<br/>build <em>the thing.</em></h2><div className="build-bottom"><span className="large-asterisk" aria-hidden="true">✳</span><div><p>Some days, that means finding a manufacturer. Others, coordinating developers, mapping a customer journey, or getting the operation ready for launch.</p><p>Every project requires something different.<br/><strong>Our job is to understand what yours requires.</strong></p><CTA href="/what-we-do">See How We Can Help</CTA></div></div></FadeIn></section><section className="story-preview"><FadeIn className="intention-panel"><span>AMBITION<br/>WITH<br/><i>intention.</i></span><small>BUILD WITH TAQWA</small></FadeIn><FadeIn delay={0.2}><div><Label>05 / OUR FOUNDATION</Label><h2>Built with intention.</h2><p>Ambition has a place. So do principles. We believe you should be able to build a meaningful business without leaving your values at the door.</p><p>Our work is grounded in consciousness of Allah, honest communication, and the responsibility to do things well.</p><div className="values-inline">Taqwa · Integrity · Excellence · Substance</div><Link className="text-link" href="/our-story">Get to know Taqwa <ArrowUpRight size={18}/></Link></div></FadeIn></section><section className="portfolio-preview"><FadeIn className="section-intro"><Label>06 / THE WORK</Label><h2>Built, not just branded.</h2></FadeIn><div className="work-feature"><FadeIn className="work-typography"><span>THE WHOLE<br/>BUSINESS.</span><small>VISION → ARCHITECTURE → BUILD</small></FadeIn><FadeIn delay={0.2}><div><Label>BEHIND THE BUILD</Label><h3>The work behind<br/>what you see.</h3><p>The brand is one part. The suppliers, technology, customer journey, and operating systems tell the rest of the story.</p><p className="muted">Detailed project stories are being prepared.</p><Link href="/portfolio" className="text-link">Explore our work <ArrowUpRight size={18}/></Link></div></FadeIn></div></section><BuildWithBetterInformation/><FinalCTA/></Shell>}
interface ArticleItem {
  slug: string;
  type: string;
  category: string;
  title: string;
  intro: string;
  coverImage?: string;
  body: [string, string][] | string[][];
}

const articles: ArticleItem[] = [{slug:'before-you-build',type:'Guide',category:'Business Launch',title:'Before you build, ask better questions.',intro:'A practical starting point for turning an idea into a project.',body:[['Start with a person, not a product.','Who is this for? Write down one specific customer, the problem they face, and how they solve it today. Talk to potential customers before committing to a solution. Look for repeated needs, not just encouraging feedback.'],['Define the first useful version.','What is the smallest version of the business that delivers real value? Separate what must exist at launch from what can wait. A clear first offer is easier to test, cost, and coordinate.'],['Make the unknowns visible.','List the assumptions behind your idea: demand, supplier reliability, costs, delivery, payments, and your own available time. Decide which uncertainty would be most expensive to discover late. Investigate that one first.'],['Connect the work.','Map the people and decisions your launch depends on. Packaging needs product specifications. A website needs an offer and payment process. An operating business needs more than a launch date.'],['Your next step','Write a one-page brief: the customer, the problem, the offer, your constraints, and the three questions you need answered next. Use it to start a focused conversation.']]},{slug:'less-chasing-more-progress',type:'Field notes',category:'Project Management',title:'Less chasing. More progress.',intro:'Five decisions that make a complicated project easier to move.',body:[['Give the project one source of truth.','Keep the scope, owners, dates, and latest decisions in a shared place. People should not have to search multiple message threads to understand what happens next.'],['Name an owner for every outcome.','A task assigned to everyone is easy for everyone to miss. Give each deliverable one accountable owner, even when several people contribute.'],['Track dependencies, not just deadlines.','Ask what must happen before each task can begin. Surface the approvals, assets, specifications, and access a team needs. Waiting is work you can often prevent.'],['Create a decision rhythm.','Agree when decisions are reviewed, who can approve them, and how scope changes are recorded. Short, consistent check-ins usually beat long, reactive meetings.'],['Finish with acceptance criteria.','Define what complete means before the work starts. A shared standard makes review more useful and avoids endless revisions.']]},{slug:'before-you-automate',type:'Guide',category:'Automation',title:'Before you automate anything.',intro:'A business-first way to decide where technology belongs.',body:[['Understand the existing work.','Follow a real request from beginning to end. Note where information enters, who touches it, and where delays or errors appear. Describe the operation before selecting a tool.'],['Improve the process first.','Remove unnecessary steps and clarify ownership. Automating a confusing process can make confusion travel faster. Start with one stable, repeated workflow.'],['Choose a useful outcome.','Decide what better means: fewer manual entries, faster responses, clearer records, or less time spent checking status. Measure the current process so you can compare later.'],['Keep people in the right places.','Automated workflows need appropriate review. Identify sensitive information, access permissions, exceptions, and decisions that require human judgment. Plan a fallback before you launch.'],['Pilot, learn, then expand.','Test with a limited scope and realistic examples. Train the people who will use the system, document its limits, and only expand when the results justify it.']]}];
function ResourceList({compact=false}:{compact?:boolean}){
  const[filter,setFilter]=useState('All');
  const[items,setItems]=useState<ArticleItem[]>(articles);

  useEffect(()=>{
    fetch('/api/posts')
      .then(res=>res.json())
      .then(data=>{
        if(data.ok && Array.isArray(data.posts) && data.posts.length > 0){
          setItems(data.posts);
        }
      })
      .catch(()=>{});
  },[]);

  const categories = ['All', ...Array.from(new Set(items.map(x=>x.category || 'General')))];

  const taglines = ['What if?', 'Make it\nhappen.', 'Work\nbetter.', 'Build\nwith Taqwa.', 'Intention &\naction.', 'Systems &\nstructure.'];

  return <>{!compact&&<div className="filters" aria-label="Filter resources">{categories.map(x=><button key={x} aria-pressed={filter===x} className={filter===x?'selected':''} onClick={()=>setFilter(x)}>{x}</button>)}</div>}<div className="resource-list">{items.filter(a=>filter==='All'||a.category===filter).map((a,i)=><Link href={'/resources/'+a.slug} key={a.slug} className="resource-item">{a.coverImage && a.coverImage.trim() !== '' ? <div className="resource-cover" style={{padding:0,overflow:'hidden',borderRadius:'6px'}}><img src={a.coverImage} alt={a.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div> : <div className={'resource-cover cover-'+(i%3)}><small>BUILD WITH TAQWA<br/>{(a.type||'GUIDE').toUpperCase()} / {String(i+1).padStart(2,'0')}</small><b>{taglines[i % taglines.length]}</b><span>TAQWA AGENCY ↗</span></div>}<div><Label>{a.type || 'Guide'} · {a.category || 'General'}</Label><h3>{a.title}</h3><span className="text-link">Read the {(a.type||'guide').toLowerCase()} <ArrowUpRight size={16}/></span></div></Link>)}</div></>
}
export function Story(){return <Shell><section className="page-hero"><FadeIn><Label>OUR STORY</Label><h1>A meaningful vision<br/>deserves to be<br/><em>built with taqwa.</em></h1><p>An idea may begin with one person, but bringing it to life takes clarity, structure, the right people, and the discipline to build it well.</p><p style={{marginTop:'14px'}}>Taqwa Agency helps Muslim founders and businesses carry meaningful ideas from vision to reality, shaping them into ventures, products, and platforms that are built to operate and grow.</p><div className="story-jumps"><a href="#why-taqwa">Why Taqwa Exists ↗</a><a href="#founder">Meet the Founder ↗</a><a href="#values">Our Values ↗</a><a href="#approach">Our Approach ↗</a></div></FadeIn></section><section id="why-taqwa" className="editorial"><FadeIn><Label>WHY TAQWA EXISTS</Label><div><h2>Between the vision<br/>and the reality is the<br/><em>work of building.</em></h2><p>Most ideas do not remain ideas because they lack potential. They remain ideas because the path forward is unclear.</p><p>There are questions to answer, decisions to make, people to coordinate, systems to design, and countless moving parts that must come together before a vision can become something real.</p><p><strong>Taqwa Agency was created to stand in that gap.</strong></p><p>We work with Muslim founders and businesses to translate vision into direction, direction into structure, and structure into execution. We bring the right people, thinking, systems, and technology together so that meaningful ideas can become tangible businesses, products, and platforms.</p><p>We do not simply advise from the sidelines. We help carry the work forward.</p></div></FadeIn></section><section id="founder" className="founder"><FadeIn className="founder-note"><Label>THE QUESTIONS THAT SHAPE THE WORK</Label>{['What are we building?','Who is it for?','Where are the gaps?','Who needs to be involved?','What should happen first?'].map((q,i)=><p key={q}><small>0{i+1}</small>{q}</p>)}<span>Rasheedah Amatullah</span></FadeIn><FadeIn delay={0.2}><div><Label>MEET THE FOUNDER</Label><h2>Founder.<br/>Strategist.<br/><em>Builder.</em></h2><h3>Rasheedah Amatullah</h3><p>Rasheedah approaches every business as a connected system. The vision, offer, people, brand, technology, customer experience, and operations must work together for the business to work well.</p><p>With nearly a decade of experience supporting more than 60 brands, she has worked across business development, brand strategy, digital platforms, operations, and project execution. She has also served as a Google accelerator mentor, helping businesses find clarity, solve complex problems, and move forward with stronger foundations.</p><p>Her strength lies in seeing both the whole picture and the details that hold it together. She asks the questions others may overlook, identifies what is missing, and brings the right people and resources together to move an idea from possibility into reality.</p><p>She founded Taqwa Agency from the conviction that Muslim founders should not have to choose between serious commercial ambition and faithfulness to their values. Meaningful businesses can be innovative, competitive, and beautifully built while remaining grounded in integrity, responsibility, and consciousness of Allah.</p></div></FadeIn></section><section id="values" className="values-section"><FadeIn><Label>THE PRINCIPLES BEHIND THE DECISIONS</Label><h2>How we build matters.</h2></FadeIn>{[['Taqwa','Consciousness of Allah shapes the choices we make, the work we accept, and the responsibility with which we carry what has been entrusted to us.'],['Integrity','We communicate honestly, set clear expectations, and remain transparent about what a project needs, what is possible, and what must be addressed.'],['Excellence','We pursue ihsan in the details, the decisions, and the execution. We believe meaningful work deserves care, precision, and the commitment to do it well.'],['Substance','We build beyond appearances. Every strategy, system, platform, and experience should serve a real purpose and support the long-term strength of the business.']].map(([h,p],i)=><FadeIn delay={i*0.1} className="value-row" key={h}><small>0{i+1}</small><h3>{h}</h3><p>{p}</p></FadeIn>)}<FadeIn><p style={{marginTop:'35px',fontSize:'16.5px',color:'#585b62',maxWidth:'780px',lineHeight:'1.65'}}>These principles guide how we choose projects, manage resources, solve problems, communicate with clients, and take responsibility for the work entrusted to us.</p></FadeIn></section><Approach/><FinalCTA/></Shell>}
export function Services(){return <Shell><section className="page-hero"><FadeIn><Label>WHAT WE DO</Label><h1>Different businesses.<br/><em>Different needs.</em></h1><p>That is why we do not begin with a package. We begin by understanding what you are trying to build.</p></FadeIn></section><section className="services-section"><ServiceCards/></section><Approach/><FinalCTA/></Shell>}
export function ServicePage({slug}:{slug:string}){const s=services.find(s=>s.slug===slug)!;const i=services.indexOf(s);return <Shell><section className="page-hero"><FadeIn><Label>WHAT WE DO / 0{i+1} / {s.name.toUpperCase()}</Label><h1>{i===0?<>From idea to<br/><em>operating business.</em></>:i===1?<>You have the project.<br/><em>We keep it moving.</em></>:<>Growing business.<br/><em>Better systems.</em></>}</h1><p>{i===0?'You have the concept. Maybe the capital. Maybe notes everywhere and far too many tabs open. What you need now is structure.':i===1?'Designers waiting. Developers needing decisions. Suppliers missing specifications. Somehow, you have become the default project manager.':'Your business should become easier to run as it grows. Not harder.'}</p><CTA/></FadeIn></section><section className="editorial"><FadeIn><Label>{i===2?'BUSINESS FIRST. TECHNOLOGY SECOND.':'THE RIGHT SUPPORT, IN THE RIGHT PLACES.'}</Label><div><h2>{s.back}</h2><p>{s.desc}</p><p>{i===0?'No two launches are identical. We work out what your business needs, build a coherent plan, and coordinate the people and moving parts required to bring it to life.':i===1?'We become the coordination layer between the plan and the people delivering it. Clear ownership, timely decisions, connected communication, and consistent follow-through keep the work moving.':'Manual work, scattered customer information, slow handoffs, and repeated tasks are operational problems first. We assess the operation before recommending tools and automation.'}</p></div></FadeIn></section><section className="capabilities"><FadeIn><Label>WHAT YOUR PROJECT MIGHT NEED</Label><h2>{i===2?'A more connected operation.':'The parts that make it work.'}</h2><div>{s.items.map((x,n)=><p key={x}><small>{String(n+1).padStart(2,'0')}</small>{x}<Plus size={16}/></p>)}</div><p className="muted">The scope follows your project. These are possible components, not a fixed package.</p></FadeIn></section><section className="engagement"><FadeIn><Label>HOW WE BEGIN</Label><h2>First, a conversation.</h2><div>{[['Understand','We begin with an initial consultation to understand your goals, starting point, and constraints.'],['Shape','We evaluate what the project requires and prepare a tailored proposal with scope, responsibilities, and stages.'],['Build','Once the scope is agreed, we coordinate the work and move into execution.']].map(([h,p],i)=><article key={h}><span>0{i+1}</span><h3>{h}</h3><p>{p}</p></article>)}</div>{i===2&&<blockquote>The goal is to make your business work better.</blockquote>}</FadeIn></section><FinalCTA/></Shell>}
export function Portfolio(){return <Shell><section className="page-hero"><FadeIn><Label>PORTFOLIO / BEHIND THE BUILD</Label><h1>Built, not<br/><em>just branded.</em></h1></FadeIn></section><PortfolioShowcase/><section className="editorial" style={{background:'#f8f9f4',borderTop:'1px solid var(--border)',padding:'80px 4.5%'}}><FadeIn><Label>THE WORK BEHIND THE WORK</Label><div><h2>Different projects<br/>require different<br/><em>kinds of building.</em></h2></div></FadeIn></section><FinalCTA/></Shell>}
export function Resources(){
  return (
    <Shell>
      <section className="page-hero">
        <FadeIn>
          <Label>RESOURCES / BUILD WITH TAQWA</Label>
          <h1>Build with<br/><em>better information.</em></h1>
          <p>Practical thinking for the decisions that turn an idea into a business. Field guides, upcoming digital toolkits, and community channels.</p>
        </FadeIn>
      </section>
      
      <section className="resources-preview">
        <FadeIn className="section-intro">
          <Label>01 / FOUNDER FIELD GUIDES</Label>
          <h2>Practical essays<br/>& field notes.</h2>
          <p>Articles written from the trenches of launching businesses and coordinating teams.</p>
        </FadeIn>
        <ResourceList />
      </section>

      <section className="subpage-container" style={{background:'#f6f7f2',borderTop:'1px solid var(--border)'}}>
        <FadeIn className="section-intro">
          <Label>EXPLORE MORE</Label>
          <h2>Tools & Community</h2>
          <p>Looking for structured templates or direct founder signals?</p>
        </FadeIn>
        <div className="subpage-grid-2">
          <Link href="/resources/digital-products" className="channel-card">
            <div>
              <Label>DIGITAL PRODUCTS</Label>
              <h3 style={{fontSize:'24px',margin:'10px 0'}}>The Playbook & Toolkits</h3>
              <p style={{color:'#606269',fontSize:'15px'}}>Workbooks, Notion roadmaps, and shariah-conscious execution guides. Coming soon insha'Allah.</p>
            </div>
            <span className="text-link" style={{marginTop:'20px'}}>Explore digital products <ArrowUpRight size={16}/></span>
          </Link>
          <Link href="/resources/community" className="channel-card">
            <div>
              <Label>COMMUNITY</Label>
              <h3 style={{fontSize:'24px',margin:'10px 0'}}>Channels & Dispatch</h3>
              <p style={{color:'#606269',fontSize:'15px'}}>Instagram visual breakdowns, Telegram audio notes, and the weekly Taqwa Dispatch newsletter.</p>
            </div>
            <span className="text-link" style={{marginTop:'20px'}}>Join the community <ArrowUpRight size={16}/></span>
          </Link>
        </div>
      </section>

      <FinalCTA/>
    </Shell>
  );
}
export function Article({slug}:{slug:string}){const a=articles.find(a=>a.slug===slug)!;return <Shell><article className="article"><FadeIn><Link className="text-link" href="/resources">← All resources</Link><Label>{a.type} / {a.category}</Label><h1>{a.title}</h1><p className="article-intro">{a.intro}</p></FadeIn>{a.body.map(([h,p],i)=><FadeIn delay={0.1} key={h}><section><span className="mono">0{i+1}</span><h2>{h}</h2><p>{p}</p></section></FadeIn>)}<FadeIn><CTA>Talk Through Your Next Step</CTA></FadeIn></article><FinalCTA/></Shell>}
function Choice({label,value,onChange,options}:{label:string,value:string,onChange:(v:string)=>void,options:string[]}){return <label className="field">{label}<Select value={value} onValueChange={onChange}><SelectTrigger aria-label={label} className="form-select"><SelectValue placeholder="Select an option"/></SelectTrigger><SelectContent>{options.map(x=><SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></label>}
export function Contact(){
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const[step,setStep]=useState(1);
  const[status,setStatus]=useState('');
  const[error,setError]=useState('');
  const[form,setForm]=useState({name:'',email:'',location:'',service:'',stage:'',description:'',budget:'',target:'',website:''});
  const set=(k:string,v:string)=>setForm(f=>({...f,[k]:v}));
  
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setError('');
    if(step===1){setStep(2);return}
    if(!form.service||!form.stage||!form.budget){setError('Please select your project type, stage, and budget.');return}
    setStatus('sending');
    try{
      const r=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      const d=await r.json() as {error?:string};
      if(!r.ok)throw Error(d.error);
      setStatus('success')
    }catch(e){
      setError(e instanceof Error?e.message:'Please try again.');
      setStatus('')
    }
  }

  return (
    <Shell>
      <section className="contact-layout">
        <FadeIn>
          <div>
            <Label>THE FIRST STEP IN THE TAQWA APPROACH</Label>
            <h1>Let’s build<br />your <em>idea.</em></h1>
            <p className="contact-hero-intro">Good businesses rarely begin with everything figured out. For us to hear your idea and craft a structured initial roadmap draft, book an initial consultation.</p>
            
            <div className="contact-method" style={{ marginBottom: '28px' }}>
              <span>01 / INITIAL CONSULTATION</span>
              <p>A focused 30-minute session to discuss your concept, map requirements, and determine mutual fit.</p>
            </div>

            {!showInquiryForm ? (
              <button 
                className="consultation-toggle-link"
                onClick={() => setShowInquiryForm(true)}
              >
                Or, submit a general project inquiry form instead <ArrowRight size={15} />
              </button>
            ) : (
              <button 
                className="consultation-toggle-link"
                onClick={() => setShowInquiryForm(false)}
              >
                ← Book the initial consultation instead
              </button>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          {!showInquiryForm ? (
            <div className="consultation-booking-card">
              <div className="shariah-badge" style={{ margin: 0 }}>
                <ShieldCheck size={14} />
                <span>SECURE CHECKOUT</span>
              </div>
              <h3>Initial Consultation & Structure Session</h3>
              <div className="consultation-price">
                $49.00 <span>/ one-time session fee</span>
              </div>
              <ul className="consultation-benefits">
                <li>
                  <Check size={16} />
                  <span><strong>Hear & Structure Your Idea:</strong> A focused 30-minute deep dive to understand your vision, requirements, and operational architecture.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>Determine Mutual Fit:</strong> Evaluate if there is clear alignment and synergy for us to build and execute together.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>100% Put Towards Your Project:</strong> If there is a good fit and we move forward with your build, this entire $49 consultation amount will be credited directly towards your project scope.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>Non-Refundable Fee:</strong> The consultation fee reserves dedicated founder time and is non-refundable.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>Instant Scheduling:</strong> After payment, you will be redirected to Calendly immediately to choose your time.</span>
                </li>
              </ul>
              
              <a 
                className="payhip-buy-button button" 
                href={PAYHIP_CONSULTATION_URL}
                data-theme="none"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                Book Consultation ($49) <ArrowUpRight size={18} />
              </a>
              
              <p className="booking-card-footer">
                Payments are processed securely via Payhip. Redirect to Calendly immediately after successful purchase.
              </p>
            </div>
          ) : (
            <div className="discovery">
              {status==='success'? (
                <div className="success-feedback-box" role="status">
                  <div className="success-icon-badge">
                    <Check size={28}/>
                  </div>
                  <div className="success-feedback-content">
                    <Label>INQUIRY RECEIVED</Label>
                    <h2>Your project inquiry has been successfully sent.</h2>
                    <p>
                      Thank you, <strong>{form.name}</strong>. We have received your project details and saved them securely.
                    </p>
                    <div className="success-details-summary">
                      <div><small>SERVICE</small><span>{form.service || "General Inquiry"}</span></div>
                      <div><small>STAGE</small><span>{form.stage || "In Development"}</span></div>
                      <div><small>LOCATION</small><span>{form.location}</span></div>
                    </div>
                    <p className="success-next-step">
                      Our team will review your inquiry and reach out to you directly at <strong>{form.email}</strong>.
                    </p>
                    <div className="success-actions">
                      <button 
                        className="button" 
                        type="button"
                        onClick={() => { setStatus(''); setStep(1); setForm({name:'',email:'',location:'',service:'',stage:'',description:'',budget:'',target:'',website:''}); }}
                      >
                        Submit Another Inquiry
                      </button>
                      <Link className="text-link" href="/resources">
                        Explore founder guides <ArrowRight size={16}/>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="form-progress">
                    <span>0{step} / 02</span>
                    <span>{step===1?'First, a little about you.':'Now, the bigger picture.'}</span>
                  </div>
                  {step===1? (
                    <>
                      <h2>Let’s get acquainted.</h2>
                      <label className="field">Your name<input autoComplete="name" required minLength={2} maxLength={150} value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Name"/></label>
                      <label className="field">Email address<input autoComplete="email" type="email" required value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@yourbusiness.com"/></label>
                      <label className="field">Country / City<input required minLength={2} maxLength={150} value={form.location} onChange={e=>set('location',e.target.value)} placeholder="Where are you based?"/></label>
                      <button className="button" type="submit" style={{ width: '100%' }}>Tell Us About the Project <ArrowRight size={18}/></button>
                    </>
                  ) : (
                    <>
                      <h2>Every business starts somewhere.</h2>
                      <Choice label="What do you need help with?" value={form.service} onChange={v=>set('service',v)} options={['Business Launch','Project Management','Digital Transformation','Something Else']}/>
                      <Choice label="What stage are you at?" value={form.stage} onChange={v=>set('stage',v)} options={['I only have the idea','I have started planning','I have started building','The business already operates','I am not sure']}/>
                      <label className="field">What are you trying to build, change, or launch?<textarea required minLength={20} maxLength={6000} rows={5} value={form.description} onChange={e=>set('description',e.target.value)} placeholder="The idea, the challenge, or the part you need help figuring out…"/></label>
                      <Choice label="Approximate project budget (USD)" value={form.budget} onChange={v=>set('budget',v)} options={['Under $2,500','$2,500–$5,000','$5,000–$10,000','$10,000–$25,000','$25,000+','I would like guidance']}/>
                      <label className="field">Target launch or completion date (optional)<input maxLength={100} value={form.target} onChange={e=>set('target',e.target.value)} placeholder="A date, a timeframe, or still exploring"/></label>
                      <input className="honeypot" tabIndex={-1} aria-hidden="true" autoComplete="off" value={form.website} onChange={e=>set('website',e.target.value)}/>
                      <p className="privacy-note">Your details are stored to review your inquiry. <Link href="/privacy">Read our privacy notice.</Link></p>
                      <div className="form-actions">
                        <button type="button" className="back" onClick={()=>setStep(1)}>← Back</button>
                        <button className="button" disabled={status==='sending'}>{status==='sending'?'Saving your inquiry…':'Start the Conversation'}<ArrowUpRight size={18}/></button>
                      </div>
                    </>
                  )}
                  {error&&<p role="alert" className="error">{error}</p>}
                </form>
              )}
            </div>
          )}
        </FadeIn>
      </section>
    </Shell>
  );
}
export function Privacy(){return <Shell><article className="article"><FadeIn><Label>PRIVACY</Label><h1>Your project.<br/>Handled with care.</h1><p>When you use our project discovery form, we store your name, email, location, and the project details you choose to share. This information is used to review your inquiry and understand the support you need.</p></FadeIn><FadeIn delay={0.1}><h2>What to share</h2><p>Please share only what is needed to explain your project. Do not submit passwords, payment card details, or sensitive personal records.</p></FadeIn><FadeIn delay={0.2}><h2>Storage and access</h2><p>Inquiry information is stored in the website’s database and is accessible to the site owner through the hosting service. This website does not send automated marketing emails or use advertising trackers.</p></FadeIn><FadeIn delay={0.3}><h2>Questions or deletion requests</h2><p>Use the contact form, select “Something Else,” and state your privacy request. Include the email address used for the original inquiry so the relevant record can be located.</p></FadeIn></article></Shell>}

export function DigitalProductsPage(){
  return (
    <Shell>
      <section className="page-hero">
        <FadeIn>
          <Link className="subpage-back-link" href="/resources">← All resources</Link>
          <Label>02 / DIGITAL PRODUCTS</Label>
          <h1>The Playbook<br/><em>& Toolkits.</em></h1>
          <p>Actionable toolkits designed to help you organize your business and execute without confusion. Coming soon, insha'Allah.</p>
        </FadeIn>
      </section>
      
      <section className="subpage-container">
        <div className="subpage-grid-2">
          {/* Product 1 */}
          <div className="product-showcase-card">
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'18px'}}>
                <span className="card-cat-label">EBOOK & WORKBOOK</span>
                <span className="card-tag-pill card-lock-pill"><Lock size={12}/> COMING SOON</span>
              </div>
              <h2 style={{fontSize:'28px',letterSpacing:'-0.04em',marginBottom:'14px'}}>The Taqwa Business Playbook</h2>
              <p style={{fontSize:'15px',color:'#555960',lineHeight:'1.6',marginBottom:'20px'}}>From first concept to operating shariah-conscious business. 120+ pages of frameworks, supplier evaluation checklists, and customer journey roadmaps.</p>
              <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'10px',fontSize:'14px',color:'#3b3f46'}}>
                <li style={{display:'flex',alignItems:'center',gap:'8px'}}><Check size={16} style={{color:'var(--blue)'}}/> Complete 5-stage venture roadmap</li>
                <li style={{display:'flex',alignItems:'center',gap:'8px'}}><Check size={16} style={{color:'var(--blue)'}}/> Supplier & manufacturer evaluation matrix</li>
                <li style={{display:'flex',alignItems:'center',gap:'8px'}}><Check size={16} style={{color:'var(--blue)'}}/> Shariah-conscious finance & contract guidance</li>
              </ul>
            </div>
            <div style={{marginTop:'30px',paddingTop:'20px',borderTop:'1px solid var(--border)'}}>
              <span className="text-link" style={{fontSize:'13px',color:'#777'}}>Release scheduled for Q2 insha'Allah</span>
            </div>
          </div>

          {/* Product 2 */}
          <div className="product-showcase-card">
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'18px'}}>
                <span className="card-cat-label">NOTION & SHEETS SYSTEM</span>
                <span className="card-tag-pill card-lock-pill"><Lock size={12}/> COMING SOON</span>
              </div>
              <h2 style={{fontSize:'28px',letterSpacing:'-0.04em',marginBottom:'14px'}}>Project Architecture & Roadmap Kit</h2>
              <p style={{fontSize:'15px',color:'#555960',lineHeight:'1.6',marginBottom:'20px'}}>The exact workspace templates, deliverable trackers, and contractor briefing sheets we use to run builds at Taqwa Agency.</p>
              <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'10px',fontSize:'14px',color:'#3b3f46'}}>
                <li style={{display:'flex',alignItems:'center',gap:'8px'}}><Check size={16} style={{color:'var(--blue)'}}/> Turnkey Notion project workspace</li>
                <li style={{display:'flex',alignItems:'center',gap:'8px'}}><Check size={16} style={{color:'var(--blue)'}}/> Supplier milestone & payment ledger</li>
                <li style={{display:'flex',alignItems:'center',gap:'8px'}}><Check size={16} style={{color:'var(--blue)'}}/> Contractor scope & acceptance criteria sheets</li>
              </ul>
            </div>
            <div style={{marginTop:'30px',paddingTop:'20px',borderTop:'1px solid var(--border)'}}>
              <span className="text-link" style={{fontSize:'13px',color:'#777'}}>Release scheduled for Q2 insha'Allah</span>
            </div>
          </div>
        </div>
      </section>

      <section className="digital-subscribe-section" id="early-access">
        <FadeIn className="digital-subscribe-inner">
          <div className="digital-subscribe-header">
            <Label>BE FIRST IN LINE</Label>
            <h2>Want early access when we launch?</h2>
            <p className="subscribe-lead">Join the Taqwa Dispatch newsletter to receive immediate notification and exclusive early-bird discounts on upcoming playbooks and toolkits.</p>
          </div>
          <div className="digital-subscribe-form-box">
            <NewsletterForm />
          </div>
        </FadeIn>
      </section>
      
      <FinalCTA/>
    </Shell>
  );
}

function TaqwaNewsletterSection() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json() as { error?: string; ok?: boolean };
      if (!res.ok) throw new Error(data.error || 'Subscription failed.');
      setStatus('success');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Please try again.');
      setStatus('idle');
    }
  }

  return (
    <section className="taqwa-newsletter-section">
      <FadeIn>
        <div className="taqwa-newsletter-container">
          <Label>TAQWA NEWSLETTER</Label>
          <h2>Stay close to the work of building.</h2>
          <p className="newsletter-desc">
            Receive curated, beneficial content on business, systems, technology, and building with purpose, delivered straight to your inbox.
          </p>

          {status === 'success' ? (
            <div className="newsletter-success" role="status" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f2f8e1', padding: '20px 24px', borderRadius: '8px', color: '#3a5400' }}>
              <Check size={22} />
              <div>
                <strong style={{ fontSize: '16px', display: 'block' }}>You are subscribed to Taqwa Newsletter.</strong>
                <span style={{ fontSize: '14px', color: '#556611' }}>Thank you for connecting with us.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
              <div className="newsletter-form-group">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className="newsletter-email-input"
                  aria-label="Email address for Taqwa Newsletter"
                />
                <input
                  className="honeypot"
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <button
                  type="submit"
                  className="button newsletter-submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'SUBSCRIBING…' : 'SUBSCRIBE'}
                  <ArrowUpRight size={16} />
                </button>
              </div>
              {error && <p role="alert" className="error" style={{ marginTop: '8px', fontSize: '13px', color: '#c92a2a' }}>{error}</p>}
              <p className="newsletter-subtext">Thoughtful emails only. Unsubscribe at any time.</p>
            </form>
          )}
        </div>
      </FadeIn>
    </section>
  );
}

export function CommunityPage(){
  return (
    <Shell>
      <section className="page-hero">
        <FadeIn>
          <Link className="subpage-back-link" href="/resources">← ALL RESOURCES</Link>
          <Label>03 / FREE RESOURCES</Label>
          <h1>Channels<br/><em>& Signals.</em></h1>
          <p>Choose how you would like to stay connected with Taqwa.</p>
        </FadeIn>
      </section>

      <section className="subpage-container" style={{ paddingBottom: '30px' }}>
        <FadeIn>
          <div className="channels-grid">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/buildwithtaqwa/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="channel-minimal-card"
              id="community-instagram"
            >
              <div className="channel-card-left">
                <div className="channel-outline-icon" aria-hidden="true">
                  <Camera size={22} />
                </div>
                <div className="channel-card-info">
                  <h3>Instagram</h3>
                  <span>@buildwithtaqwa</span>
                </div>
              </div>
              <div className="channel-action-btn">
                <span>FOLLOW</span>
                <ArrowUpRight size={18} />
              </div>
            </a>

            {/* Telegram Channel */}
            <a 
              href="https://t.me/buildwithtaqwa" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="channel-minimal-card"
              id="community-telegram"
            >
              <div className="channel-card-left">
                <div className="channel-outline-icon" aria-hidden="true">
                  <Send size={22} />
                </div>
                <div className="channel-card-info">
                  <h3>Telegram Channel</h3>
                  <span>Taqwa Agency</span>
                </div>
              </div>
              <div className="channel-action-btn">
                <span>JOIN CHANNEL</span>
                <ArrowUpRight size={18} />
              </div>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Taqwa Newsletter */}
      <TaqwaNewsletterSection />

      {/* Green Project Call to Action */}
      <FinalCTA />
    </Shell>
  );
}

export function FieldGuidesPage(){
  return (
    <Shell>
      <section className="page-hero">
        <FadeIn>
          <Link className="subpage-back-link" href="/resources">← All resources</Link>
          <Label>01 / FOUNDER FIELD GUIDES</Label>
          <h1>Founder<br/><em>Field Guides.</em></h1>
          <p>Practical essays and field notes from the trenches of launching businesses and coordinating teams. Start where you are.</p>
        </FadeIn>
      </section>

      <section className="resources-preview" style={{paddingTop: 0}}>
        <ResourceList />
      </section>

      <FinalCTA/>
    </Shell>
  );
}

