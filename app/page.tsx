"use client";
import { useEffect, useRef, useState } from "react";

const SKILL_SECTIONS = [
  { label:"Design",   color:"#FF7C00", skills:[
    {name:"Illustrator",  abbr:"Ai", bg:"#FF7C00"},
    {name:"Photoshop",    abbr:"Ps", bg:"#31A8FF"},
    {name:"InDesign",     abbr:"Id", bg:"#FF3366"},
    {name:"Lightroom",    abbr:"Lr", bg:"#26C0F0"},
    {name:"Premiere",     abbr:"Pr", bg:"#9999FF"},
    {name:"Web Design",   abbr:"Wd", bg:"#00B894"},
  ]},
  { label:"Tech", color:"#4B9FE0", skills:[
    {name:"HTML",      abbr:"HT", bg:"#E44D26"},
    {name:"CSS",       abbr:"CS", bg:"#264DE4"},
    {name:"AI Tools",  abbr:"AI", bg:"#7B2FBE"},
    {name:"Scratch",   abbr:"Sc", bg:"#4C97FF"},
    {name:"Prompting", abbr:"Pt", bg:"#5A3F8F"},
    {name:"GitHub",    abbr:"Gh", bg:"#6E40C9"},
    {name:"Vercel",    abbr:"Vc", bg:"#8B6EE8"},
    {name:"MS Office", abbr:"Ms", bg:"#D83B01"},
  ]},
  { label:"Creative", color:"#E8435A", skills:[
    {name:"Oil Painting",        abbr:"Op", bg:"#C0392B"},
    {name:"Flower Preservation", abbr:"Fp", bg:"#4BAF7E"},
    {name:"Clarinet",            abbr:"Cl", bg:"#6C5CE7"},
  ]},
];

function FlowerSVG({type,r,color,center}:{type:number;r:number;color:string;center:string}) {
  const vb=`${-r} ${-r} ${r*2} ${r*2}`;
  const S={overflow:"visible" as const};
  if(type===0) return <svg viewBox={vb} width={r*2} height={r*2} style={S}>
    {Array.from({length:12}).map((_,i)=><ellipse key={i} cx="0" cy={-(r*.32+r*.36)} rx={r*.14} ry={r*.42} fill={color} transform={`rotate(${(i/12)*360})`}/>)}
    <circle cx="0" cy="0" r={r*.3} fill={center}/><circle cx="0" cy="0" r={r*.16} fill={color}/>
  </svg>;
  if(type===1) return <svg viewBox={vb} width={r*2} height={r*2} style={S}>
    {Array.from({length:7}).map((_,i)=>{const a=(i/7)*Math.PI*2,ox=Math.cos(a)*r*.22,oy=Math.sin(a)*r*.22;return <ellipse key={i} cx={ox} cy={oy} rx={r*.48} ry={r*.28} fill={color} transform={`rotate(${a*180/Math.PI} ${ox} ${oy})`}/>;})}<circle cx="0" cy="0" r={r*.22} fill={center}/>
  </svg>;
  if(type===2) return <svg viewBox={vb} width={r*2} height={r*2} style={S}>
    {Array.from({length:5}).map((_,i)=><ellipse key={i} cx="0" cy={-r*.44} rx={r*.38} ry={r*.56} fill={color} transform={`rotate(${(i/5)*360})`}/>)}
    <circle cx="0" cy="0" r={r*.16} fill={center}/>
  </svg>;
  return <svg viewBox={vb} width={r*2} height={r*2} style={S}>
    {Array.from({length:8}).map((_,i)=>{const a=(i/8)*Math.PI*2,ox=Math.cos(a)*r*.45,oy=Math.sin(a)*r*.45;return <ellipse key={i} cx={ox} cy={oy} rx={r*.18} ry={r*.46} fill={color} transform={`rotate(${a*180/Math.PI} ${ox} ${oy})`}/>;})}<circle cx="0" cy="0" r={r*.18} fill={center}/>
  </svg>;
}

const HERO_DEF=[
  {type:1,r:290,color:"#F9C846",center:"#c8900a",cx:-0.02,cy:0.00,dx:-1,dy:-1,dur:"80s", delay:"0s",   depth:.055,linger:false},
  {type:3,r:115,color:"#F07048",center:"#c0400a",cx:0.35, cy:-0.05,dx:0, dy:-1,dur:"95s", delay:"-18s", depth:.022,linger:false},
  {type:2,r:265,color:"#4BAF7E",center:"#2c7a50",cx:1.02, cy:0.04, dx:1, dy:-1,dur:"88s", delay:"-8s",  depth:.048,linger:false},
  {type:0,r: 58,color:"#2EBFAC",center:"#1a7a6e",cx:0.72, cy:0.12, dx:1, dy:-1,dur:"130s",delay:"-40s", depth:.006,linger:true},
  {type:0,r:310,color:"#E8435A",center:"#b82040",cx:-0.04,cy:0.55, dx:-1,dy:0, dur:"72s", delay:"-22s", depth:.058,linger:false},
  {type:3,r: 62,color:"#8B6EE8",center:"#5230c8",cx:0.18, cy:0.38, dx:-1,dy:0, dur:"140s",delay:"-55s", depth:.007,linger:true},
  {type:1,r:125,color:"#4BAF7E",center:"#2c7a50",cx:0.52, cy:0.48, dx:0, dy:1, dur:"105s",delay:"-35s", depth:.020,linger:true},
  {type:3,r:275,color:"#8B6EE8",center:"#5230c8",cx:1.03, cy:0.62, dx:1, dy:0, dur:"84s", delay:"-42s", depth:.052,linger:false},
  {type:2,r: 55,color:"#F9C846",center:"#c8900a",cx:0.80, cy:0.30, dx:1, dy:-1,dur:"150s",delay:"-70s", depth:.005,linger:true},
  {type:2,r:135,color:"#F07048",center:"#c0400a",cx:0.12, cy:0.75, dx:-1,dy:1, dur:"98s", delay:"-15s", depth:.022,linger:true},
  {type:0,r: 50,color:"#F9C846",center:"#c8900a",cx:0.42, cy:0.85, dx:0, dy:1, dur:"160s",delay:"-25s", depth:.005,linger:true},
  {type:0,r:335,color:"#F07048",center:"#c0400a",cx:0.50, cy:1.05, dx:0, dy:1, dur:"76s", delay:"-10s", depth:.060,linger:false},
  {type:1,r:250,color:"#2EBFAC",center:"#1a7a6e",cx:0.18, cy:0.98, dx:-1,dy:1, dur:"90s", delay:"-50s", depth:.045,linger:false},
  {type:1,r:260,color:"#F9C846",center:"#c8900a",cx:0.82, cy:0.95, dx:1, dy:1, dur:"86s", delay:"-30s", depth:.050,linger:false},
  {type:3,r: 60,color:"#E8435A",center:"#b82040",cx:0.68, cy:0.72, dx:1, dy:1, dur:"125s",delay:"-62s", depth:.006,linger:true},
  {type:2,r: 80,color:"#F9C846",center:"#c8900a",cx:0.25, cy:-0.08,dx:0, dy:-1,dur:"110s",delay:"-30s", depth:.010,linger:false},
  {type:1,r: 52,color:"#E8435A",center:"#b82040",cx:0.76, cy:-0.06,dx:1, dy:-1,dur:"125s",delay:"-45s", depth:.007,linger:false},
  {type:0,r: 70,color:"#8B6EE8",center:"#5230c8",cx:0.50, cy:-0.12,dx:0, dy:-1,dur:"95s", delay:"-20s", depth:.009,linger:false},
  {type:3,r: 44,color:"#2EBFAC",center:"#1a7a6e",cx:0.62, cy:-0.04,dx:1, dy:-1,dur:"138s",delay:"-58s", depth:.005,linger:false},
  {type:2,r: 60,color:"#F07048",center:"#c0400a",cx:0.12, cy:-0.10,dx:-1,dy:-1,dur:"102s",delay:"-14s", depth:.008,linger:false},
];

function HeroFlowers({scrollPct}:{scrollPct:number}) {
  const refs=useRef<(HTMLDivElement|null)[]>([]);
  const mouseRef=useRef({x:0.5,y:0.5});
  const scrollRef=useRef(scrollPct);
  useEffect(()=>{scrollRef.current=scrollPct;},[scrollPct]);

  useEffect(()=>{
    let raf:number;
    const onMouse=(e:MouseEvent)=>{mouseRef.current={x:e.clientX/window.innerWidth,y:e.clientY/window.innerHeight};};
    const tick=()=>{
      const {x,y}=mouseRef.current;
      const pxN=x-.5,pyN=y-.5;
      const sp=scrollRef.current;
      refs.current.forEach((el,i)=>{
        if(!el)return;
        const f=HERO_DEF[i];
        const sign=(i%2===0?1:-1),signY=(i%3===0?1:-.9);
        const bx=f.cx*100+pxN*100*f.depth*sign;
        const by=f.cy*100+pyN*100*f.depth*signY;
        const ease=sp<.5?sp*2:1;
        const D=80;
        let ox,oy,op;
        if(f.linger){ox=bx+f.dx*D*ease*.25;oy=by+f.dy*D*ease*.25;op=Math.max(0,1-ease*.55);}
        else{ox=bx+f.dx*D*ease;oy=by+f.dy*D*ease;op=Math.max(0,1-ease*1.5);}
        el.style.left=`${ox}%`;el.style.top=`${oy}%`;el.style.opacity=String(op);
      });
      raf=requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove",onMouse,{passive:true});
    raf=requestAnimationFrame(tick);
    return()=>{window.removeEventListener("mousemove",onMouse);cancelAnimationFrame(raf);};
  },[]);

  return <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
    {HERO_DEF.map((f,i)=>(
      <div key={i} ref={el=>{refs.current[i]=el;}} style={{
        position:"absolute",left:`${f.cx*100}%`,top:`${f.cy*100}%`,
        transform:"translate(-50%,-50%)",width:f.r*2,height:f.r*2,
        animation:`frot ${f.dur} linear infinite`,animationDelay:f.delay,willChange:"left,top,opacity",
      }}>
        <FlowerSVG type={f.type} r={f.r} color={f.color} center={f.center}/>
      </div>
    ))}
  </div>;
}

function AmbientFlowers(){
  const smalls=[
    {type:1,r:62,color:"#F9C846",center:"#c8900a",left:"1%",  top:"132vh",dur:"100s",delay:"0s"},
    {type:3,r:48,color:"#E8435A",center:"#b82040",left:"97%", top:"148vh",dur:"118s",delay:"-22s"},
    {type:0,r:44,color:"#4BAF7E",center:"#2c7a50",left:"88%", top:"162vh",dur:"112s",delay:"-44s"},
    {type:2,r:52,color:"#8B6EE8",center:"#5230c8",left:"10%", top:"178vh",dur:"130s",delay:"-15s"},
    {type:3,r:58,color:"#2EBFAC",center:"#1a7a6e",left:"1%",  top:"205vh",dur:"95s", delay:"-38s"},
    {type:1,r:46,color:"#F07048",center:"#c0400a",left:"92%", top:"222vh",dur:"140s",delay:"-60s"},
    {type:0,r:54,color:"#F9C846",center:"#c8900a",left:"6%",  top:"248vh",dur:"108s",delay:"-28s"},
    {type:2,r:50,color:"#E8435A",center:"#b82040",left:"97%", top:"268vh",dur:"122s",delay:"-10s"},
    {type:1,r:60,color:"#4BAF7E",center:"#2c7a50",left:"2%",  top:"292vh",dur:"90s", delay:"-55s"},
    {type:3,r:44,color:"#8B6EE8",center:"#5230c8",left:"86%", top:"312vh",dur:"135s",delay:"-33s"},
    {type:0,r:56,color:"#2EBFAC",center:"#1a7a6e",left:"97%", top:"335vh",dur:"105s",delay:"-48s"},
    {type:2,r:48,color:"#F07048",center:"#c0400a",left:"8%",  top:"355vh",dur:"115s",delay:"-20s"},
    {type:3,r:62,color:"#F9C846",center:"#c8900a",left:"1%",  top:"382vh",dur:"98s", delay:"-42s"},
    {type:0,r:50,color:"#E8435A",center:"#b82040",left:"94%", top:"400vh",dur:"128s",delay:"-65s"},
    {type:1,r:54,color:"#4BAF7E",center:"#2c7a50",left:"5%",  top:"425vh",dur:"110s",delay:"-18s"},
    {type:2,r:46,color:"#8B6EE8",center:"#5230c8",left:"97%", top:"445vh",dur:"142s",delay:"-35s"},
    {type:0,r:58,color:"#2EBFAC",center:"#1a7a6e",left:"2%",  top:"468vh",dur:"95s", delay:"-50s"},
    {type:3,r:52,color:"#F07048",center:"#c0400a",left:"90%", top:"488vh",dur:"120s",delay:"-12s"},
    {type:1,r:48,color:"#F9C846",center:"#c8900a",left:"7%",  top:"510vh",dur:"105s",delay:"-38s"},
    {type:2,r:60,color:"#E8435A",center:"#b82040",left:"97%", top:"528vh",dur:"132s",delay:"-25s"},
    {type:3,r:56,color:"#4BAF7E",center:"#2c7a50",left:"1%",  top:"548vh",dur:"88s", delay:"-55s"},
    {type:0,r:44,color:"#8B6EE8",center:"#5230c8",left:"93%", top:"568vh",dur:"138s",delay:"-40s"},
    {type:2,r:52,color:"#2EBFAC",center:"#1a7a6e",left:"4%",  top:"590vh",dur:"102s",delay:"-18s"},
    {type:1,r:48,color:"#F07048",center:"#c0400a",left:"97%", top:"612vh",dur:"125s",delay:"-62s"},
    {type:0,r:60,color:"#F9C846",center:"#c8900a",left:"2%",  top:"638vh",dur:"115s",delay:"-30s"},
    {type:3,r:46,color:"#E8435A",center:"#b82040",left:"89%", top:"658vh",dur:"98s", delay:"-50s"},
    {type:1,r:54,color:"#4BAF7E",center:"#2c7a50",left:"97%", top:"682vh",dur:"140s",delay:"-15s"},
    {type:2,r:50,color:"#8B6EE8",center:"#5230c8",left:"6%",  top:"702vh",dur:"108s",delay:"-42s"},
    {type:3,r:58,color:"#2EBFAC",center:"#1a7a6e",left:"1%",  top:"725vh",dur:"92s", delay:"-28s"},
    {type:0,r:52,color:"#F07048",center:"#c0400a",left:"94%", top:"748vh",dur:"130s",delay:"-55s"},
    {type:2,r:48,color:"#F9C846",center:"#c8900a",left:"8%",  top:"772vh",dur:"112s",delay:"-20s"},
    {type:1,r:62,color:"#E8435A",center:"#b82040",left:"97%", top:"795vh",dur:"105s",delay:"-38s"},
    {type:3,r:50,color:"#4BAF7E",center:"#2c7a50",left:"3%",  top:"820vh",dur:"125s",delay:"-45s"},
    {type:0,r:56,color:"#8B6EE8",center:"#5230c8",left:"91%", top:"840vh",dur:"95s", delay:"-10s"},
  ];
  return <div style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,overflow:"clip"}}>
    {smalls.map((f,i)=>(
      <div key={i} style={{position:"absolute",left:f.left,top:f.top,transform:"translate(-50%,-50%)",width:f.r*2,height:f.r*2,opacity:.72,animation:`frot ${f.dur} linear infinite`,animationDelay:f.delay}}>
        <FlowerSVG type={f.type} r={f.r} color={f.color} center={f.center}/>
      </div>
    ))}
  </div>;
}

export default function Home(){
  const curRef=useRef<HTMLDivElement>(null);
  const ringRef=useRef<HTMLDivElement>(null);
  const [typed,setTyped]=useState("");
  const [phase,setPhase]=useState<"typing"|"done">("typing");
  const [scrollPct,setScrollPct]=useState(0);

  useEffect(()=>{
    if("scrollRestoration" in history){history.scrollRestoration="manual";}
    window.scrollTo(0,0);
  },[]);

  useEffect(()=>{
    const name="Maria Brito";let i=0;
    const t=setInterval(()=>{i++;setTyped(name.slice(0,i));if(i>=name.length){clearInterval(t);setPhase("done");}},80);
    return()=>clearInterval(t);
  },[]);

  useEffect(()=>{
    const onScroll=()=>{
      const raw=window.scrollY/window.innerHeight;
      setScrollPct(Math.min(raw,1));
      const bgPct=Math.min(raw/.4,1);
      const lerp=(a:number,b:number,t:number)=>Math.round(a+(b-a)*t);
      document.body.style.background=`rgb(${lerp(10,250,bgPct)},${lerp(9,246,bgPct)},${lerp(18,239,bgPct)})`;
    };
    window.addEventListener("scroll",onScroll,{passive:true});
    onScroll();
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  useEffect(()=>{
    if(window.matchMedia("(pointer:coarse)").matches)return;
    let cx=0,cy=0,rx=0,ry=0;let raf:number;
    const mm=(e:MouseEvent)=>{cx=e.clientX;cy=e.clientY;};
    const tick=()=>{
      if(curRef.current){curRef.current.style.left=cx+"px";curRef.current.style.top=cy+"px";}
      rx+=(cx-rx)*.13;ry+=(cy-ry)*.13;
      if(ringRef.current){ringRef.current.style.left=rx+"px";ringRef.current.style.top=ry+"px";}
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    document.addEventListener("mousemove",mm);
    const big=()=>{if(curRef.current){curRef.current.style.width="18px";curRef.current.style.height="18px";}if(ringRef.current){ringRef.current.style.width="50px";ringRef.current.style.height="50px";}};
    const sml=()=>{if(curRef.current){curRef.current.style.width="10px";curRef.current.style.height="10px";}if(ringRef.current){ringRef.current.style.width="32px";ringRef.current.style.height="32px";}};
    document.querySelectorAll("a,button,.card,.chip").forEach(el=>{el.addEventListener("mouseenter",big);el.addEventListener("mouseleave",sml);});
    return()=>{document.removeEventListener("mousemove",mm);cancelAnimationFrame(raf);};
  },[]);

  useEffect(()=>{
    const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in");});},{threshold:0.07});
    document.querySelectorAll(".rev,.edu-item,.lang-card").forEach(el=>io.observe(el));
    document.querySelectorAll<HTMLElement>(".card").forEach(c=>{
      const ms=parseFloat(c.dataset.d??"0");
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add("in"),ms);obs.unobserve(e.target);}});},{threshold:0.05});
      obs.observe(c);
    });
    document.querySelectorAll<HTMLElement>(".chip").forEach((ch,i)=>{
      ch.style.transitionDelay=`${i*.04}s`;
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");obs.unobserve(e.target);}});},{threshold:0.05});
      obs.observe(ch);
    });
    document.querySelectorAll<HTMLElement>(".lang-card").forEach(lc=>{
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){
        e.target.classList.add("in");
        (e.target as HTMLElement).querySelectorAll<HTMLElement>(".lf").forEach(b=>{setTimeout(()=>{b.style.width=(b.dataset.w??"0")+"%";},400);});
        obs.unobserve(e.target);
      }});},{threshold:.1});
      obs.observe(lc);
    });
    return()=>io.disconnect();
  },[]);

  return(<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Boldonse&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
      :root{--rose:#E8435A;--peach:#F07048;--sun:#F5C430;--sage:#4BAF7E;--teal:#2EBFAC;--sky:#4B9FE0;--lav:#8B6EE8;--ink:#1A1410;--muted:#9A8C88;--textd:rgba(26,20,16,.72);}
      *{margin:0;padding:0;box-sizing:border-box;}
      html{scroll-behavior:smooth;background:#0a0912;}
      body{background:#0a0912;color:#1A1410;font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;}
      @media(pointer:fine){
        body{cursor:none;}
        .cur{width:10px;height:10px;background:var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .18s,height .18s;}
        .cur-ring{width:32px;height:32px;border:1.5px solid var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .18s,height .18s;opacity:.45;}
      }
      @keyframes frot{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
      @keyframes cblink{0%,100%{opacity:1}50%{opacity:0}}

      /* ── HERO: gradient on full-width wrapper, layout on inner ── */
      .hero-bg{
        width:100%;
        min-height:100vh;
        min-height:100dvh;
        position:relative;
        z-index:1;
        /* gradient lives HERE — stretches edge to edge */
        background:
          radial-gradient(ellipse 55% 80% at 8% 50%,  rgba(232,67,90,.28)   0%,transparent 65%),
          radial-gradient(ellipse 45% 70% at 92% 50%, rgba(139,110,232,.28) 0%,transparent 65%),
          radial-gradient(ellipse 38% 55% at 50% 8%,  rgba(245,196,48,.18)  0%,transparent 60%),
          radial-gradient(ellipse 32% 50% at 50% 92%, rgba(46,191,172,.18)  0%,transparent 60%);
        overflow:hidden;
      }
      .hero{
        min-height:100vh;
        min-height:100dvh;
        position:relative;
        z-index:1;
        display:grid;
        grid-template-columns:1fr 1fr;
        align-items:center;
        padding:80px 72px;
        gap:48px;
        /* max-width centering for content only — no background here */
        max-width:1240px;
        margin:0 auto;
      }

      .hero-left{position:relative;z-index:10;}
      .status{display:inline-flex;align-items:center;gap:8px;border:1.5px solid rgba(75,175,126,.5);border-radius:100px;padding:7px 18px;font-size:12px;font-family:'DM Mono',monospace;color:#6dcf9e;background:rgba(75,175,126,.15);margin-bottom:24px;animation:fadeUp .8s ease .2s both;}
      .sdot{width:7px;height:7px;background:#6dcf9e;border-radius:50%;animation:blink 2s ease infinite;flex-shrink:0;}
      .hero-name{font-family:'Boldonse',cursive;font-size:clamp(36px,5.8vw,86px);line-height:1.15;letter-spacing:-2px;color:white;margin-bottom:32px;white-space:nowrap;}
      .cursor-blink{display:inline-block;width:.07em;height:.85em;background:var(--rose);margin-left:3px;vertical-align:-.04em;animation:cblink .75s step-end infinite;}
      .cursor-blink.done{animation:none;opacity:0;}

      .hero-links{display:flex;gap:10px;flex-wrap:wrap;animation:fadeUp .8s ease .35s both;}
      .hl{display:inline-flex;align-items:center;gap:7px;padding:10px 20px;border-radius:100px;font-size:13px;font-family:'DM Mono',monospace;text-decoration:none;font-weight:500;transition:transform .2s,box-shadow .2s;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);}
      .hl:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.3);}
      .hl-email{background:rgba(232,67,90,.18);border:1px solid rgba(232,67,90,.35);color:#f87090;}
      .hl-li{background:rgba(75,159,224,.18);border:1px solid rgba(75,159,224,.35);color:#90c8f8;}
      .hl-flores{background:rgba(46,191,172,.15);border:1px solid rgba(46,191,172,.35);color:#2EBFAC;}
      .ico{width:14px;height:14px;flex-shrink:0;display:block;}

      .hero-right{position:relative;z-index:10;display:flex;align-items:center;justify-content:center;}
      .orbit-container{position:relative;width:400px;height:420px;flex-shrink:0;animation:fadeUp .9s ease .5s both;}
      .orbit-ring-el{position:absolute;top:50%;left:50%;width:340px;height:340px;margin-left:-170px;margin-top:-190px;border-radius:50%;border:1.5px dashed rgba(255,255,255,.2);pointer-events:none;animation:spinRingA 22s linear infinite;}
      @keyframes spinRingA{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      .pill-wrap{position:absolute;top:50%;left:50%;width:340px;height:340px;margin-left:-170px;margin-top:-190px;border-radius:50%;animation:spinRingA 22s linear infinite;z-index:20;pointer-events:none;}
      .opill{position:absolute;background:rgba(10,9,18,.85);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1.5px solid rgba(255,255,255,.2);border-radius:100px;padding:9px 18px;font-size:clamp(10px,1.2vw,12px);font-family:'DM Mono',monospace;box-shadow:0 4px 18px rgba(0,0,0,.4);white-space:nowrap;}
      .opill:nth-child(1){top:-20px;left:50%;transform:translateX(-50%);animation:counterN 22s linear infinite;color:#f87090;border-color:rgba(232,67,90,.45);}
      .opill:nth-child(2){top:50%;right:-30px;transform:translateY(-50%);animation:counterE 22s linear infinite;color:#f0a080;border-color:rgba(240,112,72,.45);}
      .opill:nth-child(3){bottom:-20px;left:50%;transform:translateX(-50%);animation:counterN 22s linear infinite;color:#6dcf9e;border-color:rgba(75,175,126,.45);}
      .opill:nth-child(4){top:50%;left:-30px;transform:translateY(-50%);animation:counterE 22s linear infinite;color:#b090f8;border-color:rgba(139,110,232,.45);}
      @keyframes counterN{from{transform:translateX(-50%) rotate(0deg)}to{transform:translateX(-50%) rotate(-360deg)}}
      @keyframes counterE{from{transform:translateY(-50%) rotate(0deg)}to{transform:translateY(-50%) rotate(-360deg)}}
      .orbit-photo{position:absolute;top:50%;left:50%;transform:translate(-50%,-56%);width:230px;height:270px;z-index:10;}
      .photo-ring{position:absolute;inset:0;border-radius:115px 115px 32px 32px;padding:3px;background:conic-gradient(var(--rose),var(--sun),var(--teal),var(--lav),var(--rose));animation:hshift 10s linear infinite;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;}
      @keyframes hshift{from{filter:hue-rotate(0)}to{filter:hue-rotate(360deg)}}
      .photo-inner{position:absolute;inset:7px;border-radius:107px 107px 26px 26px;overflow:hidden;background:#2a1428;display:flex;align-items:center;justify-content:center;}
      .photo-inner img{width:100%;height:100%;object-fit:cover;object-position:center top;}
      .photo-ph{display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:rgba(255,255,255,.4);}
      .photo-ini{font-family:'Boldonse',cursive;font-size:48px;background:linear-gradient(135deg,var(--rose),var(--sun));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

      .mq{overflow:hidden;padding:22px 0;background:#0a0912;position:relative;z-index:2;}
      .mq-track{display:flex;animation:mqscroll 26s linear infinite;width:max-content;}
      .mq-item{font-family:'Boldonse',cursive;font-size:22px;color:rgba(255,255,255,.9);white-space:nowrap;padding:0 44px;display:flex;align-items:center;gap:44px;}
      .mq-item::after{content:'';display:block;width:8px;height:8px;border-radius:50%;background:var(--rose);}
      @keyframes mqscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

      .sec{padding:100px 72px;max-width:1240px;margin:0 auto;position:relative;z-index:2;}
      .div-wrap{padding:80px 72px 40px;max-width:1240px;margin:0 auto;position:relative;z-index:2;}
      .div-word{font-family:'Boldonse',cursive;font-size:clamp(52px,8vw,110px);line-height:.95;letter-spacing:-3px;color:#1A1410;user-select:none;}
      .div-word.rev{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s;}
      .div-word.rev.in{opacity:1;transform:translateY(0);}
      .sec-label{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);text-transform:uppercase;letter-spacing:3px;margin-bottom:12px;}
      .sec-label.rev{opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s;}
      .sec-label.rev.in{opacity:1;transform:translateY(0);}

      .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
      .card{background:rgba(255,255,255,.86);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,.65);border-radius:24px;padding:32px;position:relative;overflow:hidden;box-shadow:0 4px 28px rgba(0,0,0,.10);opacity:0;transform:translateY(28px);transition:border-color .25s,box-shadow .25s,transform .25s;}
      .card.in{opacity:1;transform:translateY(0);transition:opacity .6s ease,transform .6s ease,border-color .25s,box-shadow .25s;}
      .card:hover{transform:translateY(-5px)!important;box-shadow:0 20px 50px rgba(0,0,0,.1);border-color:rgba(255,255,255,.9);}
      .card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;opacity:0;transition:opacity .25s;border-radius:24px 24px 0 0;}
      .card:hover::before{opacity:1;}
      .cr::before{background:linear-gradient(90deg,var(--rose),var(--peach));} .cp::before{background:linear-gradient(90deg,var(--peach),var(--sun));} .ca::before{background:linear-gradient(90deg,var(--rose),var(--lav));} .cs::before{background:linear-gradient(90deg,var(--sky),var(--lav));} .cy::before{background:linear-gradient(90deg,var(--sun),var(--peach));} .cl::before{background:linear-gradient(90deg,var(--lav),var(--sky));} .ct::before{background:linear-gradient(90deg,var(--teal),var(--sage));} .cg::before{background:linear-gradient(90deg,var(--sage),var(--teal));}
      .card-full{grid-column:1/-1;}
      .card-flores{background:rgba(237,255,246,.9);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-color:rgba(75,175,126,.25);}
      .card-flores .feat-badge{background:rgba(75,175,126,.14);border:1.5px solid rgba(75,175,126,.28);color:#2c7a50;}
      .card-flores .bdot{background:var(--sage);}
      .card-gold{background:rgba(255,250,235,.9);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-color:rgba(200,144,10,.22);}
      .feat-badge{display:inline-flex;align-items:center;gap:7px;border-radius:100px;padding:5px 14px;font-size:11px;font-family:'DM Mono',monospace;margin-bottom:14px;}
      .bdot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
      .feat-inner{display:grid;grid-template-columns:1fr auto;gap:28px;align-items:start;}
      .site-links{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0;}
      .site-link{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-family:'DM Mono',monospace;color:#2c7a50;background:rgba(75,175,126,.1);border:1.5px solid rgba(75,175,126,.28);border-radius:100px;padding:5px 12px;text-decoration:none;transition:transform .2s;}
      .site-link:hover{transform:translateY(-2px);}
      .flores-vis{width:100px;height:100px;border-radius:20px;background:linear-gradient(135deg,#d4f7e5,#a8edcc);border:1.5px solid rgba(75,175,126,.28);display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:fbounce 5s ease-in-out infinite;}
      .fbr-vis{width:160px;height:160px;border-radius:18px;overflow:hidden;flex-shrink:0;animation:fbounce 5s ease-in-out infinite;}
      @keyframes fbounce{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-9px) rotate(4deg)}}
      .tech-list{list-style:none;margin-top:12px;display:flex;flex-direction:column;gap:7px;}
      .tech-list li{font-size:13px;line-height:1.6;color:var(--textd);padding-left:16px;position:relative;font-weight:400;}
      .tech-list li::before{content:'';position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:var(--sage);}
      .vol-thumb{width:160px;height:160px;flex-shrink:0;border-radius:18px;overflow:hidden;background:linear-gradient(135deg,#fdecc8,#fce4b0);display:flex;align-items:center;justify-content:center;}
      .vol-thumb img{width:100%;height:100%;object-fit:cover;}
      .vol-ph{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);}
      .wy{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:7px;display:flex;align-items:center;gap:7px;}
      .wdot{width:6px;height:6px;border-radius:50%;background:var(--rose);flex-shrink:0;}
      .wrole{font-family:'Boldonse',cursive;font-size:18px;margin-bottom:3px;color:#1A1410;line-height:1.2;}
      .worg{font-size:13px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:12px;}
      .wdesc{font-size:14px;line-height:1.74;color:var(--textd);font-weight:400;}
      .wdesc b{font-weight:700;color:#1A1410;}
      .wtags{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;}
      .tag{font-family:'DM Mono',monospace;font-size:11px;padding:4px 10px;border-radius:100px;border:1.5px solid;font-weight:500;}
      .tr{color:#b82040;border-color:rgba(232,67,90,.3);background:rgba(232,67,90,.07);} .tp{color:#bf5020;border-color:rgba(240,112,72,.3);background:rgba(240,112,72,.07);} .ty{color:#8a6000;border-color:rgba(245,196,48,.45);background:rgba(245,196,48,.09);} .tg{color:#2c7a50;border-color:rgba(75,175,126,.3);background:rgba(75,175,126,.07);} .tt{color:#1a7a6e;border-color:rgba(46,191,172,.3);background:rgba(46,191,172,.07);} .ts{color:#1a5a9a;border-color:rgba(75,159,224,.3);background:rgba(75,159,224,.07);} .tl{color:#5230c8;border-color:rgba(139,110,232,.3);background:rgba(139,110,232,.07);}
      .edu-tl{position:relative;padding-left:40px;}
      .edu-tl::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,var(--rose),var(--sun),var(--teal),var(--lav),var(--peach));border-radius:2px;}
      .edu-item{position:relative;margin-bottom:40px;opacity:0;transform:translateX(-18px);transition:opacity .55s,transform .55s;}
      .edu-item.in{opacity:1;transform:translateX(0);}
      .edu-item::before{content:'';position:absolute;left:-46px;top:7px;width:12px;height:12px;border-radius:50%;background:white;border:2.5px solid var(--rose);transition:background .25s;}
      .edu-item:nth-child(2)::before{border-color:var(--sun);} .edu-item:nth-child(3)::before{border-color:var(--teal);} .edu-item:nth-child(4)::before{border-color:var(--lav);} .edu-item:nth-child(5)::before{border-color:var(--peach);}
      .edu-yr{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:5px;}
      .edu-deg{font-family:'Boldonse',cursive;font-size:18px;margin-bottom:3px;color:#1A1410;line-height:1.15;}
      .edu-sch{font-size:13px;color:var(--muted);}
      .skill-section{margin-bottom:52px;}
      .skill-section-label{font-family:'Boldonse',cursive;font-size:22px;color:#1A1410;margin-bottom:18px;display:flex;align-items:center;gap:12px;}
      .skill-section-label::before{content:'';display:block;width:28px;height:3px;border-radius:2px;background:var(--accent-color,var(--rose));}
      .skill-section-label.rev{opacity:0;transform:translateX(-20px);transition:opacity .6s,transform .6s;}
      .skill-section-label.rev.in{opacity:1;transform:translateX(0);}
      .chips-row{display:flex;flex-wrap:wrap;gap:12px;}
      .chip{background:rgba(255,255,255,.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1.5px solid rgba(255,255,255,.65);border-radius:16px;padding:14px 14px;display:flex;align-items:center;gap:12px;cursor:default;opacity:0;transform:translateY(18px) scale(.93);box-shadow:0 2px 12px rgba(0,0,0,.07);transition:border-color .2s,box-shadow .2s,transform .2s,opacity .4s ease;min-width:fit-content;}
      .chip.in{opacity:1;transform:translateY(0) scale(1);}
      .chip:hover{transform:scale(1.05) translateY(-2px)!important;box-shadow:0 10px 26px rgba(0,0,0,.1);}
      .chip-logo{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Boldonse',cursive;font-size:11px;color:white;flex-shrink:0;}
      .chip-name{font-size:13px;font-family:'DM Mono',monospace;color:#1A1410;font-weight:500;}
      .lang-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
      .lang-card{background:rgba(255,255,255,.84);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,.65);border-radius:22px;padding:30px 26px;text-align:center;opacity:0;transform:translateY(20px);box-shadow:0 2px 14px rgba(0,0,0,.07);transition:transform .2s,box-shadow .2s;}
      .lang-card.in{opacity:1;transform:translateY(0);transition:opacity .55s ease,transform .55s ease,box-shadow .2s;}
      .lang-card:hover{transform:translateY(-5px)!important;box-shadow:0 14px 36px rgba(0,0,0,.1);}
      .llevel{font-family:'Boldonse',cursive;font-size:48px;margin-bottom:3px;}
      .lname{font-size:15px;color:#1A1410;font-weight:600;margin-bottom:2px;}
      .lcert{font-size:11px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:14px;}
      .lbar{height:5px;background:rgba(0,0,0,.08);border-radius:3px;overflow:hidden;}
      .lf{height:100%;border-radius:3px;width:0%;transition:width 1.1s ease .3s;}

      .contact{background:#0a0912;padding:100px 72px;text-align:center;position:relative;overflow:hidden;z-index:2;}
      .contact::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--rose),var(--peach),var(--sun),var(--teal),var(--lav));}
      .contact::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 70% at 15% 50%,rgba(232,67,90,.22) 0%,transparent 65%),radial-gradient(ellipse 50% 65% at 85% 50%,rgba(139,110,232,.22) 0%,transparent 65%),radial-gradient(ellipse 45% 55% at 50% 20%,rgba(245,196,48,.15) 0%,transparent 60%),radial-gradient(ellipse 40% 50% at 50% 85%,rgba(46,191,172,.15) 0%,transparent 60%);pointer-events:none;}
      .c-big{font-family:'Boldonse',cursive;font-size:clamp(26px,4.5vw,62px);line-height:1.15;letter-spacing:-1.5px;margin-bottom:16px;position:relative;z-index:1;display:flex;flex-wrap:wrap;justify-content:center;gap:.2em;}
      .cw1{color:var(--rose);} .cw2{color:var(--peach);} .cw3{color:var(--sun);} .cw4{color:var(--sage);} .cw5{color:var(--sky);} .cw6{color:var(--lav);}
      .c-sub-text{font-size:16px;color:rgba(255,255,255,.45);margin-bottom:44px;position:relative;z-index:1;}
      .cbtn{display:inline-flex;align-items:center;gap:10px;background:white;color:#0a0912;text-decoration:none;padding:16px 38px;border-radius:100px;font-size:15px;font-weight:700;transition:transform .2s,box-shadow .2s;position:relative;z-index:1;}
      .cbtn:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 18px 40px rgba(0,0,0,.4);}
      .c-links{margin-top:24px;color:rgba(255,255,255,.35);font-size:13px;font-family:'DM Mono',monospace;position:relative;z-index:1;line-height:2.2;}
      .c-links a{text-decoration:none;transition:color .2s;}
      .c-links a:hover{color:rgba(255,255,255,.8);}
      .rev{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s;}
      .rev.in{opacity:1;transform:translateY(0);}

      @media(max-width:960px){
        .hero-bg{min-height:100vh;min-height:100dvh;}
        .hero{grid-template-columns:1fr;min-height:100vh;min-height:100dvh;padding:0 40px;gap:0;display:flex;flex-direction:column;justify-content:center;}
        .hero-right{display:none;}
        .hero-name{font-size:clamp(32px,8vw,64px);white-space:nowrap;margin-bottom:24px;}
        .hero-links{gap:8px;}
        .hl{font-size:12px;padding:9px 16px;}
        .sec,.div-wrap{padding:60px 32px;}
        .grid2{grid-template-columns:1fr;}
        .feat-inner{grid-template-columns:1fr;}
        .flores-vis{display:none;}
        .vol-thumb{width:130px;height:130px;}
        .div-word{letter-spacing:-2px;}
        .contact{padding:72px 32px;}
      }
      @media(max-width:600px){
        .hero{padding:0 24px;min-height:100vh;min-height:100dvh;}
        .status{font-size:11px;padding:6px 14px;margin-bottom:18px;}
        .hero-name{font-size:clamp(28px,9.5vw,52px);white-space:nowrap;line-height:1.15;letter-spacing:-1.5px;margin-bottom:22px;}
        .hero-links{gap:8px;}
        .hl{font-size:11px;padding:8px 14px;}
        .hl-email{display:none;}
        .mq-item{font-size:16px;padding:0 28px;}
        .sec,.div-wrap{padding:40px 20px;}
        .div-word{font-size:clamp(34px,10vw,56px);letter-spacing:-1.5px;}
        .card{padding:20px;}
        .wrole{font-size:15px;}
        .wdesc{font-size:13px;}
        .grid2{gap:12px;}
        .tag{font-size:10px;padding:3px 8px;}
        .tech-list li{font-size:12px;}
        .chips-row{gap:8px;}
        .chip{padding:10px;gap:8px;}
        .chip-logo{width:28px;height:28px;font-size:10px;}
        .chip-name{font-size:11px;}
        .lang-grid{gap:12px;}
        .lang-card{padding:20px 16px;}
        .llevel{font-size:36px;}
        .edu-deg{font-size:15px!important;}
        .edu-tl{padding-left:28px;}
        .edu-item::before{left:-34px;width:10px;height:10px;}
        .vol-thumb{width:100px;height:100px;}
        .contact{padding:52px 20px;}
        .cbtn{padding:14px 28px;font-size:14px;}
        .c-links{font-size:11px;}
        .skill-section-label{font-size:18px;}
      }
      @media(max-width:380px){
        .hero-name{font-size:clamp(36px,10.5vw,52px);}
        .hl-li{display:none;}
      }
    `}</style>

    <head><link rel="icon" type="image/svg+xml" href="/favicon.svg"/></head>
    <div ref={curRef} className="cur"/>
    <div ref={ringRef} className="cur-ring"/>
    <HeroFlowers scrollPct={scrollPct}/>

    <div style={{position:"relative"}}>
      <AmbientFlowers/>

      {/* ── FIXED: gradient wrapper is full-width; hero is layout-only ── */}
      <div className="hero-bg">
        <div className="hero">
          <div className="hero-left">
            <div className="status"><div className="sdot"/>open to opportunities</div>
            <h1 className="hero-name">{typed}<span className={`cursor-blink${phase==="done"?" done":""}`}/></h1>
            <div className="hero-links">
              <a href="mailto:mariajgbrito@hotmail.com" className="hl hl-email">
                <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4"/></svg>
                mariajgbrito@hotmail.com
              </a>
              <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" className="hl hl-li">
                <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.3"/><circle cx="5" cy="5.5" r="1" fill="currentColor"/><path d="M5 8v4M8.5 12V9.5c0-1 .7-1.5 1.5-1.5s1.5.5 1.5 1.5V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                LinkedIn
              </a>
              <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" className="hl hl-flores">
                <svg className="ico" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.4"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(72 8 8)"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(144 8 8)"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(216 8 8)"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(288 8 8)"/></svg>
                floresabeirario.pt
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="orbit-container">
              <div className="orbit-ring-el"/>
              <div className="pill-wrap">
                <div className="opill">Educator</div>
                <div className="opill">Designer</div>
                <div className="opill">Co-founder</div>
                <div className="opill">Tech Enthusiast</div>
              </div>
              <div className="orbit-photo">
                <div className="photo-ring"/>
                <div className="photo-inner">
                  <img src="/mj.webp" alt="Maria Brito" onError={(e)=>{(e.target as HTMLImageElement).style.display="none";const ph=(e.target as HTMLImageElement).nextElementSibling as HTMLElement;if(ph)ph.style.display="flex";}}/>
                  <div className="photo-ph" style={{display:"none"}}><div className="photo-ini">MJB</div><span>add mj.webp to public/</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mq">
        <div className="mq-track">
          {["Educator","Designer","Co-founder","Tech Enthusiast","AI Enthusiast","Creative","Builder","Coimbra","Educator","Designer","Co-founder","Tech Enthusiast","AI Enthusiast","Creative","Builder","Coimbra"].map((t,i)=><div key={i} className="mq-item">{t}</div>)}
        </div>
      </div>

      <div className="div-wrap"><div className="div-word rev">Work</div></div>
      <section className="sec" style={{paddingTop:0}}>
        <div className="grid2">
          <div className="card card-full card-flores cg" data-d="0">
            <div className="feat-badge"><div className="bdot"/>Latest venture</div>
            <div className="feat-inner">
              <div>
                <div className="wy"><div className="wdot" style={{background:"var(--sage)"}}/><span style={{color:"var(--sage)"}}>2025 to Present</span></div>
                <div className="wrole">Co-Founder</div>
                <div className="worg">Flores à Beira-Rio</div>
                <div className="site-links">
                  <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" className="site-link"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.4"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(72 8 8)"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(144 8 8)"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(216 8 8)"/><ellipse cx="8" cy="3.5" rx="1.5" ry="2.2" stroke="currentColor" strokeWidth="1.2" transform="rotate(288 8 8)"/></svg>floresabeirario.pt</a>
                  <a href="https://status.floresabeirario.pt/N3F8L2Q7T5R9X1KP" target="_blank" rel="noreferrer" className="site-link"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8h6M5 5.5h6M5 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Order Tracking Portal</a>
                  <a href="https://voucher.floresabeirario.pt/A1B2C3" target="_blank" rel="noreferrer" className="site-link"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="8" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="5.5" width="14" height="2.5" rx="1" stroke="currentColor" strokeWidth="1.5"/><line x1="8" y1="5.5" x2="8" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M8 5.5C8 5.5 6 4.5 5 3C4.5 2 5.5 1 6.5 1.5C7.5 2 8 5.5 8 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 5.5C8 5.5 10 4.5 11 3C11.5 2 10.5 1 9.5 1.5C8.5 2 8 5.5 8 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>Digital Gift Voucher</a>
                </div>
                <p className="wdesc">Co-founded a flower preservation company and <b>built its entire digital presence from scratch</b>. Leads creative direction, branding, and all technical development.</p>
                <ul className="tech-list">
                  <li><b>Built and deployed</b> the brand website, a custom real-time order tracking portal, and a digital gift voucher system, managing the full development lifecycle.</li>
                  <li>Designed <b>backend logic using Google Sheets as a dynamic CMS</b> and integrated Monday.com via automated forms, streamlining lead capture and order management (CRM).</li>
                  <li>Used <b>advanced prompting and LLMs (Claude, Gemini)</b> to accelerate development, ship production-ready features rapidly, and debug complex API interactions.</li>
                  <li>Managed version control with <b>GitHub</b> and automated deployments via <b>Vercel CI/CD</b>.</li>
                </ul>
                <div className="wtags"><span className="tag tg">Entrepreneurship</span><span className="tag tt">Web Dev</span><span className="tag tg">AI Prototyping</span><span className="tag ts">GitHub / Vercel</span><span className="tag tg">Creative Direction</span><span className="tag tr">Floral Art</span><span className="tag tp">Creative Expression</span></div>
              </div>
              <div className="fbr-vis"><img src="/fbr.webp" alt="Flores à Beira-Rio" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:18}}/></div>
            </div>
          </div>

          <div className="card cr" data-d="80">
            <div className="wy"><div className="wdot"/>2023 to Present</div>
            <div className="wrole">Learning Coach</div><div className="worg">TUMO Coimbra</div>
            <p className="wdesc">Supports <b>teens 12 to 18</b> in self-directed learning across animation, filmmaking, music, and more. Guides, motivates, and tracks student progress.</p>
            <div className="wtags"><span className="tag tr">Youth Tech</span><span className="tag tp">Coaching</span></div>
          </div>

          <div className="card cp" data-d="140">
            <div className="wy"><div className="wdot" style={{background:"var(--peach)"}}/><span style={{color:"var(--peach)"}}>2023 to 2025</span></div>
            <div className="wrole">Info Desk</div><div className="worg">TUMO Coimbra</div>
            <p className="wdesc">Managed student enquiries, <b>check-in and check-out, registration and enrolment</b>, database upkeep, and parent communication.</p>
            <div className="wtags"><span className="tag tp">Operations</span><span className="tag ty">Administration</span></div>
          </div>

          <div className="card cl" data-d="200">
            <div className="wy"><div className="wdot" style={{background:"var(--lav)"}}/><span style={{color:"var(--lav)"}}>2023 to 2025</span></div>
            <div className="wrole">Middle School Teacher</div><div className="worg">Colégio de São José · Clonlara Program</div>
            <p className="wdesc">Taught <b>Mathematics and Information and Communication Technologies</b> within a personalised learning programme that fostered authenticity, autonomy, and joy in learning.</p>
            <div className="wtags"><span className="tag tl">Mathematics</span><span className="tag ts">Information and Communication Technologies</span><span className="tag tl">Personalised Learning</span></div>
          </div>

          <div className="card ct" data-d="260">
            <div className="wy"><div className="wdot" style={{background:"var(--teal)"}}/><span style={{color:"var(--teal)"}}>2022 to 2024</span></div>
            <div className="wrole">Middle School Teacher</div><div className="worg">Escola Tenente Valadim · ages 11 to 16</div>
            <p className="wdesc">Taught <b>Visual Education, Technology Education, and Design in Interactive Media</b> to homeschooled students. Developed creative expression and aesthetic understanding through art and technology.</p>
            <div className="wtags"><span className="tag tt">Visual Education</span><span className="tag ts">Interactive Design</span></div>
          </div>

          <div className="card cs" data-d="320">
            <div className="wy"><div className="wdot" style={{background:"var(--sky)"}}/><span style={{color:"var(--sky)"}}>2022 to 2023</span></div>
            <div className="wrole">Middle School Teacher</div><div className="worg">Agrupamento de Escolas Dr. Bissaya Barreto</div>
            <p className="wdesc">Taught <b>Information and Communication Technologies</b> in a public school environment.</p>
            <div className="wtags"><span className="tag ts">Information and Communication Technologies</span></div>
          </div>

          <div className="card cy" data-d="380">
            <div className="wy"><div className="wdot" style={{background:"var(--sun)"}}/><span style={{color:"#8a6000"}}>2017 to 2018</span></div>
            <div className="wrole">Monitor</div><div className="worg">Universidade de Coimbra</div>
            <p className="wdesc">Served as team monitor for <b>a class of 20 students</b> attending a Design and Multimedia summer course. Responsible for schedules, meals, attendance, and providing support throughout the classes.</p>
            <div className="wtags"><span className="tag ty">Mentoring</span><span className="tag tp">Design and Multimedia</span></div>
          </div>
        </div>
      </section>

      <div className="div-wrap"><div className="div-word rev">Internships</div></div>
      <section className="sec" style={{paddingTop:0}}>
        <div className="grid2">
          <div className="card cr" data-d="0">
            <div className="wy"><div className="wdot"/>2021 to 2022 · Paris, France</div>
            <div className="wrole">Production and Creative Direction</div><div className="worg">Julien Tavel, Fashion Photographer</div>
            <p className="wdesc">Worked as <b>production and photo crew assistant</b> to an internationally recognised fashion photographer. Researched visual subjects, generated <b>mood boards and conceptual ideas</b>, and managed all supplies and equipment for set.</p>
            <div className="wtags"><span className="tag tr">Fashion Photography</span><span className="tag tp">Creative Research</span><span className="tag ty">Set Management</span></div>
          </div>
          <div className="card cs" data-d="140">
            <div className="wy"><div className="wdot" style={{background:"var(--sky)"}}/><span style={{color:"var(--sky)"}}>2021 · Athens, Greece</span></div>
            <div className="wrole">Graphic and Email Designer</div><div className="worg">ShipLemon · DeliverBack</div>
            <p className="wdesc">Designed <b>web graphics, email templates, and newsletter layouts</b> for two tech startups. Built mobile-friendly campaigns and collaborated across teams on marketing materials.</p>
            <div className="wtags"><span className="tag ts">Web Design</span><span className="tag tt">Email Design</span><span className="tag tp">Graphic Design</span></div>
          </div>
        </div>
      </section>

      <div className="div-wrap"><div className="div-word rev">Volunteering</div></div>
      <section className="sec" style={{paddingTop:0}}>
        <div className="grid2">
          <div className="card card-full card-gold cy" data-d="0">
            <div className="feat-inner">
              <div>
                <div className="wy"><div className="wdot" style={{background:"#c8900a"}}/><span style={{color:"#8a6000"}}>2024 · Bulgaria</span></div>
                <div className="wrole">Summer Activities Creator</div><div className="worg">SOS Children&apos;s Villages · Future World Association</div>
                <p className="wdesc">Created and led <b>summer activities for children</b> at SOS Children&apos;s Villages, bringing creativity, play, and warmth through hands-on projects and joyful learning.</p>
                <div className="wtags"><span className="tag ty">Children&apos;s Activities</span><span className="tag tp">Community Care</span><span className="tag tr">Creative Workshops</span></div>
              </div>
              <div className="vol-thumb">
                <img src="/bulgaria.webp" alt="Volunteering in Bulgaria" onError={(e)=>{(e.target as HTMLImageElement).style.display="none";const ph=(e.target as HTMLImageElement).nextElementSibling as HTMLElement;if(ph)ph.style.display="flex";}}/>
                <div className="vol-ph" style={{display:"none"}}><svg width="44" height="30" viewBox="0 0 44 30"><rect width="44" height="10" fill="#fff"/><rect y="10" width="44" height="10" fill="#009B74"/><rect y="20" width="44" height="10" fill="#D01C1F"/></svg><span>bulgaria.webp</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="div-wrap"><div className="div-word rev">Education</div></div>
      <section className="sec" style={{paddingTop:0}}>
        <div className="edu-tl">
          {[
            {yr:"2016 to 2019",deg:"Bachelor's Degree in Design and Multimedia",sch:"University of Coimbra · Faculty of Sciences and Technology",c:"var(--rose)"},
            {yr:"2023",deg:"Computational Thinking in Maths with Scratch",sch:"CENFORMAZ",c:"var(--sun)"},
            {yr:"2023",deg:"Oil Painting Techniques",sch:"CEARTE · Fine and Studio Arts",c:"var(--teal)"},
            {yr:"2021",deg:"Fundamentals of Digital Marketing",sch:"The Open University",c:"var(--lav)"},
            {yr:"2008 to 2012",deg:"Music Course, Clarinet 5th Grade",sch:"Escola de Música · Colégio São Teotónio",c:"var(--peach)"},
          ].map((e,i)=>(
            <div key={i} className="edu-item">
              <div className="edu-yr" style={{color:e.c}}>{e.yr}</div>
              <div className="edu-deg" style={i>0?{fontSize:"16px"}:{}}>{e.deg}</div>
              <div className="edu-sch">{e.sch}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="div-wrap"><div className="div-word rev">Skills</div></div>
      <section className="sec" style={{paddingTop:0}}>
        {SKILL_SECTIONS.map(section=>(
          <div key={section.label} className="skill-section">
            <div className="skill-section-label rev" style={{"--accent-color":section.color} as React.CSSProperties}>{section.label}</div>
            <div className="chips-row">
              {section.skills.map(s=>(
                <div key={s.name} className="chip"><div className="chip-logo" style={{background:s.bg}}>{s.abbr}</div><div className="chip-name">{s.name}</div></div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="sec">
        <div className="div-word rev" style={{marginBottom:"40px"}}>Languages</div>
        <div className="lang-grid">
          {[
            {code:"PT",name:"Portuguese",cert:"Native",     w:100,color:"var(--rose)"},
            {code:"EN",name:"English",   cert:"Fluent",w:80, color:"var(--sky)"},
          ].map((l,i)=>(
            <div key={l.code} className="lang-card" style={{transitionDelay:`${i*.12}s`}}>
              <div className="llevel" style={{color:l.color}}>{l.code}</div>
              <div className="lname">{l.name}</div>
              <div className="lcert">{l.cert}</div>
              <div className="lbar"><div className="lf" data-w={l.w} style={{background:l.color}}/></div>
            </div>
          ))}
        </div>
      </section>

    </div>

    <div className="contact">
      <div className="c-big rev"><span className="cw1">The</span><span className="cw2">best</span><span className="cw3">projects</span><span className="cw4">start</span><span className="cw5">with</span><span className="cw1">a</span><span className="cw6">conversation.</span></div>
      <p className="c-sub-text rev" style={{visibility:"hidden"}}>placeholder</p>
      <a href="mailto:mariajgbrito@hotmail.com" className="cbtn rev">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="#0a0912" strokeWidth="1.5"/><path d="M1 5l7 5 7-5" stroke="#0a0912" strokeWidth="1.5"/></svg>
        Let&apos;s talk
      </a>
      <div className="c-links">
        mariajgbrito@hotmail.com &nbsp;&middot;&nbsp;
        <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" style={{color:"var(--sky)"}}>linkedin.com/in/mariajbrito</a>
        &nbsp;&middot;&nbsp;
        <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" style={{color:"var(--sage)"}}>floresabeirario.pt</a>
      </div>
      <div style={{marginTop:"52px",fontSize:"13px",fontFamily:"'DM Mono',monospace",color:"rgba(255,255,255,.65)",position:"relative",zIndex:1,lineHeight:2,letterSpacing:"0.02em"}}>
        Designed &amp; vibe-coded by <b style={{color:"rgba(255,255,255,.85)"}}>Maria Brito</b> &nbsp;&middot;&nbsp; Built with <b style={{color:"rgba(255,255,255,.85)"}}>Claude</b> &nbsp;&middot;&nbsp; Deployed on <b style={{color:"rgba(255,255,255,.85)"}}>Vercel</b>
      </div>
    </div>
  </>);
}
