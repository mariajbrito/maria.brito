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
    ],
  },
  {
    label: "Creative",
    color: "#C0392B",
    skills: [
      { name: "Oil Painting", abbr: "Op", bg: "#C0392B" },
      { name: "MS Office",    abbr: "Ms", bg: "#D83B01" },
      { name: "Clarinet",     abbr: "Cl", bg: "#6C5CE7" },
    ],
  },
];

export default function Home() {
  const curRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const canvasRef= useRef<HTMLCanvasElement>(null);
  const [typed, setTyped]   = useState("");
  const [phase, setPhase]   = useState<"typing"|"done">("typing");

  /* ── TYPEWRITER on mount ── */
  useEffect(() => {
    const name = "Maria Brito";
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(name.slice(0, i));
      if (i >= name.length) { clearInterval(t); setPhase("done"); }
    }, 90);
    return () => clearInterval(t);
  }, []);

  /* ── BLOB CANVAS (reacts to mouse, like theArtCenter) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

    // Define blobs: x%, y%, radiusX%, radiusY%, color, phaseOffset
    const blobs = [
      { bx: 15,  by: 10,  rx: 28, ry: 36, color: "#F9C846", phase: 0 },
      { bx: 85,  by: 8,   rx: 26, ry: 30, color: "#4BAF7E", phase: 1.2 },
      { bx: 5,   by: 55,  rx: 20, ry: 28, color: "#E8435A", phase: 2.4 },
      { bx: 90,  by: 60,  rx: 22, ry: 26, color: "#8B6EE8", phase: 0.8 },
      { bx: 50,  by: 90,  rx: 30, ry: 18, color: "#F07048", phase: 1.7 },
      { bx: 70,  by: 40,  rx: 16, ry: 20, color: "#2EBFAC", phase: 3.0 },
    ];

    let t = 0;
    let raf: number;

    const drawBlob = (
      cx: number, cy: number,
      rx: number, ry: number,
      color: string, wobble: number
    ) => {
      ctx.beginPath();
      const pts = 8;
      for (let i = 0; i <= pts; i++) {
        const angle = (i / pts) * Math.PI * 2;
        const wrx = rx * (1 + 0.18 * Math.sin(wobble + angle * 2.1));
        const wry = ry * (1 + 0.15 * Math.cos(wobble * 1.3 + angle * 1.7));
        const px = cx + wrx * Math.cos(angle);
        const py = cy + wry * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
      grad.addColorStop(0, color + "CC");
      grad.addColorStop(1, color + "00");
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const frame = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      const mxN = (mx / W - 0.5) * 2; // -1 to 1
      const myN = (my / H - 0.5) * 2;

      blobs.forEach(b => {
        const wobble = t + b.phase;
        // Mouse parallax: different depths per blob
        const depth = 0.03 + Math.abs(Math.sin(b.phase)) * 0.05;
        const bxPx = (b.bx / 100) * W + mxN * W * depth;
        const byPx = (b.by / 100) * H + myN * H * depth;
        const rxPx = (b.rx / 100) * W;
        const ryPx = (b.ry / 100) * H;
        drawBlob(bxPx, byPx, rxPx, ryPx, b.color, wobble);
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── CURSOR ── */
  useEffect(() => {
    let cx = 0, cy = 0, rx = 0, ry = 0;
    let raf: number;
    const mm = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY; };
    const tick = () => {
      if (curRef.current)  { curRef.current.style.left  = cx + "px"; curRef.current.style.top  = cy + "px"; }
      rx += (cx - rx) * 0.13; ry += (cy - ry) * 0.13;
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    document.addEventListener("mousemove", mm);
    const big = () => { if(curRef.current){curRef.current.style.width="18px";curRef.current.style.height="18px";} if(ringRef.current){ringRef.current.style.width="50px";ringRef.current.style.height="50px";} };
    const sml = () => { if(curRef.current){curRef.current.style.width="10px";curRef.current.style.height="10px";} if(ringRef.current){ringRef.current.style.width="32px";ringRef.current.style.height="32px";} };
    document.querySelectorAll("a,button,.card,.chip").forEach(el => {
      el.addEventListener("mouseenter", big);
      el.addEventListener("mouseleave", sml);
    });
    return () => { document.removeEventListener("mousemove", mm); cancelAnimationFrame(raf); };
  }, []);

  /* ── SCROLL REVEAL ── */
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.07 });
    document.querySelectorAll(".rev,.edu-item,.chip,.lang-card,.card").forEach(el => io.observe(el));

    document.querySelectorAll<HTMLElement>(".card").forEach(c => {
      const ms = parseFloat(c.dataset.d ?? "0");
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { setTimeout(() => e.target.classList.add("in"), ms); obs.unobserve(e.target); }
        });
      }, { threshold: 0.06 });
      obs.observe(c);
    });

    document.querySelectorAll<HTMLElement>(".chip").forEach((chip, i) => {
      chip.style.transitionDelay = `${i * 0.04}s`;
    });

    document.querySelectorAll<HTMLElement>(".lang-card").forEach(lc => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            (e.target as HTMLElement).querySelectorAll<HTMLElement>(".lf").forEach(b => {
              setTimeout(() => { b.style.width = (b.dataset.w ?? "0") + "%"; }, 400);
            });
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(lc);
    });

    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const target = parseInt((e.target as HTMLElement).dataset.count ?? "0");
            let c = 0;
            const ti = setInterval(() => { c = Math.min(c + 1, target); e.target.textContent = String(c); if (c >= target) clearInterval(ti); }, 70);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      obs.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Boldonse&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

      :root {
        --ink:   #1A1410;
        --page:  #FAF6EF;
        --rose:  #E8435A;
        --peach: #F07048;
        --sun:   #F5C430;
        --sage:  #4BAF7E;
        --teal:  #2EBFAC;
        --sky:   #4B9FE0;
        --lav:   #8B6EE8;
        --muted: #8A7F7A;
        --white: #FFFFFF;
        --border:rgba(0,0,0,.07);
      }

      * { margin:0; padding:0; box-sizing:border-box; }
      html { scroll-behavior:smooth; }
      body { background:var(--page); color:var(--ink); font-family:'Plus Jakarta Sans',sans-serif; overflow-x:hidden; cursor:none; }

      /* CURSOR */
      .cur      { width:10px;height:10px;background:var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .18s,height .18s; }
      .cur-ring { width:32px;height:32px;border:1.5px solid var(--rose);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .18s,height .18s;opacity:.45; }

      /* BLOB CANVAS */
      #blob-canvas { position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.55; }

      /* ═══ HERO ═══ */
      .hero {
        min-height:100vh; position:relative; z-index:1;
        display:flex; flex-direction:column;
        align-items:center; justify-content:center;
        text-align:center; padding:60px 40px 80px;
        overflow:hidden;
      }

      /* TYPEWRITER NAME */
      .hero-name {
        font-family:'Boldonse',cursive;
        font-size:clamp(64px,12vw,160px);
        line-height:.9; letter-spacing:-4px; color:var(--ink);
        margin-bottom:32px; position:relative;
      }
      .hero-name .cursor-blink {
        display:inline-block; width:.08em; height:.9em;
        background:var(--rose); margin-left:4px; vertical-align:-.05em;
        animation:cblink .75s step-end infinite;
      }
      .cursor-blink.done { animation:none; opacity:0; }
      @keyframes cblink { 0%,100%{opacity:1} 50%{opacity:0} }

      /* STATUS BADGE */
      .status {
        display:inline-flex; align-items:center; gap:8px;
        background:rgba(75,175,126,.12); border:1.5px solid rgba(75,175,126,.3);
        border-radius:100px; padding:7px 18px;
        font-size:12px; font-family:'DM Mono',monospace; color:var(--sage);
        margin-bottom:36px; animation:fadeUp .8s ease .3s both;
      }
      .sdot { width:7px;height:7px;background:var(--sage);border-radius:50%;animation:blink 2s ease infinite;flex-shrink:0; }
      @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}

      /* HERO LINKS */
      .hero-links { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; animation:fadeUp .8s ease .5s both; margin-bottom:64px; }
      .hl { display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:100px;font-size:13px;font-family:'DM Mono',monospace;text-decoration:none;font-weight:500;transition:transform .2s,box-shadow .2s; }
      .hl:hover { transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,0,0,.12); }
      .hl-email  { background:var(--rose);color:white; }
      .hl-li     { background:rgba(75,159,224,.13);border:1.5px solid rgba(75,159,224,.35);color:#1558a0; }
      .hl-flores { background:rgba(75,175,126,.11);border:1.5px solid rgba(75,175,126,.32);color:var(--sage); }
      .ico { width:14px;height:14px;flex-shrink:0;display:block; }

      /* ORBITING ROLES — fixed CSS */
      .orbit-section {
        position:relative; width:340px; height:340px;
        animation:fadeUp .8s ease .6s both;
      }
      .orbit-ring-svg {
        position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
        animation:spinCW 20s linear infinite;
      }
      .orbit-ring-svg-2 {
        position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
        animation:spinCCW 16s linear infinite;
      }
      @keyframes spinCW  { from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(360deg)} }
      @keyframes spinCCW { from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(-360deg)} }

      /* Pills placed at corners of orbit */
      .orbit-pills {
        position:absolute; inset:0;
        animation:spinCW 20s linear infinite;
      }
      .opill {
        position:absolute;
        background:white; border:1.5px solid rgba(0,0,0,.08);
        border-radius:100px; padding:8px 16px;
        font-size:12px; font-family:'DM Mono',monospace;
        box-shadow:0 3px 14px rgba(0,0,0,.1);
        white-space:nowrap;
        /* counter-rotate so text stays upright */
        animation:spinCCW 20s linear infinite;
      }
      .opill:nth-child(1) { top:0;    left:50%; transform:translateX(-50%) translateY(-50%);   color:var(--rose);  border-color:rgba(232,67,90,.3); }
      .opill:nth-child(2) { top:50%;  right:0;  transform:translateX(50%)  translateY(-50%);   color:var(--peach); border-color:rgba(240,112,72,.3); }
      .opill:nth-child(3) { bottom:0; left:50%; transform:translateX(-50%) translateY(50%);    color:var(--sage);  border-color:rgba(75,175,126,.3); }
      .opill:nth-child(4) { top:50%;  left:0;   transform:translateX(-50%) translateY(-50%);   color:var(--lav);   border-color:rgba(139,110,232,.3); }

      /* Central photo */
      .orbit-photo {
        position:absolute; top:50%; left:50%;
        transform:translate(-50%,-50%);
        width:220px; height:260px;
      }
      .photo-ring {
        position:absolute; inset:0;
        border-radius:110px 110px 30px 30px; padding:3px;
        background:conic-gradient(var(--rose),var(--sun),var(--teal),var(--lav),var(--rose));
        animation:hshift 10s linear infinite;
        -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
        -webkit-mask-composite:xor; mask-composite:exclude;
      }
      @keyframes hshift{from{filter:hue-rotate(0)}to{filter:hue-rotate(360deg)}}
      .photo-inner {
        position:absolute; inset:6px;
        border-radius:103px 103px 24px 24px;
        overflow:hidden; background:#f7e8d8;
        display:flex; align-items:center; justify-content:center;
      }
      .photo-inner img { width:100%;height:100%;object-fit:cover;object-position:center top; }
      .photo-ph { display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:var(--muted); }
      .photo-ini { font-family:'Boldonse',cursive;font-size:48px;background:linear-gradient(135deg,var(--rose),var(--sun));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }

      /* SCROLL HINT */
      .scroll-hint { display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--muted);font-size:11px;font-family:'DM Mono',monospace;animation:fadeUp 1s ease 1.4s both; }
      .sarr { width:18px;height:18px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg);animation:sbounce 2s ease infinite; }
      @keyframes sbounce{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(5px)}}

      /* ═══ MARQUEE (dark band) ═══ */
      .mq { overflow:hidden;padding:22px 0;background:var(--ink);position:relative;z-index:2; }
      .mq-track { display:flex;gap:0;animation:mqscroll 24s linear infinite;width:max-content; }
      .mq-item { font-family:'Boldonse',cursive;font-size:22px;color:var(--page);opacity:.9;white-space:nowrap;padding:0 44px;display:flex;align-items:center;gap:44px; }
      .mq-item::after { content:'';display:block;width:8px;height:8px;border-radius:50%;background:var(--rose); }
      @keyframes mqscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

      /* ═══ SECTIONS ═══ */
      .sec { padding:100px 64px;max-width:1200px;margin:0 auto;position:relative;z-index:2; }

      /* Big ghost word dividers */
      .div-wrap { padding:0 64px 60px;max-width:1200px;margin:0 auto;position:relative;z-index:2;overflow:hidden; }
      .div-word { font-family:'Boldonse',cursive;font-size:clamp(56px,9vw,120px);line-height:.9;letter-spacing:-4px;color:transparent;-webkit-text-stroke:2px rgba(0,0,0,.1);user-select:none; }
      .div-word.rev { opacity:0;transform:translateY(30px);transition:opacity .7s,transform .7s; }
      .div-word.rev.in { opacity:1;transform:translateY(0); }

      .sec-label { font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);text-transform:uppercase;letter-spacing:3px;margin-bottom:12px; }
      .sec-label.rev { opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s; }
      .sec-label.rev.in { opacity:1;transform:translateY(0); }

      .sec-title { font-family:'Boldonse',cursive;font-size:clamp(40px,6vw,72px);line-height:.95;letter-spacing:-2px;margin-bottom:52px;color:var(--ink); }
      .sec-title.rev { opacity:0;transform:translateY(20px);transition:opacity .65s .08s,transform .65s .08s; }
      .sec-title.rev.in { opacity:1;transform:translateY(0); }

      /* STATS */
      .stat-row { display:grid;grid-template-columns:repeat(3,1fr);gap:18px; }
      .stat-box { background:var(--ink);border-radius:24px;padding:34px 28px;text-align:center;transition:transform .2s,box-shadow .2s; }
      .stat-box.rev { opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s,box-shadow .2s; }
      .stat-box.rev.in { opacity:1;transform:translateY(0); }
      .stat-box:hover { transform:translateY(-5px)!important;box-shadow:0 16px 40px rgba(0,0,0,.2); }
      .stat-num { font-family:'Boldonse',cursive;font-size:60px;line-height:1;margin-bottom:8px; }
      .stat-lbl { font-size:12px;color:rgba(255,255,255,.45);font-family:'DM Mono',monospace; }

      /* CARDS */
      .grid2 { display:grid;grid-template-columns:1fr 1fr;gap:20px; }
      .card {
        background:var(--white); border:1.5px solid var(--border); border-radius:24px;
        padding:32px; position:relative; overflow:hidden;
        box-shadow:0 2px 16px rgba(0,0,0,.04);
        opacity:0; transform:translateY(28px);
        transition:border-color .25s,box-shadow .25s,transform .25s;
      }
      .card.in { opacity:1;transform:translateY(0);transition:opacity .6s ease,transform .6s ease,border-color .25s,box-shadow .25s,transform .25s; }
      .card:hover { transform:translateY(-6px)!important;box-shadow:0 20px 50px rgba(0,0,0,.1);border-color:rgba(0,0,0,.12); }
      .card::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;opacity:0;transition:opacity .25s;border-radius:24px 24px 0 0; }
      .card:hover::before { opacity:1; }
      .cr::before { background:linear-gradient(90deg,var(--rose),var(--peach)); }
      .cp::before { background:linear-gradient(90deg,var(--peach),var(--sun)); }
      .cg::before { background:linear-gradient(90deg,var(--sage),var(--teal)); }
      .cs::before { background:linear-gradient(90deg,var(--sky),var(--lav)); }
      .cy::before { background:linear-gradient(90deg,var(--sun),var(--peach)); }
      .cl::before { background:linear-gradient(90deg,var(--lav),var(--sky)); }
      .ct::before { background:linear-gradient(90deg,var(--teal),var(--sage)); }

      .card-full { grid-column:1/-1; }
      .card-spring { background:linear-gradient(135deg,#edfff6,#e2fdf0);border-color:rgba(75,175,126,.22); }
      .card-gold   { background:linear-gradient(135deg,#fffaeb,#fff5d4);border-color:rgba(245,196,48,.28); }

      .feat-badge { display:inline-flex;align-items:center;gap:7px;border-radius:100px;padding:5px 14px;font-size:11px;font-family:'DM Mono',monospace;margin-bottom:14px; }
      .fb-green { background:rgba(75,175,126,.12);border:1.5px solid rgba(75,175,126,.28);color:var(--sage); }
      .fb-gold  { background:rgba(245,196,48,.14);border:1.5px solid rgba(245,196,48,.38);color:#7A6000; }
      .bdot { width:6px;height:6px;border-radius:50%;flex-shrink:0; }
      .feat-inner { display:grid;grid-template-columns:1fr auto;gap:28px;align-items:start; }

      /* Flores SVG */
      .flores-vis { width:100px;height:100px;border-radius:20px;background:linear-gradient(135deg,#d4f7e5,#a8edcc);border:1.5px solid rgba(75,175,126,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:fbounce 5s ease-in-out infinite; }
      @keyframes fbounce{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-9px) rotate(4deg)}}

      /* Vol thumb */
      .vol-thumb { width:176px;height:176px;flex-shrink:0;border-radius:18px;overflow:hidden;background:linear-gradient(135deg,#fdecc8,#fce4b0);display:flex;align-items:center;justify-content:center; }
      .vol-thumb img { width:100%;height:100%;object-fit:cover; }
      .vol-ph { display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:var(--muted); }

      /* Card content */
      .wy   { font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:7px;display:flex;align-items:center;gap:7px; }
      .wdot { width:6px;height:6px;border-radius:50%;background:var(--rose);flex-shrink:0; }
      .wrole{ font-family:'Boldonse',cursive;font-size:18px;margin-bottom:3px;color:var(--ink);line-height:1.2; }
      .worg { font-size:13px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:12px; }
      .wdesc{ font-size:14px;line-height:1.74;color:rgba(26,20,16,.68); }
      .wtags{ display:flex;flex-wrap:wrap;gap:6px;margin-top:14px; }
      .tag  { font-family:'DM Mono',monospace;font-size:11px;padding:4px 10px;border-radius:100px;border:1.5px solid;font-weight:500; }
      .tr{color:#b82040;border-color:rgba(232,67,90,.3);background:rgba(232,67,90,.07);}
      .tp{color:#bf5020;border-color:rgba(240,112,72,.3);background:rgba(240,112,72,.07);}
      .ty{color:#8a6000;border-color:rgba(245,196,48,.45);background:rgba(245,196,48,.09);}
      .tg{color:#2c7a50;border-color:rgba(75,175,126,.3);background:rgba(75,175,126,.07);}
      .tt{color:#1a7a6e;border-color:rgba(46,191,172,.3);background:rgba(46,191,172,.07);}
      .ts{color:#1a5a9a;border-color:rgba(75,159,224,.3);background:rgba(75,159,224,.07);}
      .tl{color:#5230c8;border-color:rgba(139,110,232,.3);background:rgba(139,110,232,.07);}

      /* EDUCATION */
      .edu-tl { position:relative;padding-left:40px; }
      .edu-tl::before { content:'';position:absolute;left:0;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,var(--rose),var(--sun),var(--teal),var(--lav),var(--peach));border-radius:2px; }
      .edu-item { position:relative;margin-bottom:40px;opacity:0;transform:translateX(-18px);transition:opacity .55s,transform .55s; }
      .edu-item.in { opacity:1;transform:translateX(0); }
      .edu-item::before { content:'';position:absolute;left:-46px;top:7px;width:12px;height:12px;border-radius:50%;background:white;border:2.5px solid var(--rose);transition:background .25s; }
      .edu-item:nth-child(2)::before{border-color:var(--sun);}
      .edu-item:nth-child(3)::before{border-color:var(--teal);}
      .edu-item:nth-child(4)::before{border-color:var(--lav);}
      .edu-item:nth-child(5)::before{border-color:var(--peach);}
      .edu-item:hover::before{background:var(--rose);}
      .edu-yr  { font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:5px; }
      .edu-deg { font-family:'Boldonse',cursive;font-size:18px;margin-bottom:3px;color:var(--ink);line-height:1.15; }
      .edu-sch { font-size:13px;color:var(--muted); }

      /* SKILLS */
      .skill-section { margin-bottom:52px; }
      .skill-section-label {
        font-family:'Boldonse',cursive; font-size:22px; color:var(--ink);
        margin-bottom:18px; display:flex; align-items:center; gap:12px;
      }
      .skill-section-label::before {
        content:''; display:block; width:28px; height:3px; border-radius:2px;
        background:var(--accent-color, var(--rose));
      }
      .skill-section-label.rev { opacity:0;transform:translateX(-20px);transition:opacity .6s,transform .6s; }
      .skill-section-label.rev.in { opacity:1;transform:translateX(0); }
      .chips-row { display:flex;flex-wrap:wrap;gap:12px; }
      .chip {
        background:var(--white); border:1.5px solid var(--border); border-radius:16px;
        padding:16px 14px; display:flex; align-items:center; gap:12px;
        cursor:default; opacity:0; transform:translateY(18px) scale(.93);
        box-shadow:0 2px 10px rgba(0,0,0,.04);
        transition:border-color .2s,box-shadow .2s,transform .2s,opacity .4s ease;
        min-width:fit-content;
      }
      .chip.in { opacity:1;transform:translateY(0) scale(1); }
      .chip:hover { transform:scale(1.05) translateY(-2px)!important;box-shadow:0 10px 26px rgba(0,0,0,.1);border-color:rgba(232,67,90,.22); }
      .chip-logo { width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'Boldonse',cursive;font-size:12px;color:white;flex-shrink:0;letter-spacing:0; }
      .chip-name { font-size:13px;font-family:'DM Mono',monospace;color:var(--ink);font-weight:500; }

      /* LANGUAGES */
      .lang-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:18px; }
      .lang-card { background:var(--white);border:1.5px solid var(--border);border-radius:22px;padding:30px 26px;text-align:center;opacity:0;transform:translateY(20px);box-shadow:0 2px 12px rgba(0,0,0,.04);transition:transform .2s,box-shadow .2s; }
      .lang-card.in { opacity:1;transform:translateY(0);transition:opacity .55s ease,transform .55s ease,box-shadow .2s; }
      .lang-card:hover { transform:translateY(-5px)!important;box-shadow:0 14px 36px rgba(0,0,0,.09); }
      .llevel { font-family:'Boldonse',cursive;font-size:48px;margin-bottom:3px; }
      .lname  { font-size:15px;color:var(--ink);font-weight:600;margin-bottom:2px; }
      .lcert  { font-size:11px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:14px; }
      .lbar   { height:5px;background:rgba(0,0,0,.07);border-radius:3px;overflow:hidden; }
      .lf     { height:100%;border-radius:3px;width:0%;transition:width 1.1s ease .3s; }

      /* CONTACT */
      .contact { background:var(--ink);padding:100px 64px;text-align:center;position:relative;overflow:hidden;z-index:2; }
      .contact::before { content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--rose),var(--peach),var(--sun),var(--teal),var(--lav)); }
      /* Decorative blobs inside contact */
      .contact::after { content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 10% 50%,rgba(232,67,90,.12) 0%,transparent 70%), radial-gradient(ellipse 50% 70% at 90% 50%,rgba(75,175,126,.1) 0%,transparent 70%);pointer-events:none; }
      .c-big  { font-family:'Boldonse',cursive;font-size:clamp(36px,6vw,70px);line-height:.95;letter-spacing:-2px;margin-bottom:20px;color:white;position:relative;z-index:1; }
      .c-sub-text { font-size:16px;color:rgba(255,255,255,.55);font-family:'Plus Jakarta Sans',sans-serif;margin-bottom:40px;position:relative;z-index:1; }
      .c-big span { background:linear-gradient(115deg,var(--rose),var(--peach),var(--sun));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
      .cbtn { display:inline-flex;align-items:center;gap:10px;background:white;color:var(--ink);text-decoration:none;padding:16px 38px;border-radius:100px;font-size:15px;font-weight:700;transition:transform .2s,box-shadow .2s;position:relative;z-index:1; }
      .cbtn:hover { transform:translateY(-4px) scale(1.02);box-shadow:0 18px 40px rgba(0,0,0,.35); }
      .c-links { margin-top:24px;color:rgba(255,255,255,.4);font-size:13px;font-family:'DM Mono',monospace;position:relative;z-index:1; }
      .c-links a { text-decoration:none;transition:color .2s; }
      .c-links a:hover { color:rgba(255,255,255,.8); }

      @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

      @media(max-width:800px){
        .hero{padding:60px 24px 80px;}
        .orbit-section{width:260px;height:260px;}
        .orbit-photo{width:170px;height:200px;}
        .sec,.div-wrap{padding:60px 24px;}
        .grid2{grid-template-columns:1fr;}
        .lang-grid{grid-template-columns:1fr 1fr;}
        .stat-row{grid-template-columns:repeat(2,1fr);}
        .feat-inner{grid-template-columns:1fr;}
        .contact{padding:56px 24px;}
        .mq-item{font-size:18px;}
      }
    `}</style>

    {/* ─────────── CURSOR ─────────── */}
    <div ref={curRef}  className="cur" />
    <div ref={ringRef} className="cur-ring" />

    {/* ─────────── BLOB CANVAS ─────────── */}
    <canvas ref={canvasRef} id="blob-canvas" />

    {/* ─────────── HERO ─────────── */}
    <div className="hero">
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

      {/* ── ORBITING ROLES + PHOTO ── */}
      <div className="orbit-section">
        {/* Dashed ring 1 — rotates CW */}
        <svg className="orbit-ring-svg" width="330" height="330" viewBox="0 0 330 330">
          <circle cx="165" cy="165" r="155" fill="none" stroke="rgba(0,0,0,0.09)" strokeWidth="1.5" strokeDasharray="6 8"/>
        </svg>

        {/* Pills container — also rotates CW, pills counter-rotate to stay upright */}
        <div className="orbit-pills">
          <div className="opill">Educator</div>
          <div className="opill">Designer</div>
          <div className="opill">Co-founder</div>
          <div className="opill">Tech Enthusiast</div>
        </div>

        {/* Photo — stays still */}
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
            <div className="photo-ph" style={{ display: "none" }}>
              <div className="photo-ini">MJB</div>
              <span>add mj.webp to public/</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" style={{ marginTop: "48px" }}>
        <span>scroll</span>
        <div className="sarr" />
      </div>
    </div>

    {/* ─────────── MARQUEE ─────────── */}
    <div className="mq">
      <div className="mq-track">
        {["Maria Brito","Educator","Designer","Co-founder","Tech Enthusiast","Coimbra",
          "Maria Brito","Educator","Designer","Co-founder","Tech Enthusiast","Coimbra"].map((t,i)=>
          <div key={i} className="mq-item">{t}</div>)}
      </div>
    </div>

    {/* ─────────── STATS ─────────── */}
    <section className="sec">
      <div className="sec-label rev">at a glance</div>
      <div className="sec-title rev">By the numbers.</div>
      <div className="stat-row">
        {[
          { n:5, lbl:"years teaching",       color:"var(--rose)",  d:".05s" },
          { n:2, lbl:"languages",             color:"var(--sun)",   d:".12s" },
          { n:1, lbl:"company co-founded",    color:"var(--sage)",  d:".19s" },
        ].map(s => (
          <div key={s.lbl} className="stat-box rev" style={{ transitionDelay: s.d }}>
            <div className="stat-num" style={{ color: s.color }} data-count={s.n}>0</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </section>

    {/* ─────────── WORK ─────────── */}
    <div className="div-wrap"><div className="div-word rev">Work.</div></div>
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="sec-label rev">career</div>
      <div className="grid2">

        {/* Flores */}
        <div className="card card-full card-spring cg" data-d="0">
          <div className="feat-badge fb-green"><div className="bdot" style={{background:"var(--sage)"}}/>Latest venture</div>
          <div className="feat-inner">
            <div>
              <div className="wy"><div className="wdot" style={{background:"var(--sage)"}}/><span style={{color:"var(--sage)"}}>2025 to Present</span></div>
              <div className="wrole">Co-Founder</div>
              <div className="worg">Flores à Beira-Rio · floresabeirario.pt</div>
              <p className="wdesc">Co-founded a flower preservation company, turning fresh botanicals into lasting art. Leads design, branding, and creative direction, and built the company website from scratch.</p>
              <div className="wtags">
                <span className="tag tg">Entrepreneurship</span>
                <span className="tag tt">Branding</span>
                <span className="tag tg">Web Development</span>
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
                <circle cx="30" cy="30" r="8"  fill="white" opacity=".95"/>
                <circle cx="30" cy="30" r="4"  fill="#F9C846" opacity=".9"/>
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
          <div className="wtags">
            <span className="tag ts">ICT</span>
          </div>
        </div>

        {/* UC Monitor */}
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

    {/* ─────────── INTERNSHIPS ─────────── */}
    <div className="div-wrap"><div className="div-word rev">Internships.</div></div>
    <section className="sec" style={{ paddingTop: 0 }}>
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

    {/* ─────────── VOLUNTEERING ─────────── */}
    <div className="div-wrap"><div className="div-word rev">Volunteering.</div></div>
    <section className="sec" style={{ paddingTop: 0 }}>
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
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const ph = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if (ph) ph.style.display = "flex";
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

    {/* ─────────── EDUCATION ─────────── */}
    <div className="div-wrap"><div className="div-word rev">Education.</div></div>
    <section className="sec" style={{ paddingTop: 0 }}>
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

    {/* ─────────── SKILLS ─────────── */}
    <div className="div-wrap"><div className="div-word rev">Skills.</div></div>
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="sec-label rev">toolkit</div>
      {SKILL_SECTIONS.map(section => (
        <div key={section.label} className="skill-section">
          <div
            className="skill-section-label rev"
            style={{ "--accent-color": section.color } as React.CSSProperties}
          >
            {section.label}
          </div>
          <div className="chips-row">
            {section.skills.map(s => (
              <div key={s.name} className="chip">
                <div className="chip-logo" style={{ background: s.bg }}>{s.abbr}</div>
                <div className="chip-name">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>

    {/* ─────────── LANGUAGES ─────────── */}
    <section className="sec">
      <div className="sec-label rev">communication</div>
      <div className="sec-title rev">Languages.</div>
      <div className="lang-grid">
        {[
          { code:"PT", name:"Portuguese", cert:"Native",      w:100, color:"var(--rose)" },
          { code:"EN", name:"English",    cert:"Native / C2", w:98,  color:"var(--sky)"  },
        ].map((l, i) => (
          <div key={l.code} className="lang-card" style={{ transitionDelay: `${i * 0.12}s` }}>
            <div className="llevel" style={{ color: l.color }}>{l.code}</div>
            <div className="lname">{l.name}</div>
            <div className="lcert">{l.cert}</div>
            <div className="lbar"><div className="lf" data-w={l.w} style={{ background: l.color }} /></div>
          </div>
        ))}
      </div>
    </section>

    {/* ─────────── CONTACT ─────────── */}
    <div className="contact">
      <div className="c-big rev">
        Ready to create something <span>extraordinary</span>?
      </div>
      <p className="c-sub-text rev">Let's make it happen together.</p>
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
