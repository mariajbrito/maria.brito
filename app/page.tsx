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
    color: "#264DE4",
    skills: [
      { name: "HTML",         abbr: "HT", bg: "#E44D26" },
      { name: "CSS",          abbr: "CS", bg: "#264DE4" },
      { name: "AI Tools",     abbr: "AI", bg: "#7B2FBE" },
      { name: "Scratch",      abbr: "Sc", bg: "#4C97FF" },
      { name: "Prompting",    abbr: "Pt", bg: "#1A1A2E" },
      { name: "GitHub",       abbr: "Gh", bg: "#24292e" },
      { name: "Vercel",       abbr: "Vc", bg: "#000000" },
    ],
  },
  {
    label: "Creative",
    color: "#C0392B",
    skills: [
      { name: "Oil Painting",       abbr: "Op", bg: "#C0392B" },
      { name: "Flower Preservation",abbr: "Fp", bg: "#4BAF7E" },
      { name: "Clarinet",           abbr: "Cl", bg: "#6C5CE7" },
      { name: "MS Office",          abbr: "Ms", bg: "#D83B01" },
    ],
  },
];

/* Hand-drawn doodle SVGs — arrows, underlines, circles, squiggles */
const Doodles = () => (
  <svg className="doodle-layer" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice"
    style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:3,overflow:"visible"}}>
    {/* Curly arrow near name */}
    <path d="M 180 80 C 160 60 140 90 155 110 C 162 120 175 118 180 108" stroke="#E8435A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
    <path d="M 155 110 L 150 98 M 155 110 L 167 108" stroke="#E8435A" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".7"/>
    {/* Underline squiggle under "Educator" */}
    <path d="M 820 210 C 828 215 836 208 844 213 C 852 218 860 212 868 216 C 876 220 884 214 892 218" stroke="#F07048" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".65"/>
    {/* Circle around a word */}
    <ellipse cx="960" cy="150" rx="52" ry="24" stroke="#4BAF7E" strokeWidth="2" fill="none" strokeDasharray="5 3" opacity=".6" transform="rotate(-8 960 150)"/>
    {/* Star / asterisk */}
    <g transform="translate(100,280)" opacity=".5" stroke="#F5C430" strokeWidth="2.2" strokeLinecap="round">
      <line x1="0" y1="-12" x2="0" y2="12"/>
      <line x1="-12" y1="0" x2="12" y2="0"/>
      <line x1="-8" y1="-8" x2="8" y2="8"/>
      <line x1="8" y1="-8" x2="-8" y2="8"/>
    </g>
    {/* Squiggle underline left */}
    <path d="M 50 340 C 60 335 70 345 80 338 C 90 331 100 342 110 336" stroke="#8B6EE8" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".55"/>
    {/* Arrow pointing right */}
    <path d="M 1050 300 C 1070 295 1090 302 1110 298" stroke="#E8435A" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".6"/>
    <path d="M 1105 293 L 1112 298 L 1105 304" stroke="#E8435A" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".6"/>
  </svg>
);

export default function Home() {
  const curRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const canvasRef= useRef<HTMLCanvasElement>(null);
  const [typed, setTyped]   = useState("");
  const [phase, setPhase]   = useState<"typing"|"done">("typing");

  /* ── TYPEWRITER ── */
  useEffect(() => {
    const name = "Maria Brito";
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(name.slice(0, i));
      if (i >= name.length) { clearInterval(t); setPhase("done"); }
    }, 80);
    return () => clearInterval(t);
  }, []);

  /* ── SATURATED BLOB CANVAS ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    let mx = W / 2, my = H / 2;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

    const blobs = [
      { bx:12,  by:12,  rx:24, ry:30, color:"#F9C846", phase:0    },
      { bx:88,  by:8,   rx:22, ry:28, color:"#4BAF7E", phase:1.2  },
      { bx:4,   by:60,  rx:18, ry:24, color:"#E8435A", phase:2.4  },
      { bx:92,  by:65,  rx:20, ry:22, color:"#8B6EE8", phase:0.8  },
      { bx:50,  by:92,  rx:26, ry:15, color:"#F07048", phase:1.7  },
      { bx:68,  by:38,  rx:14, ry:18, color:"#2EBFAC", phase:3.0  },
      { bx:28,  by:85,  rx:16, ry:12, color:"#F9C846", phase:2.0  },
    ];

    let t = 0;
    let raf: number;

    const drawBlob = (cx:number,cy:number,rx:number,ry:number,color:string,wobble:number) => {
      ctx.beginPath();
      const pts = 10;
      for (let i = 0; i <= pts; i++) {
        const a = (i / pts) * Math.PI * 2;
        const wrx = rx * (1 + 0.22 * Math.sin(wobble + a * 2.3));
        const wry = ry * (1 + 0.18 * Math.cos(wobble * 1.4 + a * 1.8));
        const px = cx + wrx * Math.cos(a);
        const py = cy + wry * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(rx,ry));
      grad.addColorStop(0, color + "E0");  // much more opaque — was "CC", was "55"
      grad.addColorStop(0.6, color + "88");
      grad.addColorStop(1, color + "00");
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const frame = () => {
      t += 0.007;
      ctx.clearRect(0, 0, W, H);
      const mxN = (mx/W - 0.5)*2, myN = (my/H - 0.5)*2;
      blobs.forEach(b => {
        const depth = 0.04 + Math.abs(Math.sin(b.phase)) * 0.06;
        const bxPx = (b.bx/100)*W + mxN*W*depth;
        const byPx = (b.by/100)*H + myN*H*depth;
        drawBlob(bxPx,byPx,(b.rx/100)*W,(b.ry/100)*H,b.color,t+b.phase);
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { window.removeEventListener("resize",resize); cancelAnimationFrame(raf); };
  }, []);

  /* ── CURSOR ── */
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

  /* ── SCROLL REVEAL ── */
  useEffect(() => {
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
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el=>{
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){
        const t2=parseInt((e.target as HTMLElement).dataset.count??"0");let c2=0;
        const ti=setInterval(()=>{c2=Math.min(c2+1,t2);e.target.textContent=String(c2);if(c2>=t2)clearInterval(ti);},70);
        obs.unobserve(e.target);
      }});},{threshold:.3});
      obs.observe(el);
    });
    return ()=>io.disconnect();
  },[]);

  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Boldonse&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

      :root{
        --ink:#1A1410; --page:#FAF6EF;
        --rose:#E8435A; --peach:#F07048; --sun:#F5C430;
        --sage:#4BAF7E; --teal:#2EBFAC; --sky:#4B9FE0; --lav:#8B6EE8;
        --muted:#8A7F7A; --white:#FFFFFF; --border:rgba(0,0,0,.07);
      }
      *{margin:0;padding:0;box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      body{background:var(--page);color:var(--ink);font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;cursor:none;}

      .cur{width:10px;height:10px;background:var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .18s,height .18s;}
      .cur-ring{width:32px;height:32px;border:1.5px solid var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .18s,height .18s;opacity:.45;}

      #blob-canvas{position:fixed;inset:0;z-index:0;pointer-events:none;}

      /* ═══ HERO — two-column layout ═══ */
      .hero{
        min-height:100vh; position:relative; z-index:1;
        display:grid; grid-template-columns:1fr 1fr;
        align-items:center; padding:80px 72px;
        gap:40px; overflow:hidden;
      }

      .hero-left{position:relative;z-index:2;}

      .status{
        display:inline-flex;align-items:center;gap:8px;
        background:rgba(75,175,126,.15);border:1.5px solid rgba(75,175,126,.35);
        border-radius:100px;padding:7px 18px;
        font-size:12px;font-family:'DM Mono',monospace;color:var(--sage);
        margin-bottom:28px;animation:fadeUp .8s ease .2s both;
      }
      .sdot{width:7px;height:7px;background:var(--sage);border-radius:50%;animation:blink 2s ease infinite;flex-shrink:0;}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}

      .hero-name{
        font-family:'Boldonse',cursive;
        font-size:clamp(58px,7.5vw,110px);
        line-height:.9;letter-spacing:-3px;color:var(--ink);
        margin-bottom:32px;
      }
      .cursor-blink{display:inline-block;width:.08em;height:.88em;background:var(--rose);margin-left:3px;vertical-align:-.04em;animation:cblink .75s step-end infinite;}
      .cursor-blink.done{animation:none;opacity:0;}
      @keyframes cblink{0%,100%{opacity:1}50%{opacity:0}}

      .hero-links{display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp .8s ease .4s both;margin-bottom:48px;}
      .hl{display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:100px;font-size:13px;font-family:'DM Mono',monospace;text-decoration:none;font-weight:500;transition:transform .2s,box-shadow .2s;}
      .hl:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,0,0,.12);}
      .hl-email{background:var(--rose);color:white;}
      .hl-li{background:rgba(75,159,224,.13);border:1.5px solid rgba(75,159,224,.35);color:#1558a0;}
      .hl-flores{background:rgba(75,175,126,.11);border:1.5px solid rgba(75,175,126,.32);color:var(--sage);}
      .ico{width:14px;height:14px;flex-shrink:0;display:block;}

      /* Stats mini row in hero */
      .hero-stats{display:flex;gap:28px;animation:fadeUp .8s ease .55s both;}
      .hstat{text-align:left;}
      .hstat-num{font-family:'Boldonse',cursive;font-size:38px;line-height:1;}
      .hstat-lbl{font-size:11px;color:var(--muted);font-family:'DM Mono',monospace;}

      /* ── RIGHT SIDE: photo with orbiting pills ── */
      .hero-right{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;}

      /* Orbit container — pills rotate around center */
      .orbit-container{
        position:relative;
        width:380px;height:420px;
        flex-shrink:0;
        animation:fadeUp .9s ease .5s both;
      }

      /* The dashed ring */
      .orbit-ring-el{
        position:absolute;
        top:50%;left:50%;
        width:340px;height:340px;
        margin-left:-170px;margin-top:-170px;
        border-radius:50%;
        border:1.5px dashed rgba(0,0,0,.15);
        animation:spinRing 22s linear infinite;
      }
      @keyframes spinRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

      /* Each pill: positioned on the ring via top/left, counter-rotates */
      .pill-wrap{
        position:absolute;
        width:340px;height:340px;
        top:50%;left:50%;
        margin-left:-170px;margin-top:-170px;
        animation:spinRing 22s linear infinite;
        pointer-events:none;
      }
      .opill{
        position:absolute;
        background:rgba(255,255,255,.95);
        backdrop-filter:blur(8px);
        border:1.5px solid rgba(0,0,0,.1);
        border-radius:100px;
        padding:9px 18px;
        font-size:12px;font-family:'DM Mono',monospace;
        box-shadow:0 4px 16px rgba(0,0,0,.1);
        white-space:nowrap;
        animation:counterSpin 22s linear infinite;
        pointer-events:all;
      }
      /* Position at N/E/S/W of a 340px circle (radius 170) */
      /* N: top center */
      .opill:nth-child(1){
        top:0px; left:50%; transform:translateX(-50%);
        color:var(--rose); border-color:rgba(232,67,90,.3);
        animation:counterSpin 22s linear infinite;
      }
      /* E: right center */
      .opill:nth-child(2){
        top:50%; right:0px; transform:translateY(-50%);
        color:var(--peach); border-color:rgba(240,112,72,.3);
        animation:counterSpin 22s linear infinite;
      }
      /* S: bottom center */
      .opill:nth-child(3){
        bottom:0px; left:50%; transform:translateX(-50%);
        color:var(--sage); border-color:rgba(75,175,126,.3);
        animation:counterSpin 22s linear infinite;
      }
      /* W: left center */
      .opill:nth-child(4){
        top:50%; left:0px; transform:translateY(-50%);
        color:var(--lav); border-color:rgba(139,110,232,.3);
        animation:counterSpin 22s linear infinite;
      }
      @keyframes counterSpin{from{transform:translateX(-50%) rotate(0deg)}to{transform:translateX(-50%) rotate(-360deg)}}
      /* Override for E and W pills — different axis */
      .opill:nth-child(2){animation:counterSpinY 22s linear infinite;}
      .opill:nth-child(4){animation:counterSpinY2 22s linear infinite;}
      @keyframes counterSpinY {from{transform:translateY(-50%) rotate(0deg)}to{transform:translateY(-50%) rotate(-360deg)}}
      @keyframes counterSpinY2{from{transform:translateY(-50%) rotate(0deg)}to{transform:translateY(-50%) rotate(-360deg)}}

      /* Central photo */
      .orbit-photo{
        position:absolute;
        top:50%;left:50%;
        transform:translate(-50%,-50%);
        width:230px;height:270px;
      }
      .photo-ring{
        position:absolute;inset:0;
        border-radius:115px 115px 32px 32px;padding:3px;
        background:conic-gradient(var(--rose),var(--sun),var(--teal),var(--lav),var(--rose));
        animation:hshift 10s linear infinite;
        -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
        -webkit-mask-composite:xor;mask-composite:exclude;
      }
      @keyframes hshift{from{filter:hue-rotate(0)}to{filter:hue-rotate(360deg)}}
      .photo-inner{
        position:absolute;inset:7px;
        border-radius:107px 107px 26px 26px;
        overflow:hidden;background:#f7e8d8;
        display:flex;align-items:center;justify-content:center;
      }
      .photo-inner img{width:100%;height:100%;object-fit:cover;object-position:center top;}
      .photo-ph{display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);}
      .photo-ini{font-family:'Boldonse',cursive;font-size:48px;background:linear-gradient(135deg,var(--rose),var(--sun));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

      /* ═══ MARQUEE ═══ */
      .mq{overflow:hidden;padding:22px 0;background:var(--ink);position:relative;z-index:2;}
      .mq-track{display:flex;gap:0;animation:mqscroll 26s linear infinite;width:max-content;}
      .mq-item{font-family:'Boldonse',cursive;font-size:22px;color:var(--page);opacity:.9;white-space:nowrap;padding:0 44px;display:flex;align-items:center;gap:44px;}
      .mq-item::after{content:'';display:block;width:8px;height:8px;border-radius:50%;background:var(--rose);}
      @keyframes mqscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

      /* ═══ SECTIONS ═══ */
      .sec{padding:100px 72px;max-width:1240px;margin:0 auto;position:relative;z-index:2;}

      /* Section DIVIDER WORDS — now FILLED, not outline */
      .div-wrap{padding:0 72px 56px;max-width:1240px;margin:0 auto;position:relative;z-index:2;overflow:hidden;}
      .div-word{
        font-family:'Boldonse',cursive;
        font-size:clamp(52px,8vw,110px);
        line-height:.95;letter-spacing:-3px;
        color:var(--ink); /* FILLED */
        user-select:none;
      }
      .div-word.rev{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s;}
      .div-word.rev.in{opacity:1;transform:translateY(0);}

      .sec-label{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);text-transform:uppercase;letter-spacing:3px;margin-bottom:12px;}
      .sec-label.rev{opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s;}
      .sec-label.rev.in{opacity:1;transform:translateY(0);}
      .sec-title{font-family:'Boldonse',cursive;font-size:clamp(40px,5.5vw,68px);line-height:.95;letter-spacing:-2px;margin-bottom:52px;color:var(--ink);}
      .sec-title.rev{opacity:0;transform:translateY(20px);transition:opacity .65s .08s,transform .65s .08s;}
      .sec-title.rev.in{opacity:1;transform:translateY(0);}

      /* ── HAND-DRAWN DOODLE LAYER ── */
      .doodle-layer{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;overflow:visible;}

      /* ── CARDS ── */
      .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
      .card{
        background:var(--white);border:1.5px solid var(--border);border-radius:24px;
        padding:32px;position:relative;overflow:hidden;
        box-shadow:0 2px 16px rgba(0,0,0,.04);
        opacity:0;transform:translateY(28px);
        transition:border-color .25s,box-shadow .25s,transform .25s;
      }
      .card.in{opacity:1;transform:translateY(0);transition:opacity .6s ease,transform .6s ease,border-color .25s,box-shadow .25s;}
      .card:hover{transform:translateY(-6px)!important;box-shadow:0 20px 50px rgba(0,0,0,.1);border-color:rgba(0,0,0,.12);}
      .card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;opacity:0;transition:opacity .25s;border-radius:24px 24px 0 0;}
      .card:hover::before{opacity:1;}
      .cr::before{background:linear-gradient(90deg,var(--rose),var(--peach));}
      .cp::before{background:linear-gradient(90deg,var(--peach),var(--sun));}
      .cg::before{background:linear-gradient(90deg,var(--sage),var(--teal));}
      .cs::before{background:linear-gradient(90deg,var(--sky),var(--lav));}
      .cy::before{background:linear-gradient(90deg,var(--sun),var(--peach));}
      .cl::before{background:linear-gradient(90deg,var(--lav),var(--sky));}
      .ct::before{background:linear-gradient(90deg,var(--teal),var(--sage));}

      .card-full{grid-column:1/-1;}
      .card-spring{background:linear-gradient(135deg,#edfff6,#e2fdf0);border-color:rgba(75,175,126,.22);}
      .card-gold{background:linear-gradient(135deg,#fffaeb,#fff5d4);border-color:rgba(245,196,48,.28);}

      .feat-badge{display:inline-flex;align-items:center;gap:7px;border-radius:100px;padding:5px 14px;font-size:11px;font-family:'DM Mono',monospace;margin-bottom:14px;}
      .fb-green{background:rgba(75,175,126,.12);border:1.5px solid rgba(75,175,126,.28);color:var(--sage);}
      .fb-gold{background:rgba(245,196,48,.14);border:1.5px solid rgba(245,196,48,.38);color:#7A6000;}
      .bdot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
      .feat-inner{display:grid;grid-template-columns:1fr auto;gap:28px;align-items:start;}

      /* Flores flower vis */
      .flores-vis{width:100px;height:100px;border-radius:20px;background:linear-gradient(135deg,#d4f7e5,#a8edcc);border:1.5px solid rgba(75,175,126,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:fbounce 5s ease-in-out infinite;}
      @keyframes fbounce{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-9px) rotate(4deg)}}

      /* Tech bullet list inside Flores card */
      .tech-list{list-style:none;margin-top:14px;display:flex;flex-direction:column;gap:7px;}
      .tech-list li{font-size:13px;line-height:1.55;color:rgba(26,20,16,.7);padding-left:16px;position:relative;}
      .tech-list li::before{content:'';position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:var(--sage);}

      /* Volunteer thumb */
      .vol-thumb{width:176px;height:176px;flex-shrink:0;border-radius:18px;overflow:hidden;background:linear-gradient(135deg,#fdecc8,#fce4b0);display:flex;align-items:center;justify-content:center;}
      .vol-thumb img{width:100%;height:100%;object-fit:cover;}
      .vol-ph{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);}

      /* Card content */
      .wy{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:7px;display:flex;align-items:center;gap:7px;}
      .wdot{width:6px;height:6px;border-radius:50%;background:var(--rose);flex-shrink:0;}
      .wrole{font-family:'Boldonse',cursive;font-size:18px;margin-bottom:3px;color:var(--ink);line-height:1.2;}
      .worg{font-size:13px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:12px;}
      .wdesc{font-size:14px;line-height:1.74;color:rgba(26,20,16,.68);}
      .wtags{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;}
      .tag{font-family:'DM Mono',monospace;font-size:11px;padding:4px 10px;border-radius:100px;border:1.5px solid;font-weight:500;}
      .tr{color:#b82040;border-color:rgba(232,67,90,.3);background:rgba(232,67,90,.07);}
      .tp{color:#bf5020;border-color:rgba(240,112,72,.3);background:rgba(240,112,72,.07);}
      .ty{color:#8a6000;border-color:rgba(245,196,48,.45);background:rgba(245,196,48,.09);}
      .tg{color:#2c7a50;border-color:rgba(75,175,126,.3);background:rgba(75,175,126,.07);}
      .tt{color:#1a7a6e;border-color:rgba(46,191,172,.3);background:rgba(46,191,172,.07);}
      .ts{color:#1a5a9a;border-color:rgba(75,159,224,.3);background:rgba(75,159,224,.07);}
      .tl{color:#5230c8;border-color:rgba(139,110,232,.3);background:rgba(139,110,232,.07);}

      /* EDUCATION */
      .edu-tl{position:relative;padding-left:40px;}
      .edu-tl::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,var(--rose),var(--sun),var(--teal),var(--lav),var(--peach));border-radius:2px;}
      .edu-item{position:relative;margin-bottom:40px;opacity:0;transform:translateX(-18px);transition:opacity .55s,transform .55s;}
      .edu-item.in{opacity:1;transform:translateX(0);}
      .edu-item::before{content:'';position:absolute;left:-46px;top:7px;width:12px;height:12px;border-radius:50%;background:white;border:2.5px solid var(--rose);transition:background .25s;}
      .edu-item:nth-child(2)::before{border-color:var(--sun);}
      .edu-item:nth-child(3)::before{border-color:var(--teal);}
      .edu-item:nth-child(4)::before{border-color:var(--lav);}
      .edu-item:nth-child(5)::before{border-color:var(--peach);}
      .edu-item:hover::before{background:var(--rose);}
      .edu-yr{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:5px;}
      .edu-deg{font-family:'Boldonse',cursive;font-size:18px;margin-bottom:3px;color:var(--ink);line-height:1.15;}
      .edu-sch{font-size:13px;color:var(--muted);}

      /* SKILLS */
      .skill-section{margin-bottom:52px;}
      .skill-section-label{
        font-family:'Boldonse',cursive;font-size:22px;color:var(--ink);
        margin-bottom:18px;display:flex;align-items:center;gap:12px;
      }
      .skill-section-label::before{content:'';display:block;width:28px;height:3px;border-radius:2px;background:var(--accent-color,var(--rose));}
      .skill-section-label.rev{opacity:0;transform:translateX(-20px);transition:opacity .6s,transform .6s;}
      .skill-section-label.rev.in{opacity:1;transform:translateX(0);}
      .chips-row{display:flex;flex-wrap:wrap;gap:12px;}
      .chip{
        background:var(--white);border:1.5px solid var(--border);border-radius:16px;
        padding:16px 14px;display:flex;align-items:center;gap:12px;
        cursor:default;opacity:0;transform:translateY(18px) scale(.93);
        box-shadow:0 2px 10px rgba(0,0,0,.04);
        transition:border-color .2s,box-shadow .2s,transform .2s,opacity .4s ease;
        min-width:fit-content;
      }
      .chip.in{opacity:1;transform:translateY(0) scale(1);}
      .chip:hover{transform:scale(1.05) translateY(-2px)!important;box-shadow:0 10px 26px rgba(0,0,0,.1);border-color:rgba(232,67,90,.22);}
      .chip-logo{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'Boldonse',cursive;font-size:12px;color:white;flex-shrink:0;letter-spacing:0;}
      .chip-name{font-size:13px;font-family:'DM Mono',monospace;color:var(--ink);font-weight:500;}

      /* LANGUAGES */
      .lang-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
      .lang-card{background:var(--white);border:1.5px solid var(--border);border-radius:22px;padding:30px 26px;text-align:center;opacity:0;transform:translateY(20px);box-shadow:0 2px 12px rgba(0,0,0,.04);transition:transform .2s,box-shadow .2s;}
      .lang-card.in{opacity:1;transform:translateY(0);transition:opacity .55s ease,transform .55s ease,box-shadow .2s;}
      .lang-card:hover{transform:translateY(-5px)!important;box-shadow:0 14px 36px rgba(0,0,0,.09);}
      .llevel{font-family:'Boldonse',cursive;font-size:48px;margin-bottom:3px;}
      .lname{font-size:15px;color:var(--ink);font-weight:600;margin-bottom:2px;}
      .lcert{font-size:11px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:14px;}
      .lbar{height:5px;background:rgba(0,0,0,.07);border-radius:3px;overflow:hidden;}
      .lf{height:100%;border-radius:3px;width:0%;transition:width 1.1s ease .3s;}

      /* CONTACT */
      .contact{background:var(--ink);padding:100px 72px;text-align:center;position:relative;overflow:hidden;z-index:2;}
      .contact::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--rose),var(--peach),var(--sun),var(--teal),var(--lav));}
      .contact::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 10% 50%,rgba(232,67,90,.14) 0%,transparent 70%),radial-gradient(ellipse 50% 70% at 90% 50%,rgba(75,175,126,.12) 0%,transparent 70%);pointer-events:none;}
      .c-big{font-family:'Boldonse',cursive;font-size:clamp(34px,5.5vw,68px);line-height:.95;letter-spacing:-2px;margin-bottom:16px;color:white;position:relative;z-index:1;}
      .c-big span{background:linear-gradient(115deg,var(--rose),var(--peach),var(--sun));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
      .c-sub-text{font-size:16px;color:rgba(255,255,255,.5);font-family:'Plus Jakarta Sans',sans-serif;margin-bottom:44px;position:relative;z-index:1;}
      .cbtn{display:inline-flex;align-items:center;gap:10px;background:white;color:var(--ink);text-decoration:none;padding:16px 38px;border-radius:100px;font-size:15px;font-weight:700;transition:transform .2s,box-shadow .2s;position:relative;z-index:1;}
      .cbtn:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 18px 40px rgba(0,0,0,.35);}
      .c-links{margin-top:24px;color:rgba(255,255,255,.4);font-size:13px;font-family:'DM Mono',monospace;position:relative;z-index:1;}
      .c-links a{text-decoration:none;transition:color .2s;}
      .c-links a:hover{color:rgba(255,255,255,.8);}

      /* HAND DOODLES scattered */
      .doodle-hero{position:absolute;inset:0;pointer-events:none;z-index:3;width:100%;height:100%;overflow:visible;}

      @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

      @media(max-width:900px){
        .hero{grid-template-columns:1fr;padding:60px 28px;text-align:center;}
        .hero-right{display:none;}
        .hero-stats{justify-content:center;}
        .hero-links{justify-content:center;}
        .sec,.div-wrap{padding:60px 28px;}
        .grid2{grid-template-columns:1fr;}
        .lang-grid{grid-template-columns:1fr 1fr;}
        .feat-inner{grid-template-columns:1fr;}
        .contact{padding:56px 28px;}
      }
    `}</style>

    <div ref={curRef}  className="cur" />
    <div ref={ringRef} className="cur-ring" />
    <canvas ref={canvasRef} id="blob-canvas" />

    {/* ═══════════ HERO ═══════════ */}
    <div className="hero">

      {/* Hand doodles scattered on hero */}
      <svg className="doodle-hero" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        {/* Curly arrow top-left */}
        <path d="M 90 120 C 70 95 50 130 68 152 C 76 163 92 160 96 148" stroke="#E8435A" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".55"/>
        <path d="M 68 152 L 62 138 M 68 152 L 82 150" stroke="#E8435A" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".55"/>
        {/* Squiggle underline bottom-left area */}
        <path d="M 60 580 C 72 574 84 582 96 576 C 108 570 120 578 132 572" stroke="#8B6EE8" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".5"/>
        {/* Star */}
        <g transform="translate(1100,120)" stroke="#F5C430" strokeWidth="2.2" strokeLinecap="round" opacity=".6">
          <line x1="0" y1="-11" x2="0" y2="11"/>
          <line x1="-11" y1="0" x2="11" y2="0"/>
          <line x1="-7" y1="-7" x2="7" y2="7"/>
          <line x1="7" y1="-7" x2="-7" y2="7"/>
        </g>
        {/* Arrow right side */}
        <path d="M 1060 380 C 1080 374 1100 382 1124 377" stroke="#F07048" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".5"/>
        <path d="M 1119 371 L 1126 377 L 1119 383" stroke="#F07048" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/>
        {/* Circle / ring bottom center */}
        <ellipse cx="600" cy="640" rx="42" ry="18" stroke="#4BAF7E" strokeWidth="1.8" fill="none" strokeDasharray="5 4" opacity=".45" transform="rotate(-5 600 640)"/>
        {/* Small cross */}
        <g transform="translate(200,580)" stroke="#2EBFAC" strokeWidth="2" strokeLinecap="round" opacity=".5">
          <line x1="-8" y1="0" x2="8" y2="0"/>
          <line x1="0" y1="-8" x2="0" y2="8"/>
        </g>
      </svg>

      {/* LEFT */}
      <div className="hero-left">
        <div className="status">
          <div className="sdot" />
          open to opportunities
        </div>

        <h1 className="hero-name">
          {typed}
          <span className={`cursor-blink${phase === "done" ? " done" : ""}`} />
        </h1>

        <div className="hero-links">
          <a href="mailto:mariajgbrito@hotmail.com" className="hl hl-email">
            <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="white" strokeWidth="1.4"/><path d="M1 5l7 5 7-5" stroke="white" strokeWidth="1.4"/></svg>
            mariajgbrito@hotmail.com
          </a>
          <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" className="hl hl-li">
            <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="3" stroke="#1558a0" strokeWidth="1.3"/><circle cx="5" cy="5.5" r="1" fill="#1558a0"/><path d="M5 8v4M8.5 12V9.5c0-1 .7-1.5 1.5-1.5s1.5.5 1.5 1.5V12" stroke="#1558a0" strokeWidth="1.3" strokeLinecap="round"/></svg>
            LinkedIn
          </a>
          <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" className="hl hl-flores">
            <svg className="ico" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#4BAF7E" strokeWidth="1.4"/><path d="M8 4c-1 1.5-1 5 0 8M8 4c1 1.5 1 5 0 8M4 8h8" stroke="#4BAF7E" strokeWidth="1.2" strokeLinecap="round"/></svg>
            floresabeirario.pt
          </a>
        </div>

        <div className="hero-stats">
          <div className="hstat">
            <div className="hstat-num" style={{color:"var(--rose)"}} data-count="5">0</div>
            <div className="hstat-lbl">years teaching</div>
          </div>
          <div style={{width:"1px",background:"rgba(0,0,0,.1)"}} />
          <div className="hstat">
            <div className="hstat-num" style={{color:"var(--sage)"}} data-count="1">0</div>
            <div className="hstat-lbl">company co-founded</div>
          </div>
          <div style={{width:"1px",background:"rgba(0,0,0,.1)"}} />
          <div className="hstat">
            <div className="hstat-num" style={{color:"var(--lav)"}} data-count="3">0</div>
            <div className="hstat-lbl">countries worked in</div>
          </div>
        </div>
      </div>

      {/* RIGHT — orbit + photo */}
      <div className="hero-right">
        <div className="orbit-container">
          {/* Dashed ring */}
          <div className="orbit-ring-el" />

          {/* Pills that orbit */}
          <div className="pill-wrap">
            <div className="opill">Educator</div>
            <div className="opill">Designer</div>
            <div className="opill">Co-founder</div>
            <div className="opill">Tech Enthusiast</div>
          </div>

          {/* Photo — static */}
          <div className="orbit-photo">
            <div className="photo-ring" />
            <div className="photo-inner">
              <img src="/mj.webp" alt="Maria Brito"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const ph = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if (ph) ph.style.display = "flex";
                }}
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

    {/* ═══════════ MARQUEE (no "Maria Brito") ═══════════ */}
    <div className="mq">
      <div className="mq-track">
        {["Educator","Designer","Co-founder","Tech Enthusiast","Coimbra","AI Enthusiast","Creative","Builder",
          "Educator","Designer","Co-founder","Tech Enthusiast","Coimbra","AI Enthusiast","Creative","Builder"].map((t,i)=>
          <div key={i} className="mq-item">{t}</div>)}
      </div>
    </div>

    {/* ═══════════ WORK ═══════════ */}
    <div className="div-wrap" style={{position:"relative"}}>
      {/* Doodle on section title */}
      <svg style={{position:"absolute",top:"-10px",left:"72px",pointerEvents:"none",zIndex:4,overflow:"visible"}} width="300" height="80">
        <path d="M 10 60 C 30 55 50 63 70 58 C 90 53 110 61 130 56" stroke="#E8435A" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".6"/>
        <path d="M 200 30 C 185 20 175 40 188 50" stroke="#F5C430" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".55"/>
        <path d="M 188 50 L 183 42 M 188 50 L 196 46" stroke="#F5C430" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".55"/>
      </svg>
      <div className="div-word rev">Work.</div>
    </div>

    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">career</div>
      <div className="grid2">

        {/* Flores — rich card */}
        <div className="card card-full card-spring cg" data-d="0">
          <div className="feat-badge fb-green"><div className="bdot" style={{background:"var(--sage)"}}/>Latest venture</div>
          <div className="feat-inner">
            <div>
              <div className="wy"><div className="wdot" style={{background:"var(--sage)"}}/><span style={{color:"var(--sage)"}}>2025 to Present</span></div>
              <div className="wrole">Co-Founder and Freelance Web Developer</div>
              <div className="worg">Flores à Beira-Rio · floresabeirario.pt · status.floresabeirario.pt</div>
              <p className="wdesc">Co-founded a flower preservation company and built its entire digital presence from the ground up. Leads creative direction, branding, and all technical development.</p>
              <ul className="tech-list">
                <li>Built and deployed the brand website and a custom real-time order tracking portal from scratch, managing the full development lifecycle.</li>
                <li>Designed backend logic using Google Sheets as a dynamic CMS for client IDs, private routing, and order statuses.</li>
                <li>Leveraged LLMs (Claude, ChatGPT, Gemini) with advanced prompting to accelerate development and build production-ready features rapidly.</li>
                <li>Manages version control with GitHub and automated deployments via Vercel CI/CD.</li>
              </ul>
              <div className="wtags">
                <span className="tag tg">Entrepreneurship</span>
                <span className="tag tt">Web Dev</span>
                <span className="tag tg">Vibe Coding</span>
                <span className="tag tl">AI Prototyping</span>
                <span className="tag ts">GitHub / Vercel</span>
                <span className="tag tg">Creative Direction</span>
              </div>
            </div>
            <div className="flores-vis">
              <svg viewBox="0 0 60 60" width="56" height="56">
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#4CAF82" opacity=".9"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#3EC9B6" opacity=".85" transform="rotate(72 30 30)"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#4CAF82" opacity=".9"  transform="rotate(144 30 30)"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#3EC9B6" opacity=".85" transform="rotate(216 30 30)"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#4CAF82" opacity=".9"  transform="rotate(288 30 30)"/>
                <circle cx="30" cy="30" r="8" fill="white" opacity=".95"/>
                <circle cx="30" cy="30" r="4" fill="#F9C846" opacity=".9"/>
              </svg>
            </div>
          </div>
        </div>

        {/* TUMO Learning Coach */}
        <div className="card cr" data-d="80">
          <div className="wy"><div className="wdot"/>2023 to Present</div>
          <div className="wrole">Learning Coach</div>
          <div className="worg">TUMO Coimbra</div>
          <p className="wdesc">Supports teens 12 to 18 in self-directed learning across animation, filmmaking, music, robotics, and more. Guides, motivates, and tracks student progress.</p>
          <div className="wtags">
            <span className="tag tr">Youth Tech</span>
            <span className="tag tp">Coaching</span>
            <span className="tag tl">Robotics</span>
          </div>
        </div>

        {/* TUMO Info Desk */}
        <div className="card cp" data-d="140">
          <div className="wy"><div className="wdot" style={{background:"var(--peach)"}}/><span style={{color:"var(--peach)"}}>2023 to 2025</span></div>
          <div className="wrole">Info Desk</div>
          <div className="worg">TUMO Coimbra</div>
          <p className="wdesc">Manages student enquiries, check-in and check-out, registration and enrolment, database upkeep, and parent communication.</p>
          <div className="wtags">
            <span className="tag tp">Operations</span>
            <span className="tag ty">Administration</span>
          </div>
        </div>

        {/* Clonlara */}
        <div className="card cl" data-d="200">
          <div className="wy"><div className="wdot" style={{background:"var(--lav)"}}/><span style={{color:"var(--lav)"}}>2023 to 2025</span></div>
          <div className="wrole">Middle School Teacher</div>
          <div className="worg">Colégio de São José · Clonlara Program</div>
          <p className="wdesc">Teaches Mathematics and ICT within a personalised learning programme that fosters authenticity, autonomy, and joy in learning.</p>
          <div className="wtags">
            <span className="tag tl">Mathematics</span>
            <span className="tag ts">ICT</span>
            <span className="tag tl">Personalised Learning</span>
          </div>
        </div>

        {/* Escola Tenente Valadim */}
        <div className="card ct" data-d="260">
          <div className="wy"><div className="wdot" style={{background:"var(--teal)"}}/><span style={{color:"var(--teal)"}}>2022 to 2024</span></div>
          <div className="wrole">Middle School Teacher</div>
          <div className="worg">Escola Tenente Valadim · ages 11 to 16</div>
          <p className="wdesc">Teaches Visual Education, Technology Education, and Design in Interactive Media to homeschooled students. Develops creative expression and aesthetic understanding through art and technology.</p>
          <div className="wtags">
            <span className="tag tt">Visual Education</span>
            <span className="tag ts">Interactive Design</span>
          </div>
        </div>

        {/* Bissaya Barreto */}
        <div className="card cs" data-d="320">
          <div className="wy"><div className="wdot" style={{background:"var(--sky)"}}/><span style={{color:"var(--sky)"}}>2022 to 2023</span></div>
          <div className="wrole">Middle School Teacher</div>
          <div className="worg">Agrupamento de Escolas Dr. Bissaya Barreto</div>
          <p className="wdesc">Teaches Information and Communication Technologies in a public school environment.</p>
          <div className="wtags"><span className="tag ts">ICT</span></div>
        </div>

        {/* Monitor UC */}
        <div className="card cy card-full" data-d="380">
          <div className="wy"><div className="wdot" style={{background:"var(--sun)"}}/><span style={{color:"#8a6000"}}>2017 to 2018</span></div>
          <div className="wrole">Monitor</div>
          <div className="worg">Universidade de Coimbra</div>
          <p className="wdesc">Serves as team monitor for a class of 20 students attending a Design and Multimedia summer course. Responsible for schedules, meals, attendance, and providing support throughout the classes.</p>
          <div className="wtags">
            <span className="tag ty">Mentoring</span>
            <span className="tag tp">Design and Multimedia</span>
          </div>
        </div>

      </div>
    </section>

    {/* ═══════════ INTERNSHIPS ═══════════ */}
    <div className="div-wrap" style={{position:"relative"}}>
      <svg style={{position:"absolute",top:"0",right:"72px",pointerEvents:"none",zIndex:4,overflow:"visible"}} width="180" height="60">
        <path d="M 20 40 C 40 34 60 42 80 37 C 100 32 120 40 140 35" stroke="#8B6EE8" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".55"/>
        <g transform="translate(160,20)" stroke="#F5C430" strokeWidth="2" strokeLinecap="round" opacity=".55">
          <line x1="0" y1="-8" x2="0" y2="8"/>
          <line x1="-8" y1="0" x2="8" y2="0"/>
          <line x1="-5" y1="-5" x2="5" y2="5"/>
          <line x1="5" y1="-5" x2="-5" y2="5"/>
        </g>
      </svg>
      <div className="div-word rev">Internships.</div>
    </div>

    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">experience abroad</div>
      <div className="grid2">
        <div className="card cr" data-d="0">
          <div className="wy"><div className="wdot"/>2021 to 2022 · Paris, France</div>
          <div className="wrole">Production and Creative Direction</div>
          <div className="worg">Julien Tavel, Fashion Photographer</div>
          <p className="wdesc">Works as production and photo crew assistant to an internationally recognised fashion photographer. Researches visual subjects, generates mood boards and conceptual ideas, and manages all supplies and equipment for set.</p>
          <div className="wtags">
            <span className="tag tr">Fashion Photography</span>
            <span className="tag tp">Creative Research</span>
            <span className="tag ty">Set Management</span>
          </div>
        </div>
        <div className="card cs" data-d="140">
          <div className="wy"><div className="wdot" style={{background:"var(--sky)"}}/><span style={{color:"var(--sky)"}}>2021 · Athens, Greece</span></div>
          <div className="wrole">Graphic and Email Designer</div>
          <div className="worg">ShipLemon · DeliverBack</div>
          <p className="wdesc">Designs web graphics, email templates, and newsletter layouts for two tech startups. Builds mobile-friendly campaigns and collaborates across teams on marketing materials.</p>
          <div className="wtags">
            <span className="tag ts">Web Design</span>
            <span className="tag tt">Email Design</span>
            <span className="tag tp">Graphic Design</span>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════════ VOLUNTEERING ═══════════ */}
    <div className="div-wrap"><div className="div-word rev">Volunteering.</div></div>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">giving back</div>
      <div className="grid2">
        <div className="card card-full card-gold cy" data-d="0">
          <div className="feat-badge fb-gold"><div className="bdot" style={{background:"var(--sun)"}}/>Volunteer</div>
          <div className="feat-inner">
            <div>
              <div className="wy"><div className="wdot" style={{background:"var(--sun)"}}/><span style={{color:"#7A6000"}}>2024 · Bulgaria</span></div>
              <div className="wrole">Summer Activities Creator</div>
              <div className="worg">SOS Children's Villages · Future World Association</div>
              <p className="wdesc">Creates and leads summer activities for children at SOS Children's Villages, bringing creativity, play, and warmth through hands-on projects and joyful learning.</p>
              <div className="wtags">
                <span className="tag ty">Children's Activities</span>
                <span className="tag tp">Community Care</span>
                <span className="tag tr">Creative Workshops</span>
              </div>
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

    {/* ═══════════ EDUCATION ═══════════ */}
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

    {/* ═══════════ SKILLS ═══════════ */}
    <div className="div-wrap"><div className="div-word rev">Skills.</div></div>
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">toolkit</div>
      {SKILL_SECTIONS.map(section=>(
        <div key={section.label} className="skill-section">
          <div className="skill-section-label rev" style={{"--accent-color":section.color} as React.CSSProperties}>
            {section.label}
          </div>
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

    {/* ═══════════ LANGUAGES ═══════════ */}
    <section className="sec">
      <div className="sec-label rev">communication</div>
      <div className="sec-title rev">Languages.</div>
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

    {/* ═══════════ CONTACT ═══════════ */}
    <div className="contact">
      <div className="c-big rev">
        The best projects start with a <span>conversation.</span>
      </div>
      <p className="c-sub-text rev">Let's make something you'll be proud of.</p>
      <a href="mailto:mariajgbrito@hotmail.com" className="cbtn rev">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="var(--ink)" strokeWidth="1.5"/><path d="M1 5l7 5 7-5" stroke="var(--ink)" strokeWidth="1.5"/></svg>
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
