"use client";
import {useEffect,useRef} from 'react';

/** Pointer effects use direct style updates, never React renders per movement. */
export default function Motion(){
 const cursor=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
  let frame=0;let active:HTMLElement|null=null;let x=0;let y=0;
  const resetCard=()=>{if(active){active.style.removeProperty('--tilt-x');active.style.removeProperty('--tilt-y');active=null}};
  const hide=()=>{if(cursor.current)cursor.current.style.opacity='0';resetCard()};
  const move=(event:PointerEvent)=>{
   if(reduced.matches||!fine.matches||event.pointerType==='touch'){hide();return}
   x=event.clientX;y=event.clientY;
   const target=event.target instanceof Element?event.target:null;
   const card=target?.closest<HTMLElement>('.service-card,.resource-cover,.intention-panel')??null;
   if(card!==active){resetCard();active=card}
   const interactive=!!target?.closest('a,button,[role="button"],[role="combobox"]');
   if(cursor.current){cursor.current.dataset.active=String(interactive);cursor.current.style.opacity='1'}
   if(frame)return;
   frame=requestAnimationFrame(()=>{
    frame=0;
    if(cursor.current)cursor.current.style.transform=`translate3d(${x}px,${y}px,0)`;
    if(active){const r=active.getBoundingClientRect();active.style.setProperty('--tilt-x',`${-((y-r.top)/r.height-.5)*4}deg`);active.style.setProperty('--tilt-y',`${((x-r.left)/r.width-.5)*4}deg`)}
   });
  };
  const press=(event:PointerEvent)=>{
   if(reduced.matches)return;
   const target=event.target instanceof Element?event.target.closest<HTMLElement>('button,.button,.resource-item,.approach-word'):null;
   if(!target)return;
   const ring=document.createElement('span');ring.className='tap-pulse';ring.setAttribute('aria-hidden','true');
   ring.style.left=`${event.clientX}px`;ring.style.top=`${event.clientY}px`;document.body.appendChild(ring);
   ring.addEventListener('animationend',()=>ring.remove(),{once:true});
  };
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('motion-visible');observer.unobserve(entry.target)}}},{threshold:.08});
  if(!reduced.matches){document.querySelectorAll('.service-card,.resource-item,.work-feature,.value-row,.founder-note').forEach(el=>{el.classList.add('motion-ready');observer.observe(el)})}
  const preference=()=>{hide();document.querySelectorAll('.motion-ready').forEach(el=>el.classList.add('motion-visible'));document.querySelectorAll('.tap-pulse').forEach(el=>el.remove())};
  document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerdown',press,{passive:true});document.addEventListener('pointerleave',hide);window.addEventListener('blur',hide);reduced.addEventListener('change',preference);fine.addEventListener('change',preference);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();hide();document.removeEventListener('pointermove',move);document.removeEventListener('pointerdown',press);document.removeEventListener('pointerleave',hide);window.removeEventListener('blur',hide);reduced.removeEventListener('change',preference);fine.removeEventListener('change',preference);document.querySelectorAll('.tap-pulse').forEach(el=>el.remove());document.querySelectorAll('.motion-ready').forEach(el=>el.classList.remove('motion-ready','motion-visible'))};
 },[]);
 return <div ref={cursor} className="cursor-halo" aria-hidden="true"><span/></div>
}
