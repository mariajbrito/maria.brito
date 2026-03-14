"use client";

import { useEffect, useRef } from "react";

// SVG petal shapes — no emojis
const PETAL_SVGS = [
  // Simple 4-petal flower
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="6" rx="3.5" ry="6" fill="currentColor" opacity=".85"/><ellipse cx="12" cy="18" rx="3.5" ry="6" fill="currentColor" opacity=".85"/><ellipse cx="6" cy="12" rx="6" ry="3.5" fill="currentColor" opacity=".85"/><ellipse cx="18" cy="12" rx="6" ry="3.5" fill="currentColor" opacity=".85"/><circle cx="12" cy="12" r="3" fill="white" opacity=".9"/></svg>`,
  // Leaf / petal drop
  `<svg viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg"><path d="M10 1 C16 6 18 14 10 27 C2 14 4 6 10 1Z" fill="currentColor" opacity=".8"/></svg>`,
  // Round 5-petal
  `<svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><ellipse cx="14" cy="5" rx="4" ry="5" fill="currentColor" opacity=".82" transform="rotate(0 14 14)"/><ellipse cx="14" cy="5" rx="4" ry="5" fill="currentColor" opacity=".82" transform="rotate(72 14 14)"/><ellipse cx="14" cy="5" rx="4" ry="5" fill="currentColor" opacity=".82" transform="rotate(144 14 14)"/><ellipse cx="14" cy="5" rx="4" ry="5" fill="currentColor" opacity=".82" transform="rotate(216 14 14)"/><ellipse cx="14" cy="5" rx="4" ry="5" fill="currentColor" opacity=".82" transform="rotate(288 14 14)"/><circle cx="14" cy="14" r="3.5" fill="white" opacity=".9"/></svg>`,
  // Diamond petal
  `<svg viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg"><path d="M10 0 L14 12 L10 30 L6 12 Z" fill="currentColor" opacity=".78"/></svg>`,
  // Tiny circle blossom
  `<svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="4" r="3.5" fill="currentColor" opacity=".8"/><circle cx="11" cy="4" r="3.5" fill="currentColor" opacity=".8" transform="rotate(60 11 11)"/><circle cx="11" cy="4" r="3.5" fill="currentColor" opacity=".8" transform="rotate(120 11 11)"/><circle cx="11" cy="4" r="3.5" fill="currentColor" opacity=".8" transform="rotate(180 11 11)"/><circle cx="11" cy="4" r="3.5" fill="currentColor" opacity=".8" transform="rotate(240 11 11)"/><circle cx="11" cy="4" r="3.5" fill="currentColor" opacity=".8" transform="rotate(300 11 11)"/><circle cx="11" cy="11" r="3" fill="white" opacity=".9"/></svg>`,
];

const PETAL_COLORS = ["#F2607A","#FF8C61","#F9C846","#4CAF82","#A78BFA","#3EC9B6","#FF6B9D","#FFB347"];

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── FALLING SVG PETALS ──
    const layer = document.getElementById("petal-layer");
    if (layer) {
      for (let i = 0; i < 24; i++) {
        const wrap = document.createElement("div");
        wrap.className = "petal";
        const size = 14 + Math.random() * 18;
        const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
        const svg = PETAL_SVGS[Math.floor(Math.random() * PETAL_SVGS.length)];
        wrap.style.cssText = `
          left:${Math.random() * 100}vw;
          width:${size}px; height:${size}px;
          color:${color};
          animation-duration:${9 + Math.random() * 13}s;
          animation-delay:${-Math.random() * 16}s;
          opacity:${0.35 + Math.random() * 0.45};
        `;
        wrap.innerHTML = svg;
        layer.appendChild(wrap);
      }
    }

    // ── CURSOR ──
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      const px = (e.clientX / window.innerWidth  - 0.5) * 20;
      const py = (e.clientY / window.innerHeight - 0.5) * 20;
      const b = (id: string, x: number, y: number) => {
        const el = document.getElementById(id);
        if (el) el.style.transform = `translate(${x}px,${y}px)`;
      };
      b("blob1",  px,      py);
      b("blob2", -px*.8,  -py*.8);
      b("blob3",  px*.5,   py*.5);
    };

    const tick = () => {
      if (cursorRef.current) { cursorRef.current.style.left = mx+"px"; cursorRef.current.style.top = my+"px"; }
      rx += (mx-rx)*.15; ry += (my-ry)*.15;
      if (ringRef.current)  { ringRef.current.style.left = rx+"px";  ringRef.current.style.top  = ry+"px"; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    document.addEventListener("mousemove", onMouseMove);

    const big = () => {
      if (cursorRef.current) { cursorRef.current.style.width="20px"; cursorRef.current.style.height="20px"; }
      if (ringRef.current)   { ringRef.current.style.width="54px";   ringRef.current.style.height="54px"; }
    };
    const small = () => {
      if (cursorRef.current) { cursorRef.current.style.width="10px"; cursorRef.current.style.height="10px"; }
      if (ringRef.current)   { ringRef.current.style.width="34px";   ringRef.current.style.height="34px"; }
    };
    document.querySelectorAll("a,button,.card,.skill-chip").forEach(el => {
      el.addEventListener("mouseenter", big);
      el.addEventListener("mouseleave", small);
    });

    // ── SCROLL REVEAL ──
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });

    document.querySelectorAll(".sl,.st,.edu-item").forEach(el => io.observe(el));

    const revealWithDelay = (sel: string, attr = "data-delay") => {
      document.querySelectorAll<HTMLElement>(sel).forEach(el => {
        const ms = parseFloat(el.dataset.delay ?? el.dataset.d ?? "0") * (attr === "data-d" ? 1000 : 1);
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              setTimeout(() => {
                e.target.classList.add("visible");
                (e.target as HTMLElement).querySelectorAll<HTMLElement>(".lf").forEach(b => {
                  setTimeout(() => { b.style.width = (b.dataset.w ?? "0")+"%"; }, 300);
                });
              }, ms);
              obs.unobserve(e.target);
            }
          });
        }, { threshold: 0.07 });
        obs.observe(el);
      });
    };

    revealWithDelay(".card");
    revealWithDelay(".skill-chip","data-d");
    revealWithDelay(".lang-card","data-d");

    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const target = parseInt((e.target as HTMLElement).dataset.count ?? "0");
            let cur = 0;
            const t = setInterval(() => { cur=Math.min(cur+1,target); e.target.textContent=String(cur); if(cur>=target) clearInterval(t); }, 80);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      obs.observe(el);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kirang+Haerang&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --rose:     #F2607A;
          --peach:    #FF8C61;
          --yellow:   #F5C430;
          --green:    #45A874;
          --teal:     #3EC9B6;
          --sky:      #5BAEE8;
          --lavender: #9B7EF0;
          --text:     #2A2620;
          --muted:    #9A8FA0;
          --page:     #FDF6EE;
          --card:     #FFFFFF;
          --border:   rgba(0,0,0,0.07);
        }

        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }

        body {
          background: var(--page);
          color: var(--text);
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        /* ── CURSOR ── */
        .cursor {
          width:10px; height:10px; background:var(--rose);
          border-radius:50%; position:fixed; pointer-events:none; z-index:9999;
          transform:translate(-50%,-50%); transition:width .2s,height .2s;
        }
        .cursor-ring {
          width:34px; height:34px; border:1.5px solid var(--rose); opacity:.55;
          border-radius:50%; position:fixed; pointer-events:none; z-index:9998;
          transform:translate(-50%,-50%); transition:width .2s,height .2s;
        }

        /* ── PETALS ── */
        #petal-layer {
          position:fixed; inset:0;
          pointer-events:none; z-index:0; overflow:hidden;
        }
        .petal {
          position:absolute; top:-50px;
          animation:petalFall linear infinite;
          will-change:transform;
        }
        .petal svg { width:100%; height:100%; display:block; }
        @keyframes petalFall {
          0%   { transform:translateY(-50px) rotate(0deg) translateX(0);   opacity:0; }
          6%   { opacity:1; }
          92%  { opacity:.7; }
          100% { transform:translateY(108vh) rotate(540deg) translateX(60px); opacity:0; }
        }

        /* ── HERO ── */
        .hero {
          min-height:100vh;
          display:grid; grid-template-columns:1fr 1fr;
          position:relative; overflow:hidden;
        }

        .blob {
          position:absolute; border-radius:50%;
          filter:blur(90px); opacity:.2;
          animation:blobPulse 7s ease-in-out infinite alternate;
          pointer-events:none; z-index:0;
        }
        .blob1 { width:480px;height:480px;background:var(--rose);  top:-140px;left:-80px; }
        .blob2 { width:380px;height:380px;background:var(--yellow);bottom:-90px;right:-50px;animation-delay:-3s; }
        .blob3 { width:280px;height:280px;background:var(--teal);  top:40%;left:46%;animation-delay:-1.5s; }
        @keyframes blobPulse { from{transform:scale(1)} to{transform:scale(1.22) rotate(18deg)} }

        .hero-left {
          padding:80px 64px;
          display:flex; flex-direction:column; justify-content:center;
          position:relative; z-index:2;
        }
        .hero-right {
          position:relative; display:flex;
          align-items:center; justify-content:center;
          z-index:2; overflow:visible;
        }

        /* Status */
        .status {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(69,168,116,.11); border:1.5px solid rgba(69,168,116,.32);
          border-radius:100px; padding:6px 16px;
          font-size:12px; font-family:'DM Mono',monospace; color:var(--green);
          margin-bottom:28px; width:fit-content;
          animation:fadeUp .8s ease both;
        }
        .sdot {
          width:7px;height:7px;background:var(--green);border-radius:50%;
          animation:blink 2s ease infinite; flex-shrink:0;
        }
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

        /* Name */
        .hero-name {
          font-family:'Kirang Haerang',cursive;
          font-size:clamp(60px,8vw,104px);
          line-height:.92; letter-spacing:-2px;
          margin-bottom:18px; color:var(--text);
          animation:fadeUp .8s ease .1s both;
        }
        .name-color {
          display:block;
          background:linear-gradient(120deg,var(--rose),var(--peach),var(--yellow));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }

        .hero-sub {
          font-size:15px; color:var(--muted);
          font-family:'DM Mono',monospace;
          margin-bottom:36px; line-height:1.65;
          animation:fadeUp .8s ease .2s both;
        }
        .hero-sub b { color:var(--peach); font-weight:500; }

        .hero-links {
          display:flex; gap:12px; flex-wrap:wrap;
          animation:fadeUp .8s ease .3s both;
        }
        .hlink {
          display:inline-flex; align-items:center; gap:7px;
          padding:10px 20px; border-radius:100px;
          font-size:13px; font-family:'DM Mono',monospace;
          text-decoration:none; font-weight:500;
          transition:transform .2s,box-shadow .2s;
        }
        .hlink:hover{transform:translateY(-3px);box-shadow:0 10px 26px rgba(0,0,0,.11);}
        .hlink-email  {background:var(--rose);color:white;}
        .hlink-li     {background:rgba(91,174,232,.14);border:1.5px solid rgba(91,174,232,.38);color:#1a5ea0;}
        .hlink-flores {background:rgba(69,168,116,.11);border:1.5px solid rgba(69,168,116,.35);color:var(--green);}

        /* Link icons (inline SVG, no emoji) */
        .ico { width:14px;height:14px;flex-shrink:0;display:block; }

        /* ── PHOTO FRAME ── */
        .photo-frame {
          position:relative; width:300px; height:368px;
          animation:fadeUp .8s ease .4s both;
        }
        .photo-ring {
          position:absolute; inset:0;
          border-radius:150px 150px 50px 50px; padding:3px;
          background:conic-gradient(var(--rose),var(--yellow),var(--teal),var(--lavender),var(--rose));
          animation:hueShift 10s linear infinite;
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude;
        }
        @keyframes hueShift{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}
        .photo-inner {
          position:absolute; inset:8px;
          border-radius:140px 140px 42px 42px;
          overflow:hidden; background:#f7e8d8;
          display:flex; align-items:center; justify-content:center;
        }
        .photo-inner img{width:100%;height:100%;object-fit:cover;object-position:center top;}
        .photo-ph{
          display:flex;flex-direction:column;align-items:center;
          gap:10px;padding:24px;text-align:center;
          font-family:'DM Mono',monospace;font-size:12px;color:var(--muted);
        }
        .photo-initials{
          font-family:'Kirang Haerang',cursive;font-size:60px;
          background:linear-gradient(135deg,var(--rose),var(--yellow));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }

        /* Floating tags — no emoji, small coloured pill labels */
        .ftag {
          position:absolute;
          background:white; border:1.5px solid rgba(0,0,0,.07);
          border-radius:100px; padding:7px 14px;
          font-size:11px; font-family:'DM Mono',monospace;
          white-space:nowrap; z-index:3;
          box-shadow:0 4px 14px rgba(0,0,0,.07);
          display:flex; align-items:center; gap:6px;
        }
        .ftag-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
        .ft1{top:16px;right:-62px;color:var(--rose);border-color:rgba(242,96,122,.22);animation:flt1 4s ease-in-out infinite alternate;}
        .ft2{bottom:88px;left:-76px;color:var(--peach);border-color:rgba(255,140,97,.22);animation:flt2 4.5s ease-in-out infinite alternate;}
        .ft3{top:43%;right:-82px;color:var(--teal);border-color:rgba(62,201,182,.22);animation:flt1 5s ease-in-out infinite alternate;}
        .ft4{bottom:26px;right:-24px;color:var(--green);border-color:rgba(69,168,116,.22);animation:flt2 3.5s ease-in-out infinite alternate;}
        @keyframes flt1{from{transform:translateY(0)}to{transform:translateY(-10px)}}
        @keyframes flt2{from{transform:translateY(0)}to{transform:translateY(-8px)}}

        /* Scroll hint */
        .scroll-hint{
          position:absolute;bottom:36px;left:50%;transform:translateX(-50%);
          display:flex;flex-direction:column;align-items:center;gap:8px;
          color:var(--muted);font-size:11px;font-family:'DM Mono',monospace;
          animation:fadeUp 1s ease 1.2s both;z-index:2;pointer-events:none;
        }
        .sarrow{
          width:18px;height:18px;
          border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);
          transform:rotate(45deg);animation:sbounce 2s ease infinite;
        }
        @keyframes sbounce{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(5px)}}

        /* ── MARQUEE ── */
        .marquee-wrap{
          overflow:hidden;padding:18px 0;
          background:white;
          border-top:1.5px solid rgba(0,0,0,.05);
          border-bottom:1.5px solid rgba(0,0,0,.05);
          position:relative;z-index:2;
        }
        .marquee-track{display:flex;gap:36px;animation:mscroll 24s linear infinite;width:max-content;}
        .mitem{
          font-family:'Kirang Haerang',cursive;font-size:15px;
          color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;
          white-space:nowrap;display:flex;align-items:center;gap:36px;
        }
        .mitem::after{
          content:'';display:block;width:5px;height:5px;border-radius:50%;background:var(--rose);
        }
        @keyframes mscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── SECTIONS ── */
        .sec{
          padding:88px 64px;max-width:1180px;margin:0 auto;
          position:relative;z-index:2;
        }

        .sl{
          font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);
          text-transform:uppercase;letter-spacing:3px;margin-bottom:10px;
          opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s;
        }
        .sl.visible{opacity:1;transform:translateY(0);}

        .st{
          font-family:'Kirang Haerang',cursive;
          font-size:clamp(34px,4.5vw,52px);
          letter-spacing:-1px;margin-bottom:48px;color:var(--text);
          opacity:0;transform:translateY(16px);transition:opacity .6s .1s,transform .6s .1s;
        }
        .st.visible{opacity:1;transform:translateY(0);}

        /* ── STATS ── */
        .stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .stat-box{
          background:white;border:1.5px solid var(--border);border-radius:20px;
          padding:28px 24px;text-align:center;
          box-shadow:0 2px 14px rgba(0,0,0,.04);
          transition:transform .2s,box-shadow .2s;
        }
        .stat-box:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,.09);}
        .stat-num{
          font-family:'Kirang Haerang',cursive;
          font-size:52px;line-height:1;margin-bottom:6px;
        }
        .stat-lbl{font-size:12px;color:var(--muted);font-family:'DM Mono',monospace;}

        /* ── CARDS ── */
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;}

        .card{
          background:white;border:1.5px solid var(--border);border-radius:22px;
          padding:28px;position:relative;overflow:hidden;
          opacity:0;transform:translateY(26px);
          box-shadow:0 2px 14px rgba(0,0,0,.04);
          transition:border-color .3s,box-shadow .3s;
        }
        .card.visible{
          opacity:1;transform:translateY(0);
          transition:opacity .6s ease,transform .6s ease,border-color .3s,box-shadow .3s;
        }
        .card:hover{box-shadow:0 16px 44px rgba(0,0,0,.1);transform:translateY(-5px)!important;border-color:rgba(0,0,0,.11);}
        .card::before{
          content:'';position:absolute;top:0;left:0;right:0;height:3px;
          opacity:0;transition:opacity .3s;border-radius:22px 22px 0 0;
        }
        .card:hover::before{opacity:1;}
        .cr::before{background:linear-gradient(90deg,var(--rose),var(--peach));}
        .cp::before{background:linear-gradient(90deg,var(--peach),var(--yellow));}
        .cg::before{background:linear-gradient(90deg,var(--green),var(--teal));}
        .cs::before{background:linear-gradient(90deg,var(--sky),var(--lavender));}
        .cy::before{background:linear-gradient(90deg,var(--yellow),var(--peach));}
        .cl::before{background:linear-gradient(90deg,var(--lavender),var(--sky));}
        .ct::before{background:linear-gradient(90deg,var(--teal),var(--green));}

        .card-full{grid-column:1/-1;}
        .card-spring{
          background:linear-gradient(135deg,#f0fff7,#eafdf5);
          border-color:rgba(69,168,116,.22);
        }
        .card-sun{
          background:linear-gradient(135deg,#fffbee,#fff7e0);
          border-color:rgba(245,196,48,.3);
        }

        .feat-badge{
          display:inline-flex;align-items:center;gap:6px;
          border-radius:100px;padding:4px 12px;
          font-size:11px;font-family:'DM Mono',monospace;
          margin-bottom:14px;
        }
        .feat-badge-green{background:rgba(69,168,116,.12);border:1.5px solid rgba(69,168,116,.28);color:var(--green);}
        .feat-badge-yellow{background:rgba(245,196,48,.14);border:1.5px solid rgba(245,196,48,.4);color:#8a6c00;}

        /* Badge dot for feat-badge */
        .bdot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
        .bdot-green{background:var(--green);}
        .bdot-yellow{background:var(--yellow);}

        .feat-inner{display:grid;grid-template-columns:1fr auto;gap:32px;align-items:start;}

        /* Flores visual — SVG flower, no emoji */
        .flores-vis{
          width:100px;height:100px;border-radius:18px;
          background:linear-gradient(135deg,#d4f7e5,#a8edcc);
          border:1.5px solid rgba(69,168,116,.28);
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;
          animation:floatSpin 6s ease-in-out infinite alternate;
        }
        @keyframes floatSpin{
          0%  {transform:translateY(0) rotate(-4deg);}
          100%{transform:translateY(-8px) rotate(4deg);}
        }

        /* Volunteer thumb */
        .vol-thumb{
          width:176px;height:176px;flex-shrink:0;
          border-radius:16px;overflow:hidden;
          background:linear-gradient(135deg,#fdecc8,#fce4b0);
          display:flex;align-items:center;justify-content:center;
        }
        .vol-thumb img{width:100%;height:100%;object-fit:cover;}
        .vol-ph{
          display:flex;flex-direction:column;align-items:center;gap:8px;
          padding:12px;text-align:center;
          font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);
        }

        /* Country flag as colored block (no emoji) */
        .flag-bg{
          width:48px;height:34px;border-radius:6px;overflow:hidden;
          display:flex;flex-direction:column;flex-shrink:0;
        }
        .flag-bg.bg{display:flex;flex-direction:row;}

        .wy {font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:7px;display:flex;align-items:center;gap:7px;}
        .wdot{width:6px;height:6px;border-radius:50%;background:var(--rose);flex-shrink:0;}
        .wrole{font-family:'Kirang Haerang',cursive;font-size:20px;margin-bottom:3px;color:var(--text);}
        .worg{font-size:13px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:12px;}
        .wdesc{font-size:14px;line-height:1.72;color:rgba(42,38,32,.7);}
        .wtags{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;}
        .tag{
          font-family:'DM Mono',monospace;font-size:11px;
          padding:4px 10px;border-radius:100px;border:1.5px solid;font-weight:500;
        }
        .tr{color:#b82040;border-color:rgba(242,96,122,.32);background:rgba(242,96,122,.07);}
        .tp{color:#bf5020;border-color:rgba(255,140,97,.32);background:rgba(255,140,97,.07);}
        .ty{color:#8a6c00;border-color:rgba(245,196,48,.45);background:rgba(245,196,48,.09);}
        .tg{color:#2c7a50;border-color:rgba(69,168,116,.32);background:rgba(69,168,116,.07);}
        .tt{color:#197a6e;border-color:rgba(62,201,182,.32);background:rgba(62,201,182,.07);}
        .ts{color:#1a5a9a;border-color:rgba(91,174,232,.32);background:rgba(91,174,232,.07);}
        .tl{color:#5230c8;border-color:rgba(155,126,240,.32);background:rgba(155,126,240,.07);}

        /* ── EDUCATION TIMELINE ── */
        .edu-tl{position:relative;padding-left:36px;}
        .edu-tl::before{
          content:'';position:absolute;left:0;top:8px;bottom:8px;width:2px;
          background:linear-gradient(180deg,var(--rose),var(--yellow),var(--teal),var(--lavender),var(--peach));
          border-radius:2px;
        }
        .edu-item{
          position:relative;margin-bottom:36px;
          opacity:0;transform:translateX(-14px);
          transition:opacity .5s,transform .5s;
        }
        .edu-item.visible{opacity:1;transform:translateX(0);}
        .edu-item::before{
          content:'';position:absolute;left:-42px;top:7px;
          width:12px;height:12px;border-radius:50%;
          background:white;border:2.5px solid var(--rose);transition:background .25s;
        }
        .edu-item:nth-child(2)::before{border-color:var(--yellow);}
        .edu-item:nth-child(3)::before{border-color:var(--teal);}
        .edu-item:nth-child(4)::before{border-color:var(--lavender);}
        .edu-item:nth-child(5)::before{border-color:var(--peach);}
        .edu-item:hover::before{background:var(--rose);}
        .edu-yr{font-family:'DM Mono',monospace;font-size:11px;color:var(--rose);margin-bottom:5px;}
        .edu-deg{font-family:'Kirang Haerang',cursive;font-size:19px;margin-bottom:3px;color:var(--text);}
        .edu-sch{font-size:13px;color:var(--muted);}

        /* ── SKILLS ── */
        .skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:12px;}
        .skill-chip{
          background:white;border:1.5px solid var(--border);border-radius:16px;
          padding:18px 12px;text-align:center;cursor:default;
          opacity:0;transform:scale(.88);
          box-shadow:0 2px 10px rgba(0,0,0,.04);
          transition:border-color .2s,box-shadow .2s;
        }
        .skill-chip.visible{opacity:1;transform:scale(1);transition:opacity .4s ease,transform .4s ease,border-color .2s,box-shadow .2s;}
        .skill-chip:hover{transform:scale(1.07)!important;box-shadow:0 10px 26px rgba(0,0,0,.1);border-color:rgba(242,96,122,.28);}

        /* Skill icon — small SVG color blob instead of emoji */
        .sico{
          width:32px;height:32px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 10px;font-size:0;
        }
        .sico svg{width:18px;height:18px;display:block;}
        .sname{font-size:12px;font-family:'DM Mono',monospace;color:var(--text);}

        /* ── LANGUAGES ── */
        .lang-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
        .lang-card{
          background:white;border:1.5px solid var(--border);border-radius:20px;
          padding:26px 22px;text-align:center;
          opacity:0;transform:translateY(18px);
          box-shadow:0 2px 12px rgba(0,0,0,.04);
        }
        .lang-card.visible{opacity:1;transform:translateY(0);transition:opacity .5s ease,transform .5s ease,box-shadow .2s;}
        .lang-card:hover{transform:translateY(-5px)!important;box-shadow:0 14px 34px rgba(0,0,0,.09);}
        .llevel{font-family:'Kirang Haerang',cursive;font-size:40px;margin-bottom:3px;}
        .lname{font-size:14px;color:var(--text);font-weight:600;margin-bottom:2px;}
        .lcert{font-size:11px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:12px;}
        .lbar{height:4px;background:rgba(0,0,0,.07);border-radius:2px;overflow:hidden;}
        .lf{height:100%;border-radius:2px;width:0%;transition:width 1s ease .3s;}

        /* ── CONTACT ── */
        .contact{
          background:white;border-top:1.5px solid rgba(0,0,0,.06);
          padding:80px 64px;text-align:center;
          position:relative;overflow:hidden;z-index:2;
        }
        .contact::before{
          content:'';position:absolute;top:0;left:0;right:0;height:4px;
          background:linear-gradient(90deg,var(--rose),var(--peach),var(--yellow),var(--teal),var(--lavender));
        }
        .ctitle{
          font-family:'Kirang Haerang',cursive;
          font-size:clamp(28px,4vw,50px);
          margin-bottom:32px;letter-spacing:-.5px;color:var(--text);
        }
        .ctitle span{
          background:linear-gradient(120deg,var(--rose),var(--peach),var(--yellow));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .cbtn{
          display:inline-flex;align-items:center;gap:10px;
          background:var(--rose);color:white;text-decoration:none;
          padding:15px 36px;border-radius:100px;
          font-size:15px;font-weight:600;
          transition:transform .2s,box-shadow .2s;
          box-shadow:0 4px 18px rgba(242,96,122,.28);
        }
        .cbtn:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 16px 38px rgba(242,96,122,.38);}
        .clinks{margin-top:22px;color:var(--muted);font-size:13px;font-family:'DM Mono',monospace;}
        .clinks a{text-decoration:none;transition:opacity .2s;}
        .clinks a:hover{opacity:.75;}

        /* ── UTILS ── */
        @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

        @media(max-width:800px){
          .hero{grid-template-columns:1fr;}
          .hero-right{display:none;}
          .sec{padding:60px 24px;}
          .grid2{grid-template-columns:1fr;}
          .lang-grid{grid-template-columns:1fr 1fr;}
          .stat-row{grid-template-columns:repeat(2,1fr);}
          .feat-inner{grid-template-columns:1fr;}
          .hero-left{padding:60px 24px;}
          .contact{padding:48px 24px;}
        }
      `}</style>

      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className="cursor-ring" />
      <div id="petal-layer" aria-hidden="true" />

      {/* ────────── HERO ────────── */}
      <div className="hero">
        <div id="blob1" className="blob blob1" />
        <div id="blob2" className="blob blob2" />
        <div id="blob3" className="blob blob3" />

        <div className="hero-left">
          <div className="status">
            <div className="sdot" />
            open to opportunities
          </div>

          <h1 className="hero-name">
            Maria
            <span className="name-color">Brito</span>
          </h1>

          <p className="hero-sub">
            Educator · Designer · <b>Co-founder</b> · Tech Enthusiast
          </p>

          <div className="hero-links">
            <a href="mailto:mariajgbrito@hotmail.com" className="hlink hlink-email">
              <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="white" strokeWidth="1.4"/><path d="M1 5l7 5 7-5" stroke="white" strokeWidth="1.4"/></svg>
              mariajgbrito@hotmail.com
            </a>
            <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" className="hlink hlink-li">
              <svg className="ico" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="3" stroke="#1a5ea0" strokeWidth="1.4"/><path d="M4 7v5M4 5v-.5" stroke="#1a5ea0" strokeWidth="1.4" strokeLinecap="round"/><path d="M7.5 12V9c0-1.1.9-2 2-2s2 .9 2 2v3" stroke="#1a5ea0" strokeWidth="1.4" strokeLinecap="round"/></svg>
              LinkedIn
            </a>
            <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" className="hlink hlink-flores">
              <svg className="ico" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#45A874" strokeWidth="1.4"/><path d="M8 5v6M5 8h6" stroke="#45A874" strokeWidth="1.4" strokeLinecap="round"/></svg>
              floresabeirario.pt
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="photo-frame">
            <div className="photo-ring" />
            <div className="photo-inner">
              <img src="/mj.webp" alt="Maria Brito"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const ph = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if (ph) ph.style.display = "flex";
                }}
              />
              <div className="photo-ph" style={{ display:"none" }}>
                <div className="photo-initials">MJB</div>
                <span>add mj.webp to<br />public/ folder</span>
              </div>
            </div>

            <div className="ftag ft1"><div className="ftag-dot" style={{background:"var(--rose)"}} />Design</div>
            <div className="ftag ft2"><div className="ftag-dot" style={{background:"var(--peach)"}} />AI Coach</div>
            <div className="ftag ft3"><div className="ftag-dot" style={{background:"var(--teal)"}} />Educator</div>
            <div className="ftag ft4"><div className="ftag-dot" style={{background:"var(--green)"}} />Founder</div>
          </div>
        </div>

        <div className="scroll-hint"><span>scroll</span><div className="sarrow" /></div>
      </div>

      {/* ────────── MARQUEE ────────── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {["Design","AI Education","Flower Preservation","Web Dev","Youth Workshops","Visual Storytelling","Oil Painting","Creative Tech",
            "Design","AI Education","Flower Preservation","Web Dev","Youth Workshops","Visual Storytelling","Oil Painting","Creative Tech",
          ].map((item, i) => <div key={i} className="mitem">{item}</div>)}
        </div>
      </div>

      {/* ────────── STATS ────────── */}
      <section className="sec">
        <div className="sl">at a glance</div>
        <div className="st">By the numbers</div>
        <div className="stat-row">
          <div className="stat-box">
            <div className="stat-num" style={{color:"var(--rose)"}} data-count="5">0</div>
            <div className="stat-lbl">years teaching</div>
          </div>
          <div className="stat-box">
            <div className="stat-num" style={{color:"var(--peach)"}} data-count="2">0</div>
            <div className="stat-lbl">languages</div>
          </div>
          <div className="stat-box">
            <div className="stat-num" style={{color:"var(--green)"}} data-count="1">0</div>
            <div className="stat-lbl">company co-founded</div>
          </div>
        </div>
      </section>

      {/* ────────── WORK ────────── */}
      <section className="sec">
        <div className="sl">career</div>
        <div className="st">Work experience</div>
        <div className="grid2">

          {/* Flores à Beira-Rio */}
          <div className="card card-full card-spring cg" data-delay="0">
            <div className="feat-badge feat-badge-green">
              <div className="bdot bdot-green" />Latest venture
            </div>
            <div className="feat-inner">
              <div>
                <div className="wy"><div className="wdot" style={{background:"var(--green)"}} /><span style={{color:"var(--green)"}}>2025 to Present</span></div>
                <div className="wrole">Co-Founder</div>
                <div className="worg">Flores à Beira-Rio · floresabeirario.pt</div>
                <p className="wdesc">Co-founded a flower preservation company, turning fresh botanicals into lasting art. Leads design, branding, digital presence, and creative direction.</p>
                <div className="wtags">
                  <span className="tag tg">Entrepreneurship</span>
                  <span className="tag tt">Branding</span>
                  <span className="tag tg">Creative Direction</span>
                </div>
              </div>
              <div className="flores-vis">
                <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="58" height="58">
                  <ellipse cx="30" cy="14" rx="8" ry="13" fill="#4CAF82" opacity=".9"/>
                  <ellipse cx="30" cy="14" rx="8" ry="13" fill="#4CAF82" opacity=".9" transform="rotate(72 30 30)"/>
                  <ellipse cx="30" cy="14" rx="8" ry="13" fill="#3EC9B6" opacity=".85" transform="rotate(144 30 30)"/>
                  <ellipse cx="30" cy="14" rx="8" ry="13" fill="#3EC9B6" opacity=".85" transform="rotate(216 30 30)"/>
                  <ellipse cx="30" cy="14" rx="8" ry="13" fill="#4CAF82" opacity=".9" transform="rotate(288 30 30)"/>
                  <circle cx="30" cy="30" r="8" fill="white" opacity=".95"/>
                  <circle cx="30" cy="30" r="4" fill="#F9C846" opacity=".9"/>
                </svg>
              </div>
            </div>
          </div>

          {/* TUMO Learning Coach */}
          <div className="card cr" data-delay="80">
            <div className="wy"><div className="wdot" />Sep 2023 to Present</div>
            <div className="wrole">Learning Coach</div>
            <div className="worg">TUMO Coimbra</div>
            <p className="wdesc">Supports teens 12 to 18 in self-directed learning across animation, game development, filmmaking, music, robotics, and 3D modeling. Guides, motivates, and tracks student progress.</p>
            <div className="wtags">
              <span className="tag tr">Youth Tech</span>
              <span className="tag tp">Coaching</span>
              <span className="tag tl">Game Dev</span>
            </div>
          </div>

          {/* TUMO Info Desk */}
          <div className="card cp" data-delay="140">
            <div className="wy"><div className="wdot" style={{background:"var(--peach)"}} /><span style={{color:"var(--peach)"}}>Dec 2023 to Aug 2025</span></div>
            <div className="wrole">Info Desk</div>
            <div className="worg">TUMO Coimbra</div>
            <p className="wdesc">Managed student enquiries, check-in and check-out, registration and enrolment, database upkeep, and parent communication.</p>
            <div className="wtags">
              <span className="tag tp">Operations</span>
              <span className="tag ty">Administration</span>
            </div>
          </div>

          {/* Clonlara */}
          <div className="card cl" data-delay="200">
            <div className="wy"><div className="wdot" style={{background:"var(--lavender)"}} /><span style={{color:"var(--lavender)"}}>Oct 2023 to Aug 2025</span></div>
            <div className="wrole">Middle School Teacher</div>
            <div className="worg">Colégio de São José · Clonlara Program</div>
            <p className="wdesc">Teaching Mathematics and Information and Communication Technologies within a personalised learning programme that fosters authenticity, autonomy, and joy in learning.</p>
            <div className="wtags">
              <span className="tag tl">Mathematics</span>
              <span className="tag ts">ICT</span>
              <span className="tag tl">Personalised Learning</span>
            </div>
          </div>

          {/* Escola Tenente Valadim */}
          <div className="card ct" data-delay="260">
            <div className="wy"><div className="wdot" style={{background:"var(--teal)"}} /><span style={{color:"var(--teal)"}}>Sep 2022 to Present</span></div>
            <div className="wrole">Middle School Teacher</div>
            <div className="worg">Escola Tenente Valadim</div>
            <p className="wdesc">Teaching Visual Education, Technology Education, and Design in Interactive Media. Develops creative expression and aesthetic understanding through art and technology.</p>
            <div className="wtags">
              <span className="tag tt">Visual Education</span>
              <span className="tag ts">Interactive Design</span>
            </div>
          </div>

          {/* Homeschooling */}
          <div className="card cs" data-delay="320">
            <div className="wy"><div className="wdot" style={{background:"var(--sky)"}} /><span style={{color:"var(--sky)"}}>2022 to 2024</span></div>
            <div className="wrole">Middle School Teacher</div>
            <div className="worg">Homeschooling · ages 11 to 14</div>
            <p className="wdesc">Teaching Technological Education, Visual Education, and Design in Interactive Media to homeschooled students.</p>
            <div className="wtags">
              <span className="tag ts">Interactive Design</span>
              <span className="tag tt">Visual Education</span>
            </div>
          </div>

        </div>
      </section>

      {/* ────────── INTERNSHIPS ────────── */}
      <section className="sec">
        <div className="sl">experience abroad</div>
        <div className="st">Internships</div>
        <div className="grid2">

          <div className="card cr" data-delay="0">
            <div className="wy"><div className="wdot" />Sep 2021 to Mar 2022 · Paris, France</div>
            <div className="wrole">Production and Creative Direction</div>
            <div className="worg">Julien Tavel, Fashion Photographer</div>
            <p className="wdesc">Production and photo crew assistant to an internationally recognised fashion photographer. Created mood boards, designed 3D portfolio boxes, reorganised a seven-year photographic archive, and handled logistics and equipment.</p>
            <div className="wtags">
              <span className="tag tr">Fashion</span>
              <span className="tag ts">Photography</span>
              <span className="tag tp">3D Modeling</span>
              <span className="tag ty">Creative Direction</span>
            </div>
          </div>

          <div className="card cs" data-delay="140">
            <div className="wy"><div className="wdot" style={{background:"var(--sky)"}} /><span style={{color:"var(--sky)"}}>Jul to Aug 2021 · Athens, Greece</span></div>
            <div className="wrole">Graphic and Email Designer</div>
            <div className="worg">ShipLemon · DeliverBack</div>
            <p className="wdesc">Web design, graphic design, and email and newsletter optimisation for two tech startups. Built mobile-friendly templates and marketing materials across multiple team departments.</p>
            <div className="wtags">
              <span className="tag ts">Web Design</span>
              <span className="tag tt">Email Design</span>
              <span className="tag tp">Graphic Design</span>
            </div>
          </div>

        </div>
      </section>

      {/* ────────── VOLUNTEERING ────────── */}
      <section className="sec">
        <div className="sl">giving back</div>
        <div className="st">Volunteering</div>
        <div className="grid2">
          <div className="card card-full card-sun cy" data-delay="0">
            <div className="feat-badge feat-badge-yellow">
              <div className="bdot bdot-yellow" />Volunteer
            </div>
            <div className="feat-inner">
              <div>
                <div className="wy"><div className="wdot" style={{background:"var(--yellow)"}} /><span style={{color:"#8a6c00"}}>Jul to Aug 2024 · Bulgaria</span></div>
                <div className="wrole">Summer Activities Creator</div>
                <div className="worg">SOS Children's Villages · Future World Association</div>
                <p className="wdesc">Created and led summer activities for children at SOS Children's Villages, bringing creativity, play, and warmth through hands-on workshops and joyful programming.</p>
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
                  <svg width="40" height="28" viewBox="0 0 40 28"><rect width="40" height="9.3" fill="#fff"/><rect y="9.3" width="40" height="9.3" fill="#009B74"/><rect y="18.6" width="40" height="9.4" fill="#D01C1F"/></svg>
                  <span>bulgaria.webp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── EDUCATION ────────── */}
      <section className="sec">
        <div className="sl">academia</div>
        <div className="st">Education</div>
        <div className="edu-tl">
          <div className="edu-item">
            <div className="edu-yr">2016 to 2019</div>
            <div className="edu-deg">Bachelor's Degree in Design and Multimedia</div>
            <div className="edu-sch">University of Coimbra · Faculty of Sciences and Technology</div>
          </div>
          <div className="edu-item">
            <div className="edu-yr" style={{color:"var(--yellow)"}}>Mar to Jun 2023</div>
            <div className="edu-deg" style={{fontSize:"17px"}}>Computational Thinking in Maths with Scratch</div>
            <div className="edu-sch">CENFORMAZ</div>
          </div>
          <div className="edu-item">
            <div className="edu-yr" style={{color:"var(--teal)"}}>Jun to Jul 2023</div>
            <div className="edu-deg" style={{fontSize:"17px"}}>Oil Painting Techniques</div>
            <div className="edu-sch">CEARTE · Fine and Studio Arts</div>
          </div>
          <div className="edu-item">
            <div className="edu-yr" style={{color:"var(--lavender)"}}>Jan to Apr 2021</div>
            <div className="edu-deg" style={{fontSize:"17px"}}>Fundamentals of Digital Marketing</div>
            <div className="edu-sch">The Open University</div>
          </div>
          <div className="edu-item">
            <div className="edu-yr" style={{color:"var(--peach)"}}>2008 to 2012</div>
            <div className="edu-deg" style={{fontSize:"17px"}}>Music Course, Clarinet 5th Grade</div>
            <div className="edu-sch">Escola de Música · Colégio São Teotónio</div>
          </div>
        </div>
      </section>

      {/* ────────── SKILLS ────────── */}
      <section className="sec">
        <div className="sl">toolkit</div>
        <div className="st">Software and Skills</div>
        <div className="skills-grid">
          {([
            { name:"Illustrator",  bg:"#FF8C61", svg:<><rect x="3" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.4"/><path d="M7 15l2-4 2 4M8.3 12h1.4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></> },
            { name:"InDesign",     bg:"#F2607A", svg:<><rect x="3" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.4"/><path d="M8 6v8M8 6c2.5 0 4 1 4 4s-1.5 4-4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></> },
            { name:"Photoshop",    bg:"#5BAEE8", svg:<><rect x="3" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.4"/><path d="M7 6v8M7 6c2 0 3.5.8 3.5 2.5S9 11 7 11" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></> },
            { name:"Premiere",     bg:"#9B7EF0", svg:<><rect x="3" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.4"/><path d="M8 7l5 3-5 3V7z" fill="white"/></> },
            { name:"Lightroom",    bg:"#3EC9B6", svg:<><rect x="3" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.4"/><circle cx="10" cy="10" r="3" stroke="white" strokeWidth="1.2"/><path d="M8 5v2M12 5v2" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></> },
            { name:"HTML",         bg:"#FF8C61", svg:<><path d="M4 3l1 11 5 2 5-2 1-11H4z" stroke="white" strokeWidth="1.3" fill="none"/><path d="M7 7h6M7.5 10h5L12 13l-2.5.7L7 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></> },
            { name:"CSS",          bg:"#5BAEE8", svg:<><path d="M4 3l1 11 5 2 5-2 1-11H4z" stroke="white" strokeWidth="1.3" fill="none"/><path d="M7 7h6M7 10h5l-.5 2.5-2 .5-1.5-.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></> },
            { name:"MS Office",    bg:"#45A874", svg:<><rect x="3" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.4"/><path d="M6 7h8M6 10h8M6 13h5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></> },
            { name:"AI Tools",     bg:"#9B7EF0", svg:<><circle cx="10" cy="10" r="6.5" stroke="white" strokeWidth="1.4"/><path d="M8 10h4M10 8v4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></> },
            { name:"Scratch",      bg:"#F5C430", svg:<><circle cx="10" cy="10" r="6.5" stroke="white" strokeWidth="1.4"/><path d="M8 8c0-1 3-1 3 .5s-3 1.5-3 3 3 1 3 0" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></> },
            { name:"Prompting",    bg:"#F2607A", svg:<><rect x="3" y="5" width="14" height="10" rx="2" stroke="white" strokeWidth="1.4"/><path d="M7 9h6M7 12h4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></> },
            { name:"Oil Painting", bg:"#FF8C61", svg:<><path d="M10 3c-2.5 2-4 5-3 8 .5 2 2 3 3 3s2.5-1 3-3c1-3-.5-6-3-8z" stroke="white" strokeWidth="1.3" fill="none"/><path d="M10 14v3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></> },
            { name:"Web Design",   bg:"#3EC9B6", svg:<><rect x="3" y="4" width="14" height="12" rx="2" stroke="white" strokeWidth="1.4"/><path d="M3 7h14M7 4v3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></> },
            { name:"Clarinet",     bg:"#9B7EF0", svg:<><path d="M10 3v12M8 5h4M8 8h4M8 11h3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="15" r="1.5" stroke="white" strokeWidth="1.2"/></> },
          ] as { name: string; bg: string; svg: React.ReactNode }[]).map((s, i) => (
            <div key={s.name} className="skill-chip" data-d={i * 0.05}>
              <div className="sico" style={{background: s.bg + "22", border: `1.5px solid ${s.bg}44`}}>
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: s.bg}}>
                  {s.svg}
                </svg>
              </div>
              <div className="sname">{s.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────── LANGUAGES ────────── */}
      <section className="sec">
        <div className="sl">communication</div>
        <div className="st">Languages</div>
        <div className="lang-grid">
          {[
            { code:"PT", name:"Portuguese", cert:"Native",      w:100, color:"var(--rose)", d:0    },
            { code:"EN", name:"English",    cert:"Native / C2", w:98,  color:"var(--sky)",  d:0.12 },
          ].map(l => (
            <div key={l.code} className="lang-card" data-d={l.d}>
              <div className="llevel" style={{color:l.color}}>{l.code}</div>
              <div className="lname">{l.name}</div>
              <div className="lcert">{l.cert}</div>
              <div className="lbar"><div className="lf" data-w={l.w} style={{background:l.color}} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────── CONTACT ────────── */}
      <div className="contact">
        <div className="ctitle">
          Let&rsquo;s build something <span>beautiful</span> together.
        </div>
        <a href="mailto:mariajgbrito@hotmail.com" className="cbtn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="white" strokeWidth="1.4"/><path d="M1 5l7 5 7-5" stroke="white" strokeWidth="1.4"/></svg>
          Get in touch
        </a>
        <div className="clinks">
          mariajgbrito@hotmail.com &nbsp;&middot;&nbsp;
          <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" style={{color:"var(--sky)"}}>
            linkedin.com/in/mariajbrito
          </a>
          &nbsp;&middot;&nbsp;
          <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" style={{color:"var(--green)"}}>
            floresabeirario.pt
          </a>
        </div>
      </div>
    </>
  );
}
