"use client";
import { useEffect, useRef, useState } from "react";

const SKILL_SECTIONS = [
  {
    label: "Design",
    color: "#FF7C00",
    skills: [
      { name: "Illustrator",  abbr: "Ai", bg: "#FF7C00" },
      { name: "Photoshop",    abbr: "Ps", bg: "#31A8FF" },
      { name: "InDesign",     abbr: "Id", bg: "#FF3366" },
      { name: "Lightroom",    abbr: "Lr", bg: "#26C0F0" },
      { name: "Premiere",     abbr: "Pr", bg: "#9999FF" },
      { name: "Web Design",   abbr: "Wd", bg: "#00B894" },
    ],
  },
  {
    label: "Tech",
    color: "#4B9FE0",
    skills: [
      { name: "HTML",      abbr: "HT", bg: "#E44D26" },
      { name: "CSS",       abbr: "CS", bg: "#264DE4" },
      { name: "AI Tools",  abbr: "AI", bg: "#7B2FBE" },
      { name: "Scratch",   abbr: "Sc", bg: "#4C97FF" },
      { name: "Prompting", abbr: "Pt", bg: "#5A3F8F" },
      { name: "GitHub",    abbr: "Gh", bg: "#6E40C9" },
      { name: "Vercel",    abbr: "Vc", bg: "#8B6EE8" },
      { name: "MS Office", abbr: "Ms", bg: "#D83B01" },
    ],
  },
  {
    label: "Creative",
    color: "#E8435A",
    skills: [
      { name: "Oil Painting",        abbr: "Op", bg: "#C0392B" },
      { name: "Flower Preservation", abbr: "Fp", bg: "#4BAF7E" },
      { name: "Clarinet",            abbr: "Cl", bg: "#6C5CE7" },
    ],
  },
];

/* ── DIVERSE FLOWER TYPES ── */
// Each flower type produces a different SVG shape
function FlowerSVG({ type, r, color }: { type: number; r: number; color: string }) {
  const c = color;
  const r2 = r * 0.85;

  if (type === 0) {
    // Rose-style: many overlapping rounded petals, tight cluster
    const petals = 7;
    const pr = r * 0.48; const pc = r * 0.22;
    return (
      <svg viewBox={`${-r} ${-r} ${r*2} ${r*2}`} width={r*2} height={r*2} style={{overflow:"visible"}}>
        <g>
          {Array.from({length:petals}).map((_,i) => {
            const a = (i/petals)*Math.PI*2;
            const ox = Math.cos(a)*pc; const oy = Math.sin(a)*pc;
            const rot = (a*180/Math.PI);
            return <ellipse key={i} cx={ox} cy={oy} rx={pr} ry={pr*0.52} fill={c} opacity=".88" transform={`rotate(${rot} ${ox} ${oy})`}/>;
          })}
          <circle cx="0" cy="0" r={r*0.22} fill="white" opacity=".7"/>
          <circle cx="0" cy="0" r={r*0.11} fill={c} opacity=".6"/>
        </g>
      </svg>
    );
  }

  if (type === 1) {
    // Tulip-style: 3 large cupped petals, pointed tips
    return (
      <svg viewBox={`${-r} ${-r} ${r*2} ${r*2}`} width={r*2} height={r*2} style={{overflow:"visible"}}>
        <g>
          <path d={`M 0 ${-r*0.9} C ${r*0.45} ${-r*0.6} ${r*0.8} ${-r*0.1} ${r*0.5} ${r*0.6} C ${r*0.2} ${r*0.9} ${-r*0.2} ${r*0.9} ${-r*0.5} ${r*0.6} C ${-r*0.8} ${-r*0.1} ${-r*0.45} ${-r*0.6} 0 ${-r*0.9} Z`} fill={c} opacity=".85"/>
          <path d={`M 0 ${-r*0.9} C ${r*0.45} ${-r*0.6} ${r*0.8} ${-r*0.1} ${r*0.5} ${r*0.6} C ${r*0.2} ${r*0.9} 0 ${r*0.7} 0 ${r*0.9} Z`} fill={c} opacity=".65"/>
          <path d={`M 0 ${-r*0.9} C ${-r*0.45} ${-r*0.6} ${-r*0.8} ${-r*0.1} ${-r*0.5} ${r*0.6} C ${-r*0.2} ${r*0.9} 0 ${r*0.7} 0 ${r*0.9} Z`} fill={c} opacity=".65"/>
          <ellipse cx="0" cy={-r*0.05} rx={r*0.3} ry={r*0.38} fill="white" opacity=".2"/>
        </g>
      </svg>
    );
  }

  if (type === 2) {
    // Daisy/sunflower: long thin petals radiating from centre
    const petals = 12;
    const pl = r * 0.75; const pw = r * 0.14;
    return (
      <svg viewBox={`${-r} ${-r} ${r*2} ${r*2}`} width={r*2} height={r*2} style={{overflow:"visible"}}>
        <g>
          {Array.from({length:petals}).map((_,i) => {
            const a = (i/petals)*360;
            return <ellipse key={i} cx="0" cy={-(r*0.3+pl/2)} rx={pw} ry={pl/2} fill={c} opacity=".82" transform={`rotate(${a})`}/>;
          })}
          <circle cx="0" cy="0" r={r*0.28} fill="#F5C430" opacity=".95"/>
          <circle cx="0" cy="0" r={r*0.16} fill="#c8900a" opacity=".7"/>
        </g>
      </svg>
    );
  }

  if (type === 3) {
    // Poppy-style: 4 large round overlapping petals
    const petals = 4;
    const pr = r * 0.62; const pc = r * 0.2;
    return (
      <svg viewBox={`${-r} ${-r} ${r*2} ${r*2}`} width={r*2} height={r*2} style={{overflow:"visible"}}>
        <g>
          {Array.from({length:petals}).map((_,i) => {
            const a = (i/petals)*Math.PI*2 + Math.PI/4;
            const ox = Math.cos(a)*pc; const oy = Math.sin(a)*pc;
            return <circle key={i} cx={ox} cy={oy} r={pr} fill={c} opacity=".78"/>;
          })}
          <circle cx="0" cy="0" r={r*0.18} fill="#1a1410" opacity=".6"/>
          <circle cx="0" cy="0" r={r*0.09} fill="white" opacity=".5"/>
        </g>
      </svg>
    );
  }

  if (type === 4) {
    // Hibiscus-style: 5 wide fan petals with curved edges
    const petals = 5;
    return (
      <svg viewBox={`${-r} ${-r} ${r*2} ${r*2}`} width={r*2} height={r*2} style={{overflow:"visible"}}>
        <g>
          {Array.from({length:petals}).map((_,i) => {
            const a = (i/petals)*360;
            return (
              <ellipse key={i} cx="0" cy={-r*0.42} rx={r*0.38} ry={r*0.55} fill={c} opacity=".8" transform={`rotate(${a})`}/>
            );
          })}
          <circle cx="0" cy="0" r={r*0.15} fill="white" opacity=".8"/>
        </g>
      </svg>
    );
  }

  // type 5: Cherry blossom — 5 notched petals
  const petals = 5;
  const pr5 = r * 0.44; const pc5 = r * 0.26;
  return (
    <svg viewBox={`${-r} ${-r} ${r*2} ${r*2}`} width={r*2} height={r*2} style={{overflow:"visible"}}>
      <g>
        {Array.from({length:petals}).map((_,i) => {
          const a = (i/petals)*Math.PI*2;
          const ox = Math.cos(a)*pc5; const oy = Math.sin(a)*pc5;
          const rot = (a*180/Math.PI);
          return <ellipse key={i} cx={ox} cy={oy} rx={pr5*0.7} ry={pr5} fill={c} opacity=".82" transform={`rotate(${rot} ${ox} ${oy})`}/>;
        })}
        <circle cx="0" cy="0" r={r*0.2} fill="white" opacity=".8"/>
        <circle cx="0" cy="0" r={r*0.08} fill={c} opacity=".5"/>
      </g>
    </svg>
  );
}

function FlowerBg({ mx, my }: { mx: number; my: number }) {
  const W = typeof window !== "undefined" ? window.innerWidth  : 1200;
  const H = typeof window !== "undefined" ? window.innerHeight : 900;
  const pxN = mx / W - 0.5;
  const pyN = my / H - 0.5;

  // Big overlapping flowers — large radii, touching each other
  const flowers = [
    { cx:0.03, cy:0.05, r:300, color:"#F9C846", type:2, rot:0,   dur:"22s", delay:"0s"   },
    { cx:0.82, cy:0.02, r:280, color:"#4BAF7E", type:4, rot:15,  dur:"28s", delay:"-8s"  },
    { cx:-0.05,cy:0.55, r:320, color:"#E8435A", type:0, rot:35,  dur:"18s", delay:"-14s" },
    { cx:0.95, cy:0.60, r:290, color:"#8B6EE8", type:3, rot:20,  dur:"24s", delay:"-5s"  },
    { cx:0.42, cy:1.0,  r:340, color:"#F07048", type:1, rot:55,  dur:"20s", delay:"-10s" },
    { cx:0.62, cy:0.30, r:240, color:"#2EBFAC", type:5, rot:10,  dur:"26s", delay:"-3s"  },
    { cx:0.20, cy:0.82, r:260, color:"#F9C846", type:4, rot:40,  dur:"30s", delay:"-18s" },
    { cx:0.75, cy:0.85, r:220, color:"#E8435A", type:2, rot:0,   dur:"16s", delay:"-7s"  },
    { cx:0.30, cy:-0.05,r:250, color:"#8B6EE8", type:1, rot:30,  dur:"32s", delay:"-12s" },
  ];

  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
      {flowers.map((f,i) => {
        const depth = 0.03 + (i % 4) * 0.015;
        const x = f.cx * 100 + pxN * 100 * depth * (i%2===0 ? 1 : -1);
        const y = f.cy * 100 + pyN * 100 * depth * (i%3===0 ? 1 : -0.8);
        return (
          <div key={i} style={{
            position:"absolute",
            left:`${x}%`, top:`${y}%`,
            transform:"translate(-50%,-50%)",
            width:f.r*2, height:f.r*2,
            opacity:0.68,
            animation:`frot ${f.dur} linear infinite`,
            animationDelay:f.delay,
            transition:"left .4s ease-out, top .4s ease-out",
          }}>
            <FlowerSVG type={f.type} r={f.r} color={f.color} />
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing"|"done">("typing");
  const [mouse, setMouse] = useState({ x: 600, y: 400 });

  useEffect(() => {
    const name = "Maria Brito";
    let i = 0;
    const t = setInterval(() => { i++; setTyped(name.slice(0,i)); if(i>=name.length){clearInterval(t);setPhase("done");} }, 80);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const mm = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mm);
    return () => window.removeEventListener("mousemove", mm);
  }, []);

  useEffect(() => {
    let cx=0,cy=0,rx=0,ry=0; let raf:number;
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
    return ()=>{document.removeEventListener("mousemove",mm);cancelAnimationFrame(raf);};
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
      ch.style.transitionDelay=`${i*0.04}s`;
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");obs.unobserve(e.target);}});},{threshold:0.05});
      obs.observe(ch);
    });
    document.querySelectorAll<HTMLElement>(".lang-card").forEach(lc=>{
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){
        e.target.classList.add("in");
        (e.target as HTMLElement).querySelectorAll<HTMLElement>(".lf").forEach(b=>{setTimeout(()=>{b.style.width=(b.dataset.w??"0")+"%";},400);});
        obs.unobserve(e.target);
      }});},{threshold:0.1});
      obs.observe(lc);
    });
    return ()=>io.disconnect();
  },[]);

  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Boldonse&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

      :root {
        --ink:    #0F0E14;
        --page:   #141320;
        --surface:#1E1C2E;
        --border: rgba(255,255,255,.1);
        --rose:   #E8435A;
        --peach:  #F07048;
        --sun:    #F5C430;
        --sage:   #4BAF7E;
        --teal:   #2EBFAC;
        --sky:    #4B9FE0;
        --lav:    #8B6EE8;
        --muted:  rgba(255,255,255,.45);
        --text:   rgba(255,255,255,.9);
        --textd:  rgba(255,255,255,.7);
      }

      * { margin:0; padding:0; box-sizing:border-box; }
      html { scroll-behavior:smooth; }
      body { background:var(--page); color:var(--text); font-family:'Plus Jakarta Sans',sans-serif; overflow-x:hidden; cursor:none; }

      .cur      { width:10px;height:10px;background:var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .18s,height .18s; }
      .cur-ring { width:32px;height:32px;border:1.5px solid var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .18s,height .18s;opacity:.4; }

      @keyframes frot { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }

      /* ════ HERO ════ */
      .hero {
        min-height:100vh; position:relative; z-index:1;
        display:grid; grid-template-columns:1fr 1fr;
        align-items:center; padding:80px 72px; gap:48px; overflow:hidden;
      }
      .hero-left { position:relative; z-index:10; }

      .status {
        display:inline-flex;align-items:center;gap:8px;
        background:rgba(75,175,126,.18);border:1.5px solid rgba(75,175,126,.4);
        border-radius:100px;padding:7px 18px;
        font-size:12px;font-family:'DM Mono',monospace;color:var(--sage);
        margin-bottom:28px;animation:fadeUp .8s ease .2s both;
      }
      .sdot { width:7px;height:7px;background:var(--sage);border-radius:50%;animation:blink 2s ease infinite;flex-shrink:0; }
      @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}

      /* NAME — single line, no overlap */
      .hero-name {
        font-family:'Boldonse',cursive;
        font-size:clamp(44px,6.5vw,98px);
        line-height:1.05;
        letter-spacing:-2px;
        color:var(--text);
        white-space:nowrap;
        margin-bottom:32px;
        display:block;
      }
      .cursor-blink { display:inline-block;width:.07em;height:.85em;background:var(--rose);margin-left:3px;vertical-align:-.04em;animation:cblink .75s step-end infinite; }
      .cursor-blink.done { animation:none;opacity:0; }
      @keyframes cblink{0%,100%{opacity:1}50%{opacity:0}}

      .hero-links { display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp .8s ease .35s both; }
      .hl { display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:100px;font-size:13px;font-family:'DM Mono',monospace;text-decoration:none;font-weight:500;transition:transform .2s,box-shadow .2s; }
      .hl:hover { transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,0,0,.3); }
      .hl-email  { background:var(--rose);color:white; }
      .hl-li     { background:rgba(75,159,224,.18);border:1.5px solid rgba(75,159,224,.4);color:var(--sky); }
      .hl-flores { background:rgba(75,175,126,.15);border:1.5px solid rgba(75,175,126,.38);color:var(--sage); }
      .ico { width:14px;height:14px;flex-shrink:0;display:block; }

      /* ORBIT */
      .hero-right { position:relative;z-index:10;display:flex;align-items:center;justify-content:center; }
      .orbit-container { position:relative;width:400px;height:420px;flex-shrink:0;animation:fadeUp .9s ease .5s both; }
      .orbit-ring-el {
        position:absolute;top:50%;left:50%;
        width:340px;height:340px;margin-left:-170px;margin-top:-190px;
        border-radius:50%;border:1.5px dashed rgba(255,255,255,.2);
        pointer-events:none;animation:spinRingA 22s linear infinite;
      }
      @keyframes spinRingA{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      .pill-wrap {
        position:absolute;top:50%;left:50%;
        width:340px;height:340px;margin-left:-170px;margin-top:-190px;
        border-radius:50%;animation:spinRingA 22s linear infinite;z-index:20;pointer-events:none;
      }
      .opill {
        position:absolute;
        background:rgba(20,19,32,.9);
        backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
        border:1.5px solid rgba(255,255,255,.15);
        border-radius:100px;padding:9px 18px;
        font-size:12px;font-family:'DM Mono',monospace;
        box-shadow:0 4px 18px rgba(0,0,0,.4);
        white-space:nowrap;pointer-events:all;
      }
      .opill:nth-child(1){top:-20px;left:50%;transform:translateX(-50%);animation:counterN 22s linear infinite;color:var(--rose);border-color:rgba(232,67,90,.4);}
      .opill:nth-child(2){top:50%;right:-30px;transform:translateY(-50%);animation:counterE 22s linear infinite;color:var(--peach);border-color:rgba(240,112,72,.4);}
      .opill:nth-child(3){bottom:-20px;left:50%;transform:translateX(-50%);animation:counterN 22s linear infinite;color:var(--sage);border-color:rgba(75,175,126,.4);}
      .opill:nth-child(4){top:50%;left:-30px;transform:translateY(-50%);animation:counterE 22s linear infinite;color:var(--lav);border-color:rgba(139,110,232,.4);}
      @keyframes counterN{from{transform:translateX(-50%) rotate(0deg)}to{transform:translateX(-50%) rotate(-360deg)}}
      @keyframes counterE{from{transform:translateY(-50%) rotate(0deg)}to{transform:translateY(-50%) rotate(-360deg)}}

      .orbit-photo { position:absolute;top:50%;left:50%;transform:translate(-50%,-56%);width:230px;height:270px;z-index:10; }
      .photo-ring { position:absolute;inset:0;border-radius:115px 115px 32px 32px;padding:3px;background:conic-gradient(var(--rose),var(--sun),var(--teal),var(--lav),var(--rose));animation:hshift 10s linear infinite;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude; }
      @keyframes hshift{from{filter:hue-rotate(0)}to{filter:hue-rotate(360deg)}}
      .photo-inner { position:absolute;inset:7px;border-radius:107px 107px 26px 26px;overflow:hidden;background:#2a1f3d;display:flex;align-items:center;justify-content:center; }
      .photo-inner img { width:100%;height:100%;object-fit:cover;object-position:center top; }
      .photo-ph { display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:var(--muted); }
      .photo-ini { font-family:'Boldonse',cursive;font-size:48px;background:linear-gradient(135deg,var(--rose),var(--sun));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }

      /* MARQUEE */
      .mq{overflow:hidden;padding:22px 0;background:#0a0912;position:relative;z-index:2;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);}
      .mq-track{display:flex;gap:0;animation:mqscroll 26s linear infinite;width:max-content;}
      .mq-item{font-family:'Boldonse',cursive;font-size:22px;color:rgba(255,255,255,.85);white-space:nowrap;padding:0 44px;display:flex;align-items:center;gap:44px;}
      .mq-item::after{content:'';display:block;width:8px;height:8px;border-radius:50%;background:var(--rose);}
      @keyframes mqscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

      /* SECTIONS */
      .sec{padding:100px 72px;max-width:1240px;margin:0 auto;position:relative;z-index:2;}
      .div-wrap{padding:80px 72px 40px;max-width:1240px;margin:0 auto;position:relative;z-index:2;}
      .div-word{font-family:'Boldonse',cursive;font-size:clamp(52px,8vw,110px);line-height:.95;letter-spacing:-3px;color:var(--text);user-select:none;}
      .div-word.rev{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s;}
      .div-word.rev.in{opacity:1;transform:translateY(0);}
      .sec-label{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);text-transform:uppercase;letter-spacing:3px;margin-bottom:12px;}
      .sec-label.rev{opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s;}
      .sec-label.rev.in{opacity:1;transform:translateY(0);}

      /* CARDS */
      .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
      .card{
        background:var(--surface);
        border:1.5px solid var(--border);border-radius:24px;padding:32px;
        position:relative;overflow:hidden;
        box-shadow:0 4px 24px rgba(0,0,0,.3);
        opacity:0;transform:translateY(28px);
        transition:border-color .25s,box-shadow .25s,transform .25s;
      }
      .card.in{opacity:1;transform:translateY(0);transition:opacity .6s ease,transform .6s ease,border-color .25s,box-shadow .25s;}
      .card:hover{transform:translateY(-6px)!important;box-shadow:0 20px 50px rgba(0,0,0,.5);border-color:rgba(255,255,255,.2);}
      .card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;opacity:0;transition:opacity .25s;border-radius:24px 24px 0 0;}
      .card:hover::before{opacity:1;}
      .cr::before{background:linear-gradient(90deg,var(--rose),var(--peach));}
      .cp::before{background:linear-gradient(90deg,var(--peach),var(--sun));}
      .ca::before{background:linear-gradient(90deg,var(--rose),var(--lav));}
      .cs::before{background:linear-gradient(90deg,var(--sky),var(--lav));}
      .cy::before{background:linear-gradient(90deg,var(--sun),var(--peach));}
      .cl::before{background:linear-gradient(90deg,var(--lav),var(--sky));}
      .ct::before{background:linear-gradient(90deg,var(--teal),var(--sage));}

      .card-full{grid-column:1/-1;}

      /* Flores card — neutral dark, NOT green */
      .card-flores{
        background:linear-gradient(135deg,#1a1830,#221e38);
        border-color:rgba(139,110,232,.25);
      }
      .card-flores .feat-badge{ background:rgba(139,110,232,.18);border:1.5px solid rgba(139,110,232,.3);color:var(--lav); }
      .card-flores .bdot{ background:var(--lav); }

      .card-gold{background:linear-gradient(135deg,#221a08,#2a2010);border-color:rgba(245,196,48,.2);}

      .feat-badge{display:inline-flex;align-items:center;gap:7px;border-radius:100px;padding:5px 14px;font-size:11px;font-family:'DM Mono',monospace;margin-bottom:14px;}
      .bdot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
      .feat-inner{display:grid;grid-template-columns:1fr auto;gap:28px;align-items:start;}

      /* Site links */
      .site-links{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0;}
      .site-link{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-family:'DM Mono',monospace;color:var(--lav);background:rgba(139,110,232,.12);border:1.5px solid rgba(139,110,232,.28);border-radius:100px;padding:5px 12px;text-decoration:none;transition:transform .2s,background .2s;}
      .site-link:hover{transform:translateY(-2px);background:rgba(139,110,232,.22);}

      /* Flores animated flower */
      .flores-vis{width:100px;height:100px;border-radius:20px;background:linear-gradient(135deg,#1d2d40,#162535);border:1.5px solid rgba(139,110,232,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:fbounce 5s ease-in-out infinite;}
      @keyframes fbounce{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-9px) rotate(4deg)}}

      /* Tech bullet list */
      .tech-list{list-style:none;margin-top:12px;display:flex;flex-direction:column;gap:7px;}
      .tech-list li{font-size:13px;line-height:1.6;color:var(--textd);padding-left:16px;position:relative;font-weight:600;}
      .tech-list li::before{content:'';position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:var(--lav);}

      /* Vol thumb */
      .vol-thumb{width:176px;height:176px;flex-shrink:0;border-radius:18px;overflow:hidden;background:linear-gradient(135deg,#2a1f0a,#3a2c10);display:flex;align-items:center;justify-content:center;}
      .vol-thumb img{width:100%;height:100%;object-fit:cover;}
      .vol-ph{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);}

      /* Card text */
      .wy  {font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:7px;display:flex;align-items:center;gap:7px;}
      .wdot{width:6px;height:6px;border-radius:50%;background:var(--rose);flex-shrink:0;}
      .wrole{font-family:'Boldonse',cursive;font-size:18px;margin-bottom:3px;color:var(--text);line-height:1.2;}
      .worg{font-size:13px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:12px;}
      /* BOLD descriptions */
      .wdesc{font-size:14px;line-height:1.74;color:var(--textd);font-weight:600;}
      .wtags{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;}
      .tag{font-family:'DM Mono',monospace;font-size:11px;padding:4px 10px;border-radius:100px;border:1.5px solid;font-weight:500;}
      .tr{color:#f07080;border-color:rgba(232,67,90,.4);background:rgba(232,67,90,.1);}
      .tp{color:#f0a080;border-color:rgba(240,112,72,.4);background:rgba(240,112,72,.1);}
      .ty{color:#f0c860;border-color:rgba(245,196,48,.4);background:rgba(245,196,48,.1);}
      .tg{color:#6dcf9e;border-color:rgba(75,175,126,.4);background:rgba(75,175,126,.1);}
      .tt{color:#60d8c8;border-color:rgba(46,191,172,.4);background:rgba(46,191,172,.1);}
      .ts{color:#80c0f0;border-color:rgba(75,159,224,.4);background:rgba(75,159,224,.1);}
      .tl{color:#b090f8;border-color:rgba(139,110,232,.4);background:rgba(139,110,232,.1);}

      /* EDUCATION */
      .edu-tl{position:relative;padding-left:40px;}
      .edu-tl::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,var(--rose),var(--sun),var(--teal),var(--lav),var(--peach));border-radius:2px;}
      .edu-item{position:relative;margin-bottom:40px;opacity:0;transform:translateX(-18px);transition:opacity .55s,transform .55s;}
      .edu-item.in{opacity:1;transform:translateX(0);}
      .edu-item::before{content:'';position:absolute;left:-46px;top:7px;width:12px;height:12px;border-radius:50%;background:var(--surface);border:2.5px solid var(--rose);transition:background .25s;}
      .edu-item:nth-child(2)::before{border-color:var(--sun);}
      .edu-item:nth-child(3)::before{border-color:var(--teal);}
      .edu-item:nth-child(4)::before{border-color:var(--lav);}
      .edu-item:nth-child(5)::before{border-color:var(--peach);}
      .edu-item:hover::before{background:var(--rose);}
      .edu-yr {font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:5px;}
      .edu-deg{font-family:'Boldonse',cursive;font-size:18px;margin-bottom:3px;color:var(--text);line-height:1.15;}
      .edu-sch{font-size:13px;color:var(--muted);}

      /* SKILLS */
      .skill-section{margin-bottom:52px;}
      .skill-section-label{font-family:'Boldonse',cursive;font-size:22px;color:var(--text);margin-bottom:18px;display:flex;align-items:center;gap:12px;}
      .skill-section-label::before{content:'';display:block;width:28px;height:3px;border-radius:2px;background:var(--accent-color,var(--rose));}
      .skill-section-label.rev{opacity:0;transform:translateX(-20px);transition:opacity .6s,transform .6s;}
      .skill-section-label.rev.in{opacity:1;transform:translateX(0);}
      .chips-row{display:flex;flex-wrap:wrap;gap:12px;}
      .chip{background:var(--surface);border:1.5px solid var(--border);border-radius:16px;padding:16px 14px;display:flex;align-items:center;gap:12px;cursor:default;opacity:0;transform:translateY(18px) scale(.93);box-shadow:0 4px 14px rgba(0,0,0,.2);transition:border-color .2s,box-shadow .2s,transform .2s,opacity .4s ease;min-width:fit-content;}
      .chip.in{opacity:1;transform:translateY(0) scale(1);}
      .chip:hover{transform:scale(1.05) translateY(-2px)!important;box-shadow:0 10px 26px rgba(0,0,0,.4);border-color:rgba(255,255,255,.25);}
      .chip-logo{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'Boldonse',cursive;font-size:12px;color:white;flex-shrink:0;letter-spacing:0;}
      .chip-name{font-size:13px;font-family:'DM Mono',monospace;color:var(--text);font-weight:500;}

      /* LANGUAGES */
      .lang-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
      .lang-card{background:var(--surface);border:1.5px solid var(--border);border-radius:22px;padding:30px 26px;text-align:center;opacity:0;transform:translateY(20px);box-shadow:0 4px 18px rgba(0,0,0,.2);transition:transform .2s,box-shadow .2s;}
      .lang-card.in{opacity:1;transform:translateY(0);transition:opacity .55s ease,transform .55s ease,box-shadow .2s;}
      .lang-card:hover{transform:translateY(-5px)!important;box-shadow:0 14px 36px rgba(0,0,0,.4);}
      .llevel{font-family:'Boldonse',cursive;font-size:48px;margin-bottom:3px;}
      .lname{font-size:15px;color:var(--text);font-weight:600;margin-bottom:2px;}
      .lcert{font-size:11px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:14px;}
      .lbar{height:5px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;}
      .lf{height:100%;border-radius:3px;width:0%;transition:width 1.1s ease .3s;}

      /* CONTACT — colourful per-word */
      .contact{background:#0a0912;padding:100px 72px;text-align:center;position:relative;overflow:hidden;z-index:2;border-top:1px solid rgba(255,255,255,.06);}
      .contact::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--rose),var(--peach),var(--sun),var(--teal),var(--lav));}
      .contact::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 10% 50%,rgba(232,67,90,.1) 0%,transparent 70%),radial-gradient(ellipse 50% 70% at 90% 50%,rgba(139,110,232,.1) 0%,transparent 70%);pointer-events:none;}

      /* Multi-colour phrase — each word on same line, wraps only between words */
      .c-big{
        font-family:'Boldonse',cursive;
        font-size:clamp(28px,4.5vw,62px);
        line-height:1.15;
        letter-spacing:-1.5px;
        margin-bottom:16px;
        position:relative;z-index:1;
        display:flex;flex-wrap:wrap;justify-content:center;gap:0.2em;
      }
      .cw1{color:var(--rose);}
      .cw2{color:var(--peach);}
      .cw3{color:var(--sun);}
      .cw4{color:var(--sage);}
      .cw5{color:var(--sky);}
      .cw6{color:var(--lav);}
      .cw7{color:var(--teal);}

      .c-sub-text{font-size:16px;color:rgba(255,255,255,.45);margin-bottom:44px;position:relative;z-index:1;}
      .cbtn{display:inline-flex;align-items:center;gap:10px;background:white;color:#0a0912;text-decoration:none;padding:16px 38px;border-radius:100px;font-size:15px;font-weight:700;transition:transform .2s,box-shadow .2s;position:relative;z-index:1;}
      .cbtn:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 18px 40px rgba(0,0,0,.4);}
      .c-links{margin-top:24px;color:rgba(255,255,255,.35);font-size:13px;font-family:'DM Mono',monospace;position:relative;z-index:1;}
      .c-links a{text-decoration:none;transition:color .2s;}
      .c-links a:hover{color:rgba(255,255,255,.8);}

      .rev{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s;}
      .rev.in{opacity:1;transform:translateY(0);}
      @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

      @media(max-width:900px){
        .hero{grid-template-columns:1fr;padding:60px 28px;text-align:center;}
        .hero-right{display:none;}
        .hero-links{justify-content:center;}
        .hero-name{white-space:normal;}
        .sec,.div-wrap{padding:60px 28px;}
        .grid2{grid-template-columns:1fr;}
        .lang-grid{grid-template-columns:1fr 1fr;}
        .feat-inner{grid-template-columns:1fr;}
        .contact{padding:56px 28px;}
      }
    `}</style>

    <div ref={curRef}  className="cur" />
    <div ref={ringRef} className="cur-ring" />
    <FlowerBg mx={mouse.x} my={mouse.y} />

    {/* ════ HERO ════ */}
    <div className="hero">
      <div className="hero-left">
        <div className="status"><div className="sdot"/>open to opportunities</div>
        <h1 className="hero-name">
          {typed}<span className={`cursor-blink${phase==="done"?" done":""}`}/>
        </h1>
        <div className="hero-links">
          <a href="mailto:mariajgbrito@hotmail.com" className="hl hl-email">
            <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="white" strokeWidth="1.4"/><path d="M1 5l7 5 7-5" stroke="white" strokeWidth="1.4"/></svg>
            mariajgbrito@hotmail.com
          </a>
          <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" className="hl hl-li">
            <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.3"/><circle cx="5" cy="5.5" r="1" fill="currentColor"/><path d="M5 8v4M8.5 12V9.5c0-1 .7-1.5 1.5-1.5s1.5.5 1.5 1.5V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            LinkedIn
          </a>
          <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" className="hl hl-flores">
            <svg className="ico" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M8 4c-1 1.5-1 5 0 8M8 4c1 1.5 1 5 0 8M4 8h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
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
              <img src="/mj.webp" alt="Maria Brito"
                onError={(e)=>{(e.target as HTMLImageElement).style.display="none";const ph=(e.target as HTMLImageElement).nextElementSibling as HTMLElement;if(ph)ph.style.display="flex";}}
              />
              <div className="photo-ph" style={{display:"none"}}>
                <div className="photo-ini">MJB</div>
                <span>add mj.webp to public/</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* MARQUEE */}
    <div className="mq">
      <div className="mq-track">
        {["Educator","Designer","Co-founder","Tech Enthusiast","AI Enthusiast","Creative","Builder","Coimbra",
          "Educator","Designer","Co-founder","Tech Enthusiast","AI Enthusiast","Creative","Builder","Coimbra"].map((t,i)=>
          <div key={i} className="mq-item">{t}</div>)}
      </div>
    </div>

    {/* WORK */}
    <div className="div-wrap"><div className="div-word rev">Work.</div></div>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">career</div>
      <div className="grid2">

        {/* Flores — dark purple card */}
        <div className="card card-full card-flores ca" data-d="0">
          <div className="feat-badge"><div className="bdot"/>Latest venture</div>
          <div className="feat-inner">
            <div>
              <div className="wy"><div className="wdot" style={{background:"var(--lav)"}}/><span style={{color:"var(--lav)"}}>2025 to Present</span></div>
              <div className="wrole">Co-Founder and Freelance Web Developer</div>
              <div className="worg">Flores à Beira-Rio</div>
              <div className="site-links">
                <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" className="site-link">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 4c-1 1.5-1 5 0 8M8 4c1 1.5 1 5 0 8M4 8h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  floresabeirario.pt
                </a>
                <a href="https://status.floresabeirario.pt/N3F8L2Q7T5R9X1KP" target="_blank" rel="noreferrer" className="site-link">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8h6M5 5.5h6M5 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  Order Tracking Portal
                </a>
              </div>
              <p className="wdesc">Co-founded a flower preservation company and built its entire digital presence from scratch. Leads creative direction, branding, and all technical development.</p>
              <ul className="tech-list">
                <li>Built and deployed the brand website and a custom real-time order tracking portal, managing the full development lifecycle end to end.</li>
                <li>Designed backend logic using Google Sheets as a dynamic CMS for unique client IDs, private routing, and order statuses.</li>
                <li>Leveraged LLMs (Claude, ChatGPT, Gemini) with advanced prompting techniques to accelerate development and build production-ready features rapidly.</li>
                <li>Manages version control with GitHub and automated deployments via Vercel CI/CD.</li>
              </ul>
              <div className="wtags">
                <span className="tag tl">Entrepreneurship</span>
                <span className="tag tt">Web Dev</span>
                <span className="tag tl">AI Prototyping</span>
                <span className="tag ts">GitHub / Vercel</span>
                <span className="tag tl">Creative Direction</span>
              </div>
            </div>
            <div className="flores-vis">
              <svg viewBox="0 0 60 60" width="56" height="56">
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#8B6EE8" opacity=".9"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#4B9FE0" opacity=".85" transform="rotate(72 30 30)"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#8B6EE8" opacity=".9" transform="rotate(144 30 30)"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#4B9FE0" opacity=".85" transform="rotate(216 30 30)"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#8B6EE8" opacity=".9" transform="rotate(288 30 30)"/>
                <circle cx="30" cy="30" r="8" fill="white" opacity=".9"/>
                <circle cx="30" cy="30" r="4" fill="#F9C846" opacity=".9"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="card cr" data-d="80">
          <div className="wy"><div className="wdot"/>2023 to Present</div>
          <div className="wrole">Learning Coach</div>
          <div className="worg">TUMO Coimbra</div>
          <p className="wdesc">Supports teens 12 to 18 in self-directed learning across animation, filmmaking, music, and more. Guides, motivates, and tracks student progress.</p>
          <div className="wtags"><span className="tag tr">Youth Tech</span><span className="tag tp">Coaching</span></div>
        </div>

        <div className="card cp" data-d="140">
          <div className="wy"><div className="wdot" style={{background:"var(--peach)"}}/><span style={{color:"var(--peach)"}}>2023 to 2025</span></div>
          <div className="wrole">Info Desk</div>
          <div className="worg">TUMO Coimbra</div>
          <p className="wdesc">Manages student enquiries, check-in and check-out, registration and enrolment, database upkeep, and parent communication.</p>
          <div className="wtags"><span className="tag tp">Operations</span><span className="tag ty">Administration</span></div>
        </div>

        <div className="card cl" data-d="200">
          <div className="wy"><div className="wdot" style={{background:"var(--lav)"}}/><span style={{color:"var(--lav)"}}>2023 to 2025</span></div>
          <div className="wrole">Middle School Teacher</div>
          <div className="worg">Colégio de São José · Clonlara Program</div>
          <p className="wdesc">Teaches Mathematics and ICT within a personalised learning programme that fosters authenticity, autonomy, and joy in learning.</p>
          <div className="wtags"><span className="tag tl">Mathematics</span><span className="tag ts">ICT</span><span className="tag tl">Personalised Learning</span></div>
        </div>

        <div className="card ct" data-d="260">
          <div className="wy"><div className="wdot" style={{background:"var(--teal)"}}/><span style={{color:"var(--teal)"}}>2022 to 2024</span></div>
          <div className="wrole">Middle School Teacher</div>
          <div className="worg">Escola Tenente Valadim · ages 11 to 16</div>
          <p className="wdesc">Teaches Visual Education, Technology Education, and Design in Interactive Media to homeschooled students. Develops creative expression and aesthetic understanding through art and technology.</p>
          <div className="wtags"><span className="tag tt">Visual Education</span><span className="tag ts">Interactive Design</span></div>
        </div>

        <div className="card cs" data-d="320">
          <div className="wy"><div className="wdot" style={{background:"var(--sky)"}}/><span style={{color:"var(--sky)"}}>2022 to 2023</span></div>
          <div className="wrole">Middle School Teacher</div>
          <div className="worg">Agrupamento de Escolas Dr. Bissaya Barreto</div>
          <p className="wdesc">Teaches Information and Communication Technologies in a public school environment.</p>
          <div className="wtags"><span className="tag ts">ICT</span></div>
        </div>

        <div className="card cy card-full" data-d="380">
          <div className="wy"><div className="wdot" style={{background:"var(--sun)"}}/><span style={{color:"var(--sun)"}}>2017 to 2018</span></div>
          <div className="wrole">Monitor</div>
          <div className="worg">Universidade de Coimbra</div>
          <p className="wdesc">Serves as team monitor for a class of 20 students attending a Design and Multimedia summer course. Responsible for schedules, meals, attendance, and providing support throughout the classes.</p>
          <div className="wtags"><span className="tag ty">Mentoring</span><span className="tag tp">Design and Multimedia</span></div>
        </div>
      </div>
    </section>

    {/* INTERNSHIPS */}
    <div className="div-wrap"><div className="div-word rev">Internships.</div></div>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">experience abroad</div>
      <div className="grid2">
        <div className="card cr" data-d="0">
          <div className="wy"><div className="wdot"/>2021 to 2022 · Paris, France</div>
          <div className="wrole">Production and Creative Direction</div>
          <div className="worg">Julien Tavel, Fashion Photographer</div>
          <p className="wdesc">Works as production and photo crew assistant to an internationally recognised fashion photographer. Researches visual subjects, generates mood boards and conceptual ideas, and manages all supplies and equipment for set.</p>
          <div className="wtags"><span className="tag tr">Fashion Photography</span><span className="tag tp">Creative Research</span><span className="tag ty">Set Management</span></div>
        </div>
        <div className="card cs" data-d="140">
          <div className="wy"><div className="wdot" style={{background:"var(--sky)"}}/><span style={{color:"var(--sky)"}}>2021 · Athens, Greece</span></div>
          <div className="wrole">Graphic and Email Designer</div>
          <div className="worg">ShipLemon · DeliverBack</div>
          <p className="wdesc">Designs web graphics, email templates, and newsletter layouts for two tech startups. Builds mobile-friendly campaigns and collaborates across teams on marketing materials.</p>
          <div className="wtags"><span className="tag ts">Web Design</span><span className="tag tt">Email Design</span><span className="tag tp">Graphic Design</span></div>
        </div>
      </div>
    </section>

    {/* VOLUNTEERING */}
    <div className="div-wrap"><div className="div-word rev">Volunteering.</div></div>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">giving back</div>
      <div className="grid2">
        <div className="card card-full card-gold cy" data-d="0">
          <div className="feat-badge" style={{background:"rgba(245,196,48,.14)",border:"1.5px solid rgba(245,196,48,.3)",color:"var(--sun)"}}><div className="bdot" style={{background:"var(--sun)"}}/>Volunteer</div>
          <div className="feat-inner">
            <div>
              <div className="wy"><div className="wdot" style={{background:"var(--sun)"}}/><span style={{color:"var(--sun)"}}>2024 · Bulgaria</span></div>
              <div className="wrole">Summer Activities Creator</div>
              <div className="worg">SOS Children's Villages · Future World Association</div>
              <p className="wdesc">Creates and leads summer activities for children at SOS Children's Villages, bringing creativity, play, and warmth through hands-on projects and joyful learning.</p>
              <div className="wtags"><span className="tag ty">Children's Activities</span><span className="tag tp">Community Care</span><span className="tag tr">Creative Workshops</span></div>
            </div>
            <div className="vol-thumb">
              <img src="/bulgaria.webp" alt="Volunteering in Bulgaria"
                onError={(e)=>{(e.target as HTMLImageElement).style.display="none";const ph=(e.target as HTMLImageElement).nextElementSibling as HTMLElement;if(ph)ph.style.display="flex";}}
              />
              <div className="vol-ph" style={{display:"none"}}>
                <svg width="44" height="30" viewBox="0 0 44 30"><rect width="44" height="10" fill="#fff"/><rect y="10" width="44" height="10" fill="#009B74"/><rect y="20" width="44" height="10" fill="#D01C1F"/></svg>
                <span>bulgaria.webp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* EDUCATION */}
    <div className="div-wrap"><div className="div-word rev">Education.</div></div>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">academia</div>
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

    {/* SKILLS */}
    <div className="div-wrap"><div className="div-word rev">Skills.</div></div>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">toolkit</div>
      {SKILL_SECTIONS.map(section=>(
        <div key={section.label} className="skill-section">
          <div className="skill-section-label rev" style={{"--accent-color":section.color} as React.CSSProperties}>{section.label}</div>
          <div className="chips-row">
            {section.skills.map(s=>(
              <div key={s.name} className="chip">
                <div className="chip-logo" style={{background:s.bg}}>{s.abbr}</div>
                <div className="chip-name">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>

    {/* LANGUAGES */}
    <section className="sec">
      <div className="sec-label rev">communication</div>
      <div className="div-word rev" style={{marginBottom:"40px"}}>Languages.</div>
      <div className="lang-grid">
        {[
          {code:"PT",name:"Portuguese",cert:"Native",     w:100,color:"var(--rose)"},
          {code:"EN",name:"English",   cert:"Native / C2",w:98, color:"var(--sky)"},
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

    {/* CONTACT */}
    <div className="contact">
      <div className="c-big rev">
        <span className="cw1">The</span>
        <span className="cw2">best</span>
        <span className="cw3">projects</span>
        <span className="cw4">start</span>
        <span className="cw5">with</span>
        <span className="cw1">a</span>
        <span className="cw6">conversation.</span>
      </div>
      <p className="c-sub-text rev">Let's make something you'll be proud of.</p>
      <a href="mailto:mariajgbrito@hotmail.com" className="cbtn rev">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="#0a0912" strokeWidth="1.5"/><path d="M1 5l7 5 7-5" stroke="#0a0912" strokeWidth="1.5"/></svg>
        Get in touch
      </a>
      <div className="c-links">
        mariajgbrito@hotmail.com &nbsp;&middot;&nbsp;
        <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" style={{color:"var(--sky)"}}>linkedin.com/in/mariajbrito</a>
        &nbsp;&middot;&nbsp;
        <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" style={{color:"var(--sage)"}}>floresabeirario.pt</a>
      </div>
    </div>
  </>);
}
