"use client";
import { useEffect, useRef } from "react";

/* ── Skill logo paths (brand SVG approximations, no emoji) ── */
const SKILLS = [
  { name: "Illustrator", abbr: "Ai", bg: "#FF7C00", fg: "#fff" },
  { name: "InDesign",    abbr: "Id", bg: "#FF3366", fg: "#fff" },
  { name: "Photoshop",   abbr: "Ps", bg: "#31A8FF", fg: "#fff" },
  { name: "Premiere",    abbr: "Pr", bg: "#9999FF", fg: "#fff" },
  { name: "Lightroom",   abbr: "Lr", bg: "#31A8FF", fg: "#fff" },
  { name: "HTML",        abbr: "HT", bg: "#E44D26", fg: "#fff" },
  { name: "CSS",         abbr: "CS", bg: "#264DE4", fg: "#fff" },
  { name: "MS Office",   abbr: "Ms", bg: "#D83B01", fg: "#fff" },
  { name: "AI Tools",    abbr: "AI", bg: "#7B2FBE", fg: "#fff" },
  { name: "Scratch",     abbr: "Sc", bg: "#4C97FF", fg: "#fff" },
  { name: "Prompting",   abbr: "Pt", bg: "#1A1A2E", fg: "#fff" },
  { name: "Oil Painting",abbr: "Op", bg: "#C0392B", fg: "#fff" },
  { name: "Web Design",  abbr: "Wd", bg: "#00B894", fg: "#fff" },
  { name: "Clarinet",    abbr: "Cl", bg: "#6C5CE7", fg: "#fff" },
];

/* ── SVG petal shapes ── */
const PETALS = [
  `<svg viewBox="0 0 24 32"><path d="M12 2C16 8 18 16 12 30C6 16 8 8 12 2Z" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 28 28"><ellipse cx="14" cy="5" rx="4.5" ry="6" fill="currentColor" transform="rotate(0 14 14)"/><ellipse cx="14" cy="5" rx="4.5" ry="6" fill="currentColor" transform="rotate(72 14 14)"/><ellipse cx="14" cy="5" rx="4.5" ry="6" fill="currentColor" transform="rotate(144 14 14)"/><ellipse cx="14" cy="5" rx="4.5" ry="6" fill="currentColor" transform="rotate(216 14 14)"/><ellipse cx="14" cy="5" rx="4.5" ry="6" fill="currentColor" transform="rotate(288 14 14)"/><circle cx="14" cy="14" r="4" fill="white" opacity=".7"/></svg>`,
  `<svg viewBox="0 0 22 28"><path d="M11 1 C15 6 16 14 11 27 C6 14 7 6 11 1Z" fill="currentColor" opacity=".9"/></svg>`,
  `<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="4" fill="currentColor" transform="rotate(0 12 12)"/><circle cx="12" cy="5" r="4" fill="currentColor" transform="rotate(60 12 12)"/><circle cx="12" cy="5" r="4" fill="currentColor" transform="rotate(120 12 12)"/><circle cx="12" cy="5" r="4" fill="currentColor" transform="rotate(180 12 12)"/><circle cx="12" cy="5" r="4" fill="currentColor" transform="rotate(240 12 12)"/><circle cx="12" cy="5" r="4" fill="currentColor" transform="rotate(300 12 12)"/><circle cx="12" cy="12" r="3.5" fill="white" opacity=".7"/></svg>`,
];
const PETAL_COLORS = ["#F2607A","#FF8C61","#F9C846","#4CAF82","#A78BFA","#3EC9B6","#FF6B9D"];

export default function Home() {
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ── PETALS ── */
    const layer = document.getElementById("pl");
    if (layer) {
      for (let i = 0; i < 22; i++) {
        const d = document.createElement("div");
        d.className = "petal";
        const size = 13 + Math.random() * 16;
        d.style.cssText = `left:${Math.random()*100}vw;width:${size}px;height:${size}px;
          color:${PETAL_COLORS[i % PETAL_COLORS.length]};
          animation-duration:${10+Math.random()*14}s;
          animation-delay:${-Math.random()*18}s;
          opacity:${.25+Math.random()*.4};`;
        d.innerHTML = PETALS[i % PETALS.length];
        layer.appendChild(d);
      }
    }

    /* ── CURSOR ── */
    let mx=0,my=0,rx=0,ry=0;
    let raf:number;
    const mm=(e:MouseEvent)=>{
      mx=e.clientX;my=e.clientY;
      const px=(e.clientX/innerWidth-.5)*18,py=(e.clientY/innerHeight-.5)*18;
      [["b1",px,py],["b2",-px*.8,-py*.8],["b3",px*.5,py*.5]].forEach(([id,x,y])=>{
        const el=document.getElementById(id as string);
        if(el)(el as HTMLElement).style.transform=`translate(${x}px,${y}px)`;
      });
    };
    const tick=()=>{
      if(curRef.current){curRef.current.style.left=mx+"px";curRef.current.style.top=my+"px";}
      rx+=(mx-rx)*.14;ry+=(my-ry)*.14;
      if(ringRef.current){ringRef.current.style.left=rx+"px";ringRef.current.style.top=ry+"px";}
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    document.addEventListener("mousemove",mm);
    const grow=()=>{if(curRef.current){curRef.current.style.width="18px";curRef.current.style.height="18px";}if(ringRef.current){ringRef.current.style.width="52px";ringRef.current.style.height="52px";}};
    const shrink=()=>{if(curRef.current){curRef.current.style.width="10px";curRef.current.style.height="10px";}if(ringRef.current){ringRef.current.style.width="32px";ringRef.current.style.height="32px";}};
    document.querySelectorAll("a,button,.card,.chip").forEach(el=>{el.addEventListener("mouseenter",grow);el.addEventListener("mouseleave",shrink);});

    /* ── SCROLL REVEAL ── */
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");}});
    },{threshold:0.08});
    document.querySelectorAll(".rev,.rev-l,.rev-r,.rev-up,.edu-item,.chip").forEach(el=>io.observe(el));

    /* ── CARD delay ── */
    document.querySelectorAll<HTMLElement>(".card").forEach(c=>{
      const ms=parseFloat(c.dataset.d??"0");
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add("in"),ms);obs.unobserve(e.target);}});},{threshold:0.07});
      obs.observe(c);
    });

    /* ── LANG BARS ── */
    document.querySelectorAll<HTMLElement>(".lang-card").forEach(lc=>{
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){
        e.target.classList.add("in");
        (e.target as HTMLElement).querySelectorAll<HTMLElement>(".lf").forEach(b=>{setTimeout(()=>{b.style.width=(b.dataset.w??"0")+"%";},400);});
        obs.unobserve(e.target);
      }});},{threshold:0.1});
      obs.observe(lc);
    });

    /* ── COUNTERS ── */
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el=>{
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){
        const t=parseInt((e.target as HTMLElement).dataset.count??"0");
        let c=0;const ti=setInterval(()=>{c=Math.min(c+1,t);e.target.textContent=String(c);if(c>=t)clearInterval(ti);},70);
        obs.unobserve(e.target);
      }});},{threshold:.3});
      obs.observe(el);
    });

    return ()=>{document.removeEventListener("mousemove",mm);cancelAnimationFrame(raf);io.disconnect();};
  },[]);

  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Boldonse&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

      :root{
        --ink:   #1A1410;
        --page:  #FFFBF4;
        --cream: #F5EDE0;
        --rose:  #E8435A;
        --peach: #F07048;
        --sun:   #F5C430;
        --sage:  #4BAF7E;
        --teal:  #2EBFAC;
        --sky:   #4B9FE0;
        --lav:   #8B6EE8;
        --muted: #9A8C88;
        --card:  #FFFFFF;
        --border:rgba(0,0,0,.07);
      }

      *{margin:0;padding:0;box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      body{background:var(--page);color:var(--ink);font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;cursor:none;}

      /* CURSOR */
      .cur{width:10px;height:10px;background:var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .18s,height .18s;}
      .cur-ring{width:32px;height:32px;border:1.5px solid var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .18s,height .18s;opacity:.5;}

      /* PETALS */
      #pl{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
      .petal{position:absolute;top:-50px;animation:pfall linear infinite;will-change:transform;}
      .petal svg{width:100%;height:100%;display:block;}
      @keyframes pfall{0%{transform:translateY(-50px) rotate(0deg) translateX(0);opacity:0;}7%{opacity:1;}90%{opacity:.6;}100%{transform:translateY(110vh) rotate(560deg) translateX(55px);opacity:0;}}

      /* ═══ HERO ═══ */
      .hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;position:relative;overflow:hidden;background:var(--page);}

      .blob{position:absolute;border-radius:50%;filter:blur(100px);opacity:.18;animation:bpulse 8s ease-in-out infinite alternate;pointer-events:none;z-index:0;}
      .b1{width:520px;height:520px;background:var(--rose);top:-160px;left:-100px;}
      .b2{width:400px;height:400px;background:var(--sun);bottom:-100px;right:-60px;animation-delay:-3.5s;}
      .b3{width:260px;height:260px;background:var(--teal);top:38%;left:44%;animation-delay:-1.8s;}
      @keyframes bpulse{from{transform:scale(1)}to{transform:scale(1.25) rotate(20deg)}}

      .hero-l{padding:80px 64px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2;}
      .hero-r{position:relative;display:flex;align-items:center;justify-content:center;z-index:2;overflow:visible;}

      /* STATUS */
      .status{display:inline-flex;align-items:center;gap:8px;background:rgba(75,175,126,.11);border:1.5px solid rgba(75,175,126,.3);border-radius:100px;padding:6px 16px;font-size:12px;font-family:'DM Mono',monospace;color:var(--sage);margin-bottom:28px;width:fit-content;animation:fadeUp .8s ease both;}
      .sdot{width:7px;height:7px;background:var(--sage);border-radius:50%;animation:blink 2s ease infinite;flex-shrink:0;}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}

      /* BIG NAME */
      .hero-name{font-family:'Boldonse',cursive;font-size:clamp(68px,9vw,118px);line-height:.9;letter-spacing:-2px;margin-bottom:32px;color:var(--ink);animation:fadeUp .7s ease .1s both;}
      .name-grad{display:block;background:linear-gradient(115deg,var(--rose),var(--peach),var(--sun));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

      /* ORBITING ROLE PILLS */
      .orbit-wrap{position:relative;width:300px;height:370px;flex-shrink:0;}
      .orbit-ring{position:absolute;border-radius:50%;border:1.5px dashed rgba(0,0,0,.1);animation:spin linear infinite;}
      .or1{width:360px;height:360px;top:50%;left:50%;transform:translate(-50%,-50%);animation-duration:18s;}
      .or2{width:280px;height:280px;top:50%;left:50%;transform:translate(-50%,-50%);animation-duration:14s;animation-direction:reverse;}
      @keyframes spin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}

      .orbit-pill{
        position:absolute;white-space:nowrap;
        background:white;border:1.5px solid rgba(0,0,0,.08);border-radius:100px;
        padding:7px 16px;font-size:11.5px;font-family:'DM Mono',monospace;
        box-shadow:0 3px 14px rgba(0,0,0,.07);
        top:50%;left:50%;
        transform-origin:0 0;
        animation:counter-spin linear infinite;
      }
      /* Each pill offset along the ring */
      .op1{--angle:0deg;  --r:130px;color:var(--rose);  border-color:rgba(232,67,90,.25);  animation-duration:18s;}
      .op2{--angle:90deg; --r:130px;color:var(--peach); border-color:rgba(240,112,72,.25); animation-duration:18s;}
      .op3{--angle:180deg;--r:130px;color:var(--sage);  border-color:rgba(75,175,126,.25); animation-duration:18s;}
      .op4{--angle:270deg;--r:130px;color:var(--lav);   border-color:rgba(139,110,232,.25);animation-duration:18s;}
      @keyframes counter-spin{from{transform:rotate(calc(var(--angle))) translateX(var(--r)) rotate(calc(-1 * var(--angle)))}to{transform:rotate(calc(var(--angle) + 360deg)) translateX(var(--r)) rotate(calc(-1*(var(--angle)+360deg)))}}

      /* PHOTO */
      .photo-ring-wrap{position:relative;width:300px;height:370px;}
      .photo-ring{position:absolute;inset:0;border-radius:150px 150px 50px 50px;padding:3px;background:conic-gradient(var(--rose),var(--sun),var(--teal),var(--lav),var(--rose));animation:hshift 10s linear infinite;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;}
      @keyframes hshift{from{filter:hue-rotate(0)}to{filter:hue-rotate(360deg)}}
      .photo-inner{position:absolute;inset:8px;border-radius:140px 140px 42px 42px;overflow:hidden;background:#f7e8d8;display:flex;align-items:center;justify-content:center;}
      .photo-inner img{width:100%;height:100%;object-fit:cover;object-position:center top;}
      .photo-ph{display:flex;flex-direction:column;align-items:center;gap:10px;padding:24px;text-align:center;font-family:'DM Mono',monospace;font-size:12px;color:var(--muted);}
      .photo-ini{font-family:'Boldonse',cursive;font-size:56px;background:linear-gradient(135deg,var(--rose),var(--sun));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

      /* HERO LINKS */
      .hero-links{display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp .8s ease .25s both;}
      .hl{display:inline-flex;align-items:center;gap:7px;padding:10px 20px;border-radius:100px;font-size:13px;font-family:'DM Mono',monospace;text-decoration:none;font-weight:500;transition:transform .2s,box-shadow .2s;}
      .hl:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,0,0,.12);}
      .hl-email{background:var(--rose);color:white;}
      .hl-li{background:rgba(75,159,224,.13);border:1.5px solid rgba(75,159,224,.35);color:#1558a0;}
      .hl-flores{background:rgba(75,175,126,.11);border:1.5px solid rgba(75,175,126,.32);color:var(--sage);}
      .ico{width:14px;height:14px;flex-shrink:0;display:block;}

      /* SCROLL HINT */
      .scroll-hint{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--muted);font-size:11px;font-family:'DM Mono',monospace;animation:fadeUp 1s ease 1.2s both;z-index:2;pointer-events:none;}
      .sarr{width:18px;height:18px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg);animation:sbounce 2s ease infinite;}
      @keyframes sbounce{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(5px)}}

      /* ═══ MARQUEE ═══ */
      .mq{overflow:hidden;padding:20px 0;background:var(--ink);position:relative;z-index:2;}
      .mq-track{display:flex;gap:0;animation:mqscroll 22s linear infinite;width:max-content;}
      .mq-item{font-family:'Boldonse',cursive;font-size:22px;color:var(--page);opacity:.9;white-space:nowrap;padding:0 40px;display:flex;align-items:center;gap:40px;}
      .mq-item::after{content:'';display:block;width:8px;height:8px;border-radius:50%;background:var(--rose);}
      @keyframes mqscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

      /* ═══ SECTIONS ═══ */
      .sec{padding:100px 64px;max-width:1200px;margin:0 auto;position:relative;z-index:2;}

      /* Big editorial section label */
      .sec-label{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);text-transform:uppercase;letter-spacing:3px;margin-bottom:12px;}
      .sec-title{font-family:'Boldonse',cursive;font-size:clamp(42px,6vw,80px);line-height:.95;letter-spacing:-2px;margin-bottom:56px;color:var(--ink);}

      /* ── REVEAL ANIMATIONS ── */
      .rev{opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease;}
      .rev.in{opacity:1;transform:translateY(0);}
      .rev-l{opacity:0;transform:translateX(-40px);transition:opacity .7s ease,transform .7s ease;}
      .rev-l.in{opacity:1;transform:translateX(0);}
      .rev-r{opacity:0;transform:translateX(40px);transition:opacity .7s ease,transform .7s ease;}
      .rev-r.in{opacity:1;transform:translateX(0);}
      .rev-up{opacity:0;transform:translateY(20px);transition:opacity .55s ease,transform .55s ease;}
      .rev-up.in{opacity:1;transform:translateY(0);}

      /* STATS */
      .stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
      .stat-box{background:var(--ink);border-radius:22px;padding:32px 28px;text-align:center;transition:transform .2s,box-shadow .2s;}
      .stat-box:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,.18);}
      .stat-num{font-family:'Boldonse',cursive;font-size:60px;line-height:1;margin-bottom:8px;}
      .stat-lbl{font-size:12px;color:rgba(255,255,255,.5);font-family:'DM Mono',monospace;}

      /* ═══ WORK CARDS ═══ */
      .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
      .card{
        background:var(--card);border:1.5px solid var(--border);border-radius:24px;padding:32px;
        position:relative;overflow:hidden;
        opacity:0;transform:translateY(28px);
        box-shadow:0 2px 16px rgba(0,0,0,.04);
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

      /* Featured card — full width, green tint */
      .card-full{grid-column:1/-1;}
      .card-spring{background:linear-gradient(135deg,#edfff6,#e4fdf2);border-color:rgba(75,175,126,.2);}
      .card-gold{background:linear-gradient(135deg,#fffaeb,#fff5d6);border-color:rgba(245,196,48,.28);}

      .feat-badge{display:inline-flex;align-items:center;gap:7px;border-radius:100px;padding:5px 14px;font-size:11px;font-family:'DM Mono',monospace;margin-bottom:14px;}
      .fb-green{background:rgba(75,175,126,.12);border:1.5px solid rgba(75,175,126,.28);color:var(--sage);}
      .fb-gold {background:rgba(245,196,48,.14);border:1.5px solid rgba(245,196,48,.38);color:#7A6000;}
      .bdot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}

      .feat-inner{display:grid;grid-template-columns:1fr auto;gap:32px;align-items:start;}

      /* Flores animated SVG flower */
      .flores-vis{width:106px;height:106px;border-radius:20px;background:linear-gradient(135deg,#d4f7e5,#a8edcc);border:1.5px solid rgba(75,175,126,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:fbounce 5s ease-in-out infinite;}
      @keyframes fbounce{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-9px) rotate(4deg)}}

      /* Volunteer thumb */
      .vol-thumb{width:180px;height:180px;flex-shrink:0;border-radius:18px;overflow:hidden;background:linear-gradient(135deg,#fdecc8,#fce4b0);display:flex;align-items:center;justify-content:center;}
      .vol-thumb img{width:100%;height:100%;object-fit:cover;}
      .vol-ph{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);}

      /* Card content */
      .wy{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:7px;display:flex;align-items:center;gap:7px;}
      .wdot{width:6px;height:6px;border-radius:50%;background:var(--rose);flex-shrink:0;}
      .wrole{font-family:'Boldonse',cursive;font-size:19px;margin-bottom:3px;color:var(--ink);line-height:1.15;}
      .worg{font-size:13px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:12px;}
      .wdesc{font-size:14px;line-height:1.72;color:rgba(26,20,16,.7);}
      .wtags{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;}
      .tag{font-family:'DM Mono',monospace;font-size:11px;padding:4px 10px;border-radius:100px;border:1.5px solid;font-weight:500;}
      .tr{color:#b82040;border-color:rgba(232,67,90,.3);background:rgba(232,67,90,.07);}
      .tp{color:#bf5020;border-color:rgba(240,112,72,.3);background:rgba(240,112,72,.07);}
      .ty{color:#8a6000;border-color:rgba(245,196,48,.45);background:rgba(245,196,48,.09);}
      .tg{color:#2c7a50;border-color:rgba(75,175,126,.3);background:rgba(75,175,126,.07);}
      .tt{color:#1a7a6e;border-color:rgba(46,191,172,.3);background:rgba(46,191,172,.07);}
      .ts{color:#1a5a9a;border-color:rgba(75,159,224,.3);background:rgba(75,159,224,.07);}
      .tl{color:#5230c8;border-color:rgba(139,110,232,.3);background:rgba(139,110,232,.07);}

      /* ═══ EDUCATION TIMELINE ═══ */
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

      /* ═══ SKILLS GRID ═══ */
      .skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:14px;}
      .chip{
        background:white;border:1.5px solid var(--border);border-radius:18px;
        padding:20px 12px;text-align:center;cursor:default;
        opacity:0;transform:translateY(20px) scale(.93);
        box-shadow:0 2px 10px rgba(0,0,0,.04);
        transition:border-color .2s,box-shadow .2s,transform .2s;
      }
      .chip.in{opacity:1;transform:translateY(0) scale(1);}
      .chip:hover{transform:scale(1.07) translateY(-3px)!important;box-shadow:0 12px 28px rgba(0,0,0,.1);border-color:rgba(232,67,90,.25);}
      .chip-logo{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-family:'Boldonse',cursive;font-size:13px;letter-spacing:0;flex-shrink:0;}
      .chip-name{font-size:11.5px;font-family:'DM Mono',monospace;color:var(--ink);}

      /* ═══ LANGUAGES ═══ */
      .lang-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
      .lang-card{background:white;border:1.5px solid var(--border);border-radius:22px;padding:28px 24px;text-align:center;opacity:0;transform:translateY(20px);box-shadow:0 2px 12px rgba(0,0,0,.04);transition:transform .2s,box-shadow .2s;}
      .lang-card.in{opacity:1;transform:translateY(0);transition:opacity .55s ease,transform .55s ease,box-shadow .2s;}
      .lang-card:hover{transform:translateY(-5px)!important;box-shadow:0 14px 36px rgba(0,0,0,.09);}
      .llevel{font-family:'Boldonse',cursive;font-size:44px;margin-bottom:3px;}
      .lname{font-size:15px;color:var(--ink);font-weight:600;margin-bottom:2px;}
      .lcert{font-size:11px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:14px;}
      .lbar{height:5px;background:rgba(0,0,0,.07);border-radius:3px;overflow:hidden;}
      .lf{height:100%;border-radius:3px;width:0%;transition:width 1.1s ease .3s;}

      /* ═══ CONTACT ═══ */
      .contact{background:var(--ink);padding:90px 64px;text-align:center;position:relative;overflow:hidden;z-index:2;}
      .contact::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--rose),var(--peach),var(--sun),var(--teal),var(--lav));}
      .c-big{font-family:'Boldonse',cursive;font-size:clamp(36px,6vw,72px);line-height:.95;letter-spacing:-2px;margin-bottom:40px;color:white;}
      .c-big span{background:linear-gradient(115deg,var(--rose),var(--peach),var(--sun));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
      .cbtn{display:inline-flex;align-items:center;gap:10px;background:white;color:var(--ink);text-decoration:none;padding:16px 38px;border-radius:100px;font-size:15px;font-weight:700;transition:transform .2s,box-shadow .2s;}
      .cbtn:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 18px 40px rgba(0,0,0,.3);}
      .c-sub{margin-top:24px;color:rgba(255,255,255,.45);font-size:13px;font-family:'DM Mono',monospace;}
      .c-sub a{text-decoration:none;transition:color .2s;}
      .c-sub a:hover{color:rgba(255,255,255,.8);}

      /* UTILS */
      @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

      /* ── BIG TEXT SECTION DIVIDERS ── */
      .divider{padding:0 64px 80px;max-width:1200px;margin:0 auto;position:relative;z-index:2;}
      .div-word{font-family:'Boldonse',cursive;font-size:clamp(60px,10vw,130px);line-height:.9;letter-spacing:-4px;color:transparent;-webkit-text-stroke:1.5px rgba(0,0,0,.09);user-select:none;overflow:hidden;}
      .div-word span{display:block;transform:translateY(100%);transition:transform .8s cubic-bezier(.16,1,.3,1);}
      .div-word.in span{transform:translateY(0);}

      @media(max-width:800px){
        .hero{grid-template-columns:1fr;}
        .hero-r{display:none;}
        .sec,.divider{padding:60px 24px;}
        .grid2{grid-template-columns:1fr;}
        .lang-grid{grid-template-columns:1fr 1fr;}
        .stat-row{grid-template-columns:repeat(2,1fr);}
        .feat-inner{grid-template-columns:1fr;}
        .hero-l{padding:60px 24px;}
        .contact{padding:56px 24px;}
        .mq-item{font-size:18px;}
      }
    `}</style>

    <div ref={curRef}  className="cur" />
    <div ref={ringRef} className="cur-ring" />
    <div id="pl" aria-hidden="true" />

    {/* ═══════════ HERO ═══════════ */}
    <div className="hero">
      <div id="b1" className="blob b1" />
      <div id="b2" className="blob b2" />
      <div id="b3" className="blob b3" />

      <div className="hero-l">
        <div className="status">
          <div className="sdot" />
          open to opportunities
        </div>

        <h1 className="hero-name">
          Maria
          <span className="name-grad">Brito</span>
        </h1>

        <div className="hero-links">
          <a href="mailto:mariajgbrito@hotmail.com" className="hl hl-email">
            <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="white" strokeWidth="1.4"/><path d="M1 5l7 5 7-5" stroke="white" strokeWidth="1.4"/></svg>
            mariajgbrito@hotmail.com
          </a>
          <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" className="hl hl-li">
            <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="3" stroke="#1558a0" strokeWidth="1.3"/><circle cx="5" cy="5.5" r="1" fill="#1558a0"/><path d="M5 8v4M8.5 12V9.5c0-1 .7-1.5 1.5-1.5s1.5.5 1.5 1.5V12" stroke="#1558a0" strokeWidth="1.3" strokeLinecap="round"/><path d="M5 8v4" stroke="#1558a0" strokeWidth="1.3" strokeLinecap="round"/></svg>
            LinkedIn
          </a>
          <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" className="hl hl-flores">
            <svg className="ico" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#4BAF7E" strokeWidth="1.4"/><path d="M8 4c-1 1.5-1 5 0 8M8 4c1 1.5 1 5 0 8M4 8h8" stroke="#4BAF7E" strokeWidth="1.2" strokeLinecap="round"/></svg>
            floresabeirario.pt
          </a>
        </div>
      </div>

      {/* PHOTO + ORBITING PILLS */}
      <div className="hero-r">
        <div style={{position:"relative",width:"360px",height:"370px",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {/* Orbit rings (purely decorative) */}
          <div className="orbit-ring or1" />
          <div className="orbit-ring or2" />

          {/* Orbiting pills */}
          <div className="orbit-pill op1">Educator</div>
          <div className="orbit-pill op2">Designer</div>
          <div className="orbit-pill op3">Co-founder</div>
          <div className="orbit-pill op4">Tech Enthusiast</div>

          {/* Photo frame */}
          <div className="photo-ring-wrap" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <div className="photo-ring" />
            <div className="photo-inner">
              <img src="/mj.webp" alt="Maria Brito"
                onError={(e)=>{
                  (e.target as HTMLImageElement).style.display="none";
                  const ph=(e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if(ph)ph.style.display="flex";
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

      <div className="scroll-hint"><span>scroll</span><div className="sarr" /></div>
    </div>

    {/* ═══════════ MARQUEE ═══════════ */}
    <div className="mq">
      <div className="mq-track">
        {["Maria Brito","Educator","Designer","Co-founder","Tech Enthusiast","Coimbra",
          "Maria Brito","Educator","Designer","Co-founder","Tech Enthusiast","Coimbra"].map((t,i)=>
          <div key={i} className="mq-item">{t}</div>)}
      </div>
    </div>

    {/* ═══════════ STATS ═══════════ */}
    <section className="sec">
      <div className="sec-label rev">at a glance</div>
      <div className="sec-title rev">By the numbers.</div>
      <div className="stat-row">
        <div className="stat-box rev" style={{transitionDelay:".05s"}}>
          <div className="stat-num" style={{color:"var(--rose)"}} data-count="5">0</div>
          <div className="stat-lbl">years teaching</div>
        </div>
        <div className="stat-box rev" style={{transitionDelay:".12s"}}>
          <div className="stat-num" style={{color:"var(--sun)"}} data-count="2">0</div>
          <div className="stat-lbl">languages</div>
        </div>
        <div className="stat-box rev" style={{transitionDelay:".19s"}}>
          <div className="stat-num" style={{color:"var(--sage)"}} data-count="1">0</div>
          <div className="stat-lbl">company co-founded</div>
        </div>
      </div>
    </section>

    {/* ── DIVIDER WORD ── */}
    <div className="divider"><div className="div-word rev"><span>Work.</span></div></div>

    {/* ═══════════ WORK EXPERIENCE ═══════════ */}
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">career</div>
      <div className="grid2">

        {/* Flores à Beira-Rio */}
        <div className="card card-full card-spring cg" data-d="0">
          <div className="feat-badge fb-green"><div className="bdot" style={{background:"var(--sage)"}} />Latest venture</div>
          <div className="feat-inner">
            <div>
              <div className="wy"><div className="wdot" style={{background:"var(--sage)"}} /><span style={{color:"var(--sage)"}}>2025 to Present</span></div>
              <div className="wrole">Co-Founder</div>
              <div className="worg">Flores à Beira-Rio · floresabeirario.pt</div>
              <p className="wdesc">Co-founded a flower preservation company, turning fresh botanicals into lasting art. Leads design, branding, and creative direction, and built the company website from the ground up.</p>
              <div className="wtags">
                <span className="tag tg">Entrepreneurship</span>
                <span className="tag tt">Branding</span>
                <span className="tag tg">Web Development</span>
                <span className="tag tg">Creative Direction</span>
              </div>
            </div>
            <div className="flores-vis">
              <svg viewBox="0 0 60 60" width="58" height="58" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#4CAF82" opacity=".9"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#3EC9B6" opacity=".85" transform="rotate(72 30 30)"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#4CAF82" opacity=".9" transform="rotate(144 30 30)"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#3EC9B6" opacity=".85" transform="rotate(216 30 30)"/>
                <ellipse cx="30" cy="13" rx="8" ry="13" fill="#4CAF82" opacity=".9" transform="rotate(288 30 30)"/>
                <circle cx="30" cy="30" r="8" fill="white" opacity=".95"/>
                <circle cx="30" cy="30" r="4" fill="#F9C846" opacity=".9"/>
              </svg>
            </div>
          </div>
        </div>

        {/* TUMO Learning Coach */}
        <div className="card cr" data-d="80">
          <div className="wy"><div className="wdot" />2023 to Present</div>
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
          <div className="wy"><div className="wdot" style={{background:"var(--peach)"}} /><span style={{color:"var(--peach)"}}>2023 to 2025</span></div>
          <div className="wrole">Info Desk</div>
          <div className="worg">TUMO Coimbra</div>
          <p className="wdesc">Managed student enquiries, check-in and check-out, registration and enrolment, database upkeep, and parent communication.</p>
          <div className="wtags">
            <span className="tag tp">Operations</span>
            <span className="tag ty">Administration</span>
          </div>
        </div>

        {/* Clonlara */}
        <div className="card cl" data-d="200">
          <div className="wy"><div className="wdot" style={{background:"var(--lav)"}} /><span style={{color:"var(--lav)"}}>2023 to 2025</span></div>
          <div className="wrole">Middle School Teacher</div>
          <div className="worg">Colégio de São José · Clonlara Program</div>
          <p className="wdesc">Teaching Mathematics and ICT within a personalised learning programme that fosters authenticity, autonomy, and joy in learning.</p>
          <div className="wtags">
            <span className="tag tl">Mathematics</span>
            <span className="tag ts">ICT</span>
            <span className="tag tl">Personalised Learning</span>
          </div>
        </div>

        {/* Escola Tenente Valadim */}
        <div className="card ct" data-d="260">
          <div className="wy"><div className="wdot" style={{background:"var(--teal)"}} /><span style={{color:"var(--teal)"}}>2022 to 2024</span></div>
          <div className="wrole">Middle School Teacher</div>
          <div className="worg">Escola Tenente Valadim · ages 11 to 16</div>
          <p className="wdesc">Teaching Visual Education, Technology Education, and Design in Interactive Media with homeschooled students. Develops creative expression and aesthetic understanding through art and technology.</p>
          <div className="wtags">
            <span className="tag tt">Visual Education</span>
            <span className="tag ts">Interactive Design</span>
          </div>
        </div>

        {/* Bissaya Barreto */}
        <div className="card cs" data-d="320">
          <div className="wy"><div className="wdot" style={{background:"var(--sky)"}} /><span style={{color:"var(--sky)"}}>2022 to 2023</span></div>
          <div className="wrole">Middle School Teacher</div>
          <div className="worg">Agrupamento de Escolas Dr. Bissaya Barreto</div>
          <p className="wdesc">Information and Communication Technologies teacher.</p>
          <div className="wtags">
            <span className="tag ts">ICT</span>
          </div>
        </div>

      </div>
    </section>

    {/* ── DIVIDER ── */}
    <div className="divider"><div className="div-word rev"><span>Internships.</span></div></div>

    {/* ═══════════ INTERNSHIPS ═══════════ */}
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">experience abroad</div>
      <div className="grid2">

        <div className="card cr" data-d="0">
          <div className="wy"><div className="wdot" />2021 to 2022 · Paris, France</div>
          <div className="wrole">Production and Creative Direction</div>
          <div className="worg">Julien Tavel, Fashion Photographer</div>
          <p className="wdesc">Production and photo crew assistant to an internationally recognised fashion photographer. Researched visual subjects, generated mood boards and conceptual ideas, and managed all supplies and equipment needed for set.</p>
          <div className="wtags">
            <span className="tag tr">Fashion Photography</span>
            <span className="tag tp">Creative Research</span>
            <span className="tag ty">Set Management</span>
          </div>
        </div>

        <div className="card cs" data-d="140">
          <div className="wy"><div className="wdot" style={{background:"var(--sky)"}} /><span style={{color:"var(--sky)"}}>2021 · Athens, Greece</span></div>
          <div className="wrole">Graphic and Email Designer</div>
          <div className="worg">ShipLemon · DeliverBack</div>
          <p className="wdesc">Web design, graphic design, and email and newsletter optimisation for two tech startups. Built mobile-friendly templates and marketing materials.</p>
          <div className="wtags">
            <span className="tag ts">Web Design</span>
            <span className="tag tt">Email Design</span>
            <span className="tag tp">Graphic Design</span>
          </div>
        </div>

      </div>
    </section>

    {/* ── DIVIDER ── */}
    <div className="divider"><div className="div-word rev"><span>Volunteering.</span></div></div>

    {/* ═══════════ VOLUNTEERING ═══════════ */}
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">giving back</div>
      <div className="grid2">
        <div className="card card-full card-gold cy" data-d="0">
          <div className="feat-badge fb-gold"><div className="bdot" style={{background:"var(--sun)"}} />Volunteer</div>
          <div className="feat-inner">
            <div>
              <div className="wy"><div className="wdot" style={{background:"var(--sun)"}} /><span style={{color:"#7A6000"}}>2024 · Bulgaria</span></div>
              <div className="wrole">Summer Activities Creator</div>
              <div className="worg">SOS Children's Villages · Future World Association</div>
              <p className="wdesc">Created and led summer activities for children at SOS Children's Villages, bringing creativity, play, and warmth through hands-on projects and joyful learning.</p>
              <div className="wtags">
                <span className="tag ty">Children's Activities</span>
                <span className="tag tp">Community Care</span>
                <span className="tag tr">Creative Workshops</span>
              </div>
            </div>
            <div className="vol-thumb">
              <img src="/bulgaria.webp" alt="Volunteering in Bulgaria"
                onError={(e)=>{
                  (e.target as HTMLImageElement).style.display="none";
                  const ph=(e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if(ph)ph.style.display="flex";
                }}
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

    {/* ── DIVIDER ── */}
    <div className="divider"><div className="div-word rev"><span>Education.</span></div></div>

    {/* ═══════════ EDUCATION ═══════════ */}
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">academia</div>
      <div className="edu-tl">
        <div className="edu-item">
          <div className="edu-yr">2016 to 2019</div>
          <div className="edu-deg">Bachelor's Degree in Design and Multimedia</div>
          <div className="edu-sch">University of Coimbra · Faculty of Sciences and Technology</div>
        </div>
        <div className="edu-item">
          <div className="edu-yr" style={{color:"var(--sun)"}}>2023</div>
          <div className="edu-deg" style={{fontSize:"16px"}}>Computational Thinking in Maths with Scratch</div>
          <div className="edu-sch">CENFORMAZ</div>
        </div>
        <div className="edu-item">
          <div className="edu-yr" style={{color:"var(--teal)"}}>2023</div>
          <div className="edu-deg" style={{fontSize:"16px"}}>Oil Painting Techniques</div>
          <div className="edu-sch">CEARTE · Fine and Studio Arts</div>
        </div>
        <div className="edu-item">
          <div className="edu-yr" style={{color:"var(--lav)"}}>2021</div>
          <div className="edu-deg" style={{fontSize:"16px"}}>Fundamentals of Digital Marketing</div>
          <div className="edu-sch">The Open University</div>
        </div>
        <div className="edu-item">
          <div className="edu-yr" style={{color:"var(--peach)"}}>2008 to 2012</div>
          <div className="edu-deg" style={{fontSize:"16px"}}>Music Course, Clarinet 5th Grade</div>
          <div className="edu-sch">Escola de Música · Colégio São Teotónio</div>
        </div>
      </div>
    </section>

    {/* ── DIVIDER ── */}
    <div className="divider"><div className="div-word rev"><span>Skills.</span></div></div>

    {/* ═══════════ SKILLS ═══════════ */}
    <section className="sec" style={{paddingTop:0}}>
      <div className="sec-label rev">toolkit</div>
      <div className="skills-grid">
        {SKILLS.map((s, i) => (
          <div key={s.name} className="chip" style={{transitionDelay:`${i*0.04}s`}}>
            <div className="chip-logo" style={{background:s.bg, color:s.fg}}>
              {s.abbr}
            </div>
            <div className="chip-name">{s.name}</div>
          </div>
        ))}
      </div>
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
            <div className="lbar"><div className="lf" data-w={l.w} style={{background:l.color}} /></div>
          </div>
        ))}
      </div>
    </section>

    {/* ═══════════ CONTACT ═══════════ */}
    <div className="contact">
      <div className="c-big rev">
        Let's build something <span>beautiful</span> together.
      </div>
      <a href="mailto:mariajgbrito@hotmail.com" className="cbtn rev">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="var(--ink)" strokeWidth="1.5"/><path d="M1 5l7 5 7-5" stroke="var(--ink)" strokeWidth="1.5"/></svg>
        Get in touch
      </a>
      <div className="c-sub">
        mariajgbrito@hotmail.com &nbsp;&middot;&nbsp;
        <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" style={{color:"var(--sky)"}}>linkedin.com/in/mariajbrito</a>
        &nbsp;&middot;&nbsp;
        <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" style={{color:"var(--sage)"}}>floresabeirario.pt</a>
      </div>
    </div>
  </>);
}
