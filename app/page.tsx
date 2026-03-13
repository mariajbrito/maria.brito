"use client";

import { useEffect, useRef } from "react";

const PETALS = ["🌸", "🌼", "🌺", "🌷", "✿", "❀", "🌻", "💐"];

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── FLOATING PETALS ──
    const petalContainer = document.getElementById("petal-layer");
    if (petalContainer) {
      for (let i = 0; i < 28; i++) {
        const el = document.createElement("div");
        el.className = "petal";
        el.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
        el.style.cssText = `
          left: ${Math.random() * 100}vw;
          animation-duration: ${8 + Math.random() * 12}s;
          animation-delay: ${-Math.random() * 15}s;
          font-size: ${12 + Math.random() * 18}px;
          opacity: ${0.4 + Math.random() * 0.5};
        `;
        petalContainer.appendChild(el);
      }
    }

    // ── CURSOR ──
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      const b1 = document.getElementById("blob1");
      const b2 = document.getElementById("blob2");
      const b3 = document.getElementById("blob3");
      if (b1) b1.style.transform = `translate(${x}px, ${y}px)`;
      if (b2) b2.style.transform = `translate(${-x * 0.8}px, ${-y * 0.8}px)`;
      if (b3) b3.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    };

    const animCursor = () => {
      if (cursorRef.current) { cursorRef.current.style.left = mx + "px"; cursorRef.current.style.top = my + "px"; }
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(animCursor);
    };
    raf = requestAnimationFrame(animCursor);
    document.addEventListener("mousemove", onMouseMove);

    const enterH = () => {
      if (cursorRef.current) { cursorRef.current.style.width = "20px"; cursorRef.current.style.height = "20px"; }
      if (ringRef.current) { ringRef.current.style.width = "56px"; ringRef.current.style.height = "56px"; }
    };
    const leaveH = () => {
      if (cursorRef.current) { cursorRef.current.style.width = "10px"; cursorRef.current.style.height = "10px"; }
      if (ringRef.current) { ringRef.current.style.width = "36px"; ringRef.current.style.height = "36px"; }
    };
    document.querySelectorAll("a, button, .card, .skill-chip").forEach(el => {
      el.addEventListener("mouseenter", enterH);
      el.addEventListener("mouseleave", leaveH);
    });

    // ── SCROLL REVEAL ──
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });

    document.querySelectorAll(".section-label, .section-title, .edu-item").forEach(el => io.observe(el));

    document.querySelectorAll<HTMLElement>(".card").forEach(card => {
      const delay = parseFloat(card.dataset.delay ?? "0");
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), delay);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.08 });
      obs.observe(card);
    });

    document.querySelectorAll<HTMLElement>(".skill-chip").forEach(chip => {
      const delay = parseFloat(chip.dataset.d ?? "0") * 1000;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { setTimeout(() => e.target.classList.add("visible"), delay); obs.unobserve(e.target); }
        });
      }, { threshold: 0.08 });
      obs.observe(chip);
    });

    document.querySelectorAll<HTMLElement>(".lang-card").forEach(el => {
      const delay = parseFloat(el.dataset.d ?? "0") * 1000;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.classList.add("visible");
              (e.target as HTMLElement).querySelectorAll<HTMLElement>(".lang-fill").forEach(bar => {
                setTimeout(() => { bar.style.width = (bar.dataset.w ?? "0") + "%"; }, 300);
              });
            }, delay);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.08 });
      obs.observe(el);
    });

    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const target = parseInt((e.target as HTMLElement).dataset.count ?? "0");
            let cur = 0;
            const t = setInterval(() => { cur = Math.min(cur + 1, target); e.target.textContent = String(cur); if (cur >= target) clearInterval(t); }, 80);
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
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --rose:     #F2607A;
          --peach:    #FF8C61;
          --yellow:   #F9C846;
          --green:    #4CAF82;
          --teal:     #3EC9B6;
          --sky:      #64B5F6;
          --lavender: #A78BFA;
          --cardBg:   #FFFFFF;
          --cardBorder: rgba(0,0,0,0.07);
          --text:     #2D2A26;
          --muted:    #9B8FA0;
          --pageBg:   #FDF6EE;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          background: var(--pageBg);
          color: var(--text);
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        .cursor {
          width: 10px; height: 10px;
          background: var(--rose);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width .2s, height .2s;
        }
        .cursor-ring {
          width: 36px; height: 36px;
          border: 1.5px solid var(--rose);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width .2s, height .2s;
          opacity: 0.55;
        }

        #petal-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .petal {
          position: absolute;
          top: -60px;
          animation: petalFall linear infinite;
          user-select: none;
          will-change: transform;
        }

        @keyframes petalFall {
          0%   { transform: translateY(-60px) rotate(0deg) translateX(0px); opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(720deg) translateX(70px); opacity: 0; }
        }

        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.22;
          animation: blobPulse 7s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }
        .blob1 { width: 500px; height: 500px; background: var(--rose);   top: -150px; left: -100px; }
        .blob2 { width: 400px; height: 400px; background: var(--yellow); bottom: -100px; right: -60px; animation-delay: -3s; }
        .blob3 { width: 300px; height: 300px; background: var(--teal);   top: 40%; left: 45%; animation-delay: -1.5s; }

        @keyframes blobPulse { from{transform:scale(1)} to{transform:scale(1.2) rotate(15deg)} }

        .hero-left {
          padding: 80px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .status-badge {
          display: inline-flex;
          align-items: center; gap: 8px;
          background: rgba(76,175,130,0.12);
          border: 1.5px solid rgba(76,175,130,0.35);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 12px;
          font-family: 'DM Mono', monospace;
          color: var(--green);
          margin-bottom: 28px;
          width: fit-content;
          animation: fadeUp .8s ease both;
        }

        .status-dot {
          width: 7px; height: 7px;
          background: var(--green);
          border-radius: 50%;
          animation: blink 2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

        .hero-name {
          font-family: 'Fraunces', serif;
          font-size: clamp(64px, 8vw, 108px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -3px;
          margin-bottom: 20px;
          animation: fadeUp .8s ease .1s both;
          color: var(--text);
        }

        .name-gradient {
          display: block;
          background: linear-gradient(120deg, var(--rose), var(--peach), var(--yellow));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 15px;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          margin-bottom: 36px;
          line-height: 1.6;
          animation: fadeUp .8s ease .2s both;
        }

        .hero-links {
          display: flex; gap: 12px; flex-wrap: wrap;
          animation: fadeUp .8s ease .3s both;
        }

        .hero-link {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          text-decoration: none;
          font-weight: 500;
          transition: transform .2s, box-shadow .2s;
        }
        .hero-link:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.12); }
        .link-email    { background: var(--rose); color: white; }
        .link-linkedin { background: rgba(100,181,246,.15); border: 1.5px solid rgba(100,181,246,.4); color: #1a5fa0; }
        .link-flores   { background: rgba(76,175,130,.12); border: 1.5px solid rgba(76,175,130,.4); color: var(--green); }

        .photo-frame {
          position: relative;
          width: 300px; height: 370px;
          animation: fadeUp .8s ease .4s both;
        }

        .photo-ring {
          position: absolute; inset: 0;
          border-radius: 150px 150px 50px 50px;
          padding: 3px;
          background: conic-gradient(var(--rose), var(--yellow), var(--teal), var(--lavender), var(--rose));
          animation: spinRing 10s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        @keyframes spinRing { from{filter:hue-rotate(0deg)} to{filter:hue-rotate(360deg)} }

        .photo-inner {
          position: absolute;
          inset: 8px;
          border-radius: 140px 140px 42px 42px;
          overflow: hidden;
          background: #f7e8d8;
          display: flex; align-items: center; justify-content: center;
        }
        .photo-inner img { width:100%; height:100%; object-fit:cover; object-position:center top; }

        .photo-placeholder {
          display: flex; flex-direction: column; align-items: center;
          gap: 10px; padding: 24px; text-align: center;
          font-family: 'DM Mono', monospace; font-size: 12px; color: var(--muted);
        }
        .initials {
          font-family: 'Fraunces', serif; font-size: 60px; font-weight: 900;
          background: linear-gradient(135deg, var(--rose), var(--yellow));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .float-tag {
          position: absolute;
          background: white;
          border: 1.5px solid rgba(0,0,0,0.07);
          border-radius: 100px;
          padding: 7px 14px;
          font-size: 11px;
          font-family: 'DM Mono', monospace;
          white-space: nowrap;
          z-index: 3;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .ft1 { top: 16px;   right: -60px; color: var(--rose);    border-color: rgba(242,96,122,.25); animation: fl1 4s ease-in-out infinite alternate; }
        .ft2 { bottom: 90px; left: -74px; color: var(--peach);   border-color: rgba(255,140,97,.25); animation: fl2 4.5s ease-in-out infinite alternate; }
        .ft3 { top: 44%;   right: -80px;  color: var(--teal);    border-color: rgba(62,201,182,.25); animation: fl1 5s ease-in-out infinite alternate; }
        .ft4 { bottom: 28px; right: -22px;color: var(--green);   border-color: rgba(76,175,130,.25); animation: fl2 3.5s ease-in-out infinite alternate; }

        @keyframes fl1 { from{transform:translateY(0)} to{transform:translateY(-10px)} }
        @keyframes fl2 { from{transform:translateY(0)} to{transform:translateY(-8px)} }

        .scroll-hint {
          position: absolute; bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: var(--muted); font-size: 11px;
          font-family: 'DM Mono', monospace;
          animation: fadeUp 1s ease 1.2s both;
          z-index: 2; pointer-events: none;
        }
        .scroll-arrow {
          width: 18px; height: 18px;
          border-right: 2px solid var(--muted);
          border-bottom: 2px solid var(--muted);
          transform: rotate(45deg);
          animation: sbounce 2s ease infinite;
        }
        @keyframes sbounce { 0%,100%{transform:rotate(45deg) translateY(0)} 50%{transform:rotate(45deg) translateY(5px)} }

        .marquee-wrap {
          overflow: hidden; padding: 18px 0;
          background: white;
          border-top: 1.5px solid rgba(0,0,0,0.05);
          border-bottom: 1.5px solid rgba(0,0,0,0.05);
          position: relative; z-index: 2;
        }
        .marquee-track { display:flex; gap:36px; animation:scrollLeft 22s linear infinite; width:max-content; }
        .marquee-item {
          font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700;
          color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px;
          white-space: nowrap; display:flex; align-items:center; gap:36px;
        }
        .marquee-item::after { content:'✿'; color:var(--rose); font-size:12px; }
        @keyframes scrollLeft { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .cv-section {
          padding: 90px 64px;
          max-width: 1180px;
          margin: 0 auto;
          position: relative; z-index: 2;
        }

        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px; color: var(--rose);
          text-transform: uppercase; letter-spacing: 3px;
          margin-bottom: 10px;
          opacity: 0; transform: translateY(18px);
          transition: opacity .6s, transform .6s;
        }
        .section-label.visible { opacity: 1; transform: translateY(0); }

        .section-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(34px, 4.5vw, 52px);
          font-weight: 900; letter-spacing: -1.5px;
          margin-bottom: 48px; color: var(--text);
          opacity: 0; transform: translateY(18px);
          transition: opacity .6s .1s, transform .6s .1s;
        }
        .section-title.visible { opacity: 1; transform: translateY(0); }

        .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .stat-box {
          background: white; border: 1.5px solid var(--cardBorder);
          border-radius: 20px; padding: 28px 24px; text-align: center;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          transition: transform .2s, box-shadow .2s;
        }
        .stat-box:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,0.09); }
        .stat-num { font-family:'Fraunces',serif; font-size:48px; font-weight:900; line-height:1; margin-bottom:6px; }
        .stat-label { font-size:12px; color:var(--muted); font-family:'DM Mono',monospace; }

        .work-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }

        .card {
          background: white;
          border: 1.5px solid var(--cardBorder);
          border-radius: 22px; padding: 28px;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(28px);
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          transition: border-color .3s, box-shadow .3s;
        }
        .card.visible {
          opacity: 1; transform: translateY(0);
          transition: opacity .6s ease, transform .6s ease, border-color .3s, box-shadow .3s;
        }
        .card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.1); transform:translateY(-5px) !important; border-color:rgba(0,0,0,0.12); }
        .card::before {
          content:''; position:absolute; top:0; left:0; right:0;
          height:3px; opacity:0; transition:opacity .3s;
          border-radius:22px 22px 0 0;
        }
        .card:hover::before { opacity:1; }
        .c-rose::before    { background:linear-gradient(90deg,var(--rose),var(--peach)); }
        .c-peach::before   { background:linear-gradient(90deg,var(--peach),var(--yellow)); }
        .c-green::before   { background:linear-gradient(90deg,var(--green),var(--teal)); }
        .c-sky::before     { background:linear-gradient(90deg,var(--sky),var(--lavender)); }
        .c-yellow::before  { background:linear-gradient(90deg,var(--yellow),var(--peach)); }
        .c-lavender::before{ background:linear-gradient(90deg,var(--lavender),var(--sky)); }
        .c-teal::before    { background:linear-gradient(90deg,var(--teal),var(--green)); }

        .card-featured {
          grid-column: 1 / -1;
          background: linear-gradient(135deg,#f0fff7,#e8fdf5);
          border-color: rgba(76,175,130,.25);
        }
        .featured-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(76,175,130,.12); border:1.5px solid rgba(76,175,130,.3);
          border-radius:100px; padding:4px 12px;
          font-size:11px; font-family:'DM Mono',monospace; color:var(--green);
          margin-bottom:14px;
        }
        .card-featured-inner { display:grid; grid-template-columns:1fr auto; gap:32px; align-items:start; }

        .flores-spin {
          width:100px; height:100px; border-radius:18px;
          background:linear-gradient(135deg,#d4f7e5,#a8edcc);
          border:1.5px solid rgba(76,175,130,.3);
          display:flex; align-items:center; justify-content:center;
          font-size:42px; flex-shrink:0;
          animation:floatBounce 4s ease-in-out infinite;
        }
        @keyframes floatBounce { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-8px) rotate(5deg)} }

        .work-year { font-family:'DM Mono',monospace; font-size:11px; color:var(--rose); margin-bottom:7px; display:flex; align-items:center; gap:7px; }
        .dot { width:6px; height:6px; border-radius:50%; background:var(--rose); flex-shrink:0; }
        .work-role { font-family:'Fraunces',serif; font-size:20px; font-weight:700; margin-bottom:3px; color:var(--text); }
        .work-org  { font-size:13px; color:var(--muted); font-family:'DM Mono',monospace; margin-bottom:12px; }
        .work-desc { font-size:14px; line-height:1.7; color:rgba(45,42,38,0.72); }
        .work-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:14px; }

        .tag { font-family:'DM Mono',monospace; font-size:11px; padding:4px 10px; border-radius:100px; border:1.5px solid; font-weight:500; }
        .tag-rose    { color:#c83050; border-color:rgba(242,96,122,.35); background:rgba(242,96,122,.08); }
        .tag-peach   { color:#c45e30; border-color:rgba(255,140,97,.35); background:rgba(255,140,97,.08); }
        .tag-yellow  { color:#9a7800; border-color:rgba(249,200,70,.5);  background:rgba(249,200,70,.1);  }
        .tag-green   { color:#2e7d56; border-color:rgba(76,175,130,.35); background:rgba(76,175,130,.08); }
        .tag-teal    { color:#1a8f80; border-color:rgba(62,201,182,.35); background:rgba(62,201,182,.08); }
        .tag-sky     { color:#1a5fa0; border-color:rgba(100,181,246,.35);background:rgba(100,181,246,.08);}
        .tag-lavender{ color:#5b3ece; border-color:rgba(167,139,250,.35);background:rgba(167,139,250,.08);}

        .edu-timeline { position:relative; padding-left:36px; }
        .edu-timeline::before {
          content:''; position:absolute; left:0; top:8px; bottom:8px; width:2px;
          background:linear-gradient(180deg,var(--rose),var(--yellow),var(--teal),var(--lavender),var(--peach));
          border-radius:2px;
        }
        .edu-item {
          position:relative; margin-bottom:38px;
          opacity:0; transform:translateX(-16px);
          transition:opacity .5s, transform .5s;
        }
        .edu-item.visible { opacity:1; transform:translateX(0); }
        .edu-item::before {
          content:''; position:absolute; left:-42px; top:7px;
          width:12px; height:12px; border-radius:50%;
          background:white; border:2.5px solid var(--rose);
          transition:background .25s;
        }
        .edu-item:nth-child(2)::before { border-color:var(--yellow);   }
        .edu-item:nth-child(3)::before { border-color:var(--teal);     }
        .edu-item:nth-child(4)::before { border-color:var(--lavender); }
        .edu-item:nth-child(5)::before { border-color:var(--peach);    }
        .edu-item:hover::before { background:var(--rose); }
        .edu-year  { font-family:'DM Mono',monospace; font-size:11px; color:var(--rose); margin-bottom:5px; }
        .edu-degree{ font-family:'Fraunces',serif; font-size:19px; font-weight:700; margin-bottom:3px; color:var(--text); }
        .edu-school{ font-size:13px; color:var(--muted); }

        .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:12px; }
        .skill-chip {
          background:white; border:1.5px solid var(--cardBorder); border-radius:16px;
          padding:18px 12px; text-align:center; cursor:default;
          opacity:0; transform:scale(0.88);
          box-shadow:0 2px 10px rgba(0,0,0,0.04);
          transition:border-color .2s, box-shadow .2s;
        }
        .skill-chip.visible { opacity:1; transform:scale(1); transition:opacity .4s ease, transform .4s ease, border-color .2s, box-shadow .2s; }
        .skill-chip:hover { transform:scale(1.07) !important; box-shadow:0 10px 28px rgba(0,0,0,0.1); border-color:rgba(242,96,122,.3); }
        .skill-icon { font-size:26px; margin-bottom:8px; }
        .skill-name { font-size:12px; font-family:'DM Mono',monospace; color:var(--text); }

        .lang-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        .lang-card {
          background:white; border:1.5px solid var(--cardBorder); border-radius:20px;
          padding:26px 22px; text-align:center;
          opacity:0; transform:translateY(18px);
          box-shadow:0 2px 12px rgba(0,0,0,0.04);
        }
        .lang-card.visible { opacity:1; transform:translateY(0); transition:opacity .5s ease, transform .5s ease, box-shadow .2s; }
        .lang-card:hover { transform:translateY(-5px) !important; box-shadow:0 14px 36px rgba(0,0,0,0.09); }
        .lang-level{ font-family:'Fraunces',serif; font-size:38px; font-weight:900; margin-bottom:3px; }
        .lang-name { font-size:14px; color:var(--text); font-weight:600; margin-bottom:2px; }
        .lang-cert { font-size:11px; color:var(--muted); font-family:'DM Mono',monospace; margin-bottom:12px; }
        .lang-bar  { height:4px; background:rgba(0,0,0,0.07); border-radius:2px; overflow:hidden; }
        .lang-fill { height:100%; border-radius:2px; width:0%; transition:width 1s ease .3s; }

        .volunteer-card {
          background:linear-gradient(135deg,#fff8ee,#fff3e5);
          border-color:rgba(249,200,70,.35);
          grid-column: 1 / -1;
        }
        .volunteer-thumb {
          width:180px; height:180px; flex-shrink:0;
          border-radius:16px; overflow:hidden;
          background:linear-gradient(135deg,#fdecc8,#fce4b0);
          display:flex; align-items:center; justify-content:center;
          font-size:48px;
        }
        .volunteer-thumb img { width:100%; height:100%; object-fit:cover; }

        .contact-bar {
          background:white; border-top:1.5px solid rgba(0,0,0,0.06);
          padding:80px 64px; text-align:center;
          position:relative; overflow:hidden; z-index:2;
        }
        .contact-bar::before {
          content:''; position:absolute; top:0; left:0; right:0; height:4px;
          background:linear-gradient(90deg,var(--rose),var(--peach),var(--yellow),var(--teal),var(--lavender));
        }
        .contact-cta { font-family:'Fraunces',serif; font-size:clamp(28px,4vw,50px); font-weight:900; margin-bottom:32px; letter-spacing:-1.5px; color:var(--text); }
        .contact-btn {
          display:inline-flex; align-items:center; gap:10px;
          background:var(--rose); color:white; text-decoration:none;
          padding:15px 36px; border-radius:100px;
          font-size:15px; font-weight:600;
          transition:transform .2s, box-shadow .2s;
          box-shadow:0 4px 20px rgba(242,96,122,.3);
        }
        .contact-btn:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 16px 40px rgba(242,96,122,.4); }

        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        @media (max-width: 800px) {
          .hero { grid-template-columns:1fr; }
          .hero-right { display:none; }
          .cv-section { padding:60px 24px; }
          .work-grid { grid-template-columns:1fr; }
          .lang-grid { grid-template-columns:1fr 1fr; }
          .stat-row  { grid-template-columns:repeat(2,1fr); }
          .card-featured-inner { grid-template-columns:1fr; }
          .hero-left { padding:60px 24px; }
          .contact-bar { padding:48px 24px; }
        }
      `}</style>

      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
      <div id="petal-layer" aria-hidden="true" />

      {/* ── HERO ── */}
      <div className="hero">
        <div id="blob1" className="hero-blob blob1" />
        <div id="blob2" className="hero-blob blob2" />
        <div id="blob3" className="hero-blob blob3" />

        <div className="hero-left">
          <div className="status-badge">
            <div className="status-dot" />
            open to opportunities 🌱
          </div>
          <h1 className="hero-name">
            Maria
            <span className="name-gradient">Brito</span>
          </h1>
          <p className="hero-subtitle">
            Educator · Designer ·{" "}
            <span style={{ color: "var(--peach)", fontWeight: 500 }}>Co-founder</span> · Tech Enthusiast
          </p>
          <div className="hero-links">
            <a href="mailto:mariajgbrito@hotmail.com" className="hero-link link-email">✉ mariajgbrito@hotmail.com</a>
            <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" className="hero-link link-linkedin">in LinkedIn</a>
            <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" className="hero-link link-flores">🌸 floresabeirario.pt</a>
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
              <div className="photo-placeholder" style={{ display: "none" }}>
                <div className="initials">MJB</div>
                <span>add mj.webp to<br />public/ folder</span>
              </div>
            </div>
            <div className="float-tag ft1">🎨 Design</div>
            <div className="float-tag ft2">🤖 AI Coach</div>
            <div className="float-tag ft3">👩‍💻 Educator</div>
            <div className="float-tag ft4">🌸 Founder</div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>scroll</span>
          <div className="scroll-arrow" />
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {["Design & Multimedia","AI Education","Flower Preservation","Web Development","Youth Workshops","Visual Storytelling","Oil Painting","Creative Technology",
            "Design & Multimedia","AI Education","Flower Preservation","Web Development","Youth Workshops","Visual Storytelling","Oil Painting","Creative Technology",
          ].map((item, i) => <div key={i} className="marquee-item">{item}</div>)}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="cv-section">
        <div className="section-label">at a glance</div>
        <div className="section-title">By the numbers</div>
        <div className="stat-row">
          <div className="stat-box">
            <div className="stat-num" style={{ color: "var(--rose)" }} data-count="5">0</div>
            <div className="stat-label">years teaching</div>
          </div>
          <div className="stat-box">
            <div className="stat-num" style={{ color: "var(--peach)" }} data-count="2">0</div>
            <div className="stat-label">languages</div>
          </div>
          <div className="stat-box">
            <div className="stat-num" style={{ color: "var(--green)" }} data-count="1">0</div>
            <div className="stat-label">company co-founded</div>
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section className="cv-section">
        <div className="section-label">career</div>
        <div className="section-title">Work experience</div>
        <div className="work-grid">

          <div className="card card-featured c-green" data-delay="0">
            <div className="featured-badge">⭐ latest venture</div>
            <div className="card-featured-inner">
              <div>
                <div className="work-year"><div className="dot" style={{ background: "var(--green)" }} /><span style={{ color: "var(--green)" }}>2025 — Present</span></div>
                <div className="work-role">Co-Founder</div>
                <div className="work-org">Flores à Beira-Rio · floresabeirario.pt</div>
                <p className="work-desc">Co-founded a flower preservation company, turning fresh botanicals into lasting art. Leads design, branding, digital presence, and creative direction.</p>
                <div className="work-tags">
                  <span className="tag tag-green">Entrepreneurship</span>
                  <span className="tag tag-teal">Branding</span>
                  <span className="tag tag-green">Creative Direction</span>
                </div>
              </div>
              <div className="flores-spin">🌸</div>
            </div>
          </div>

          <div className="card c-rose" data-delay="100">
            <div className="work-year"><div className="dot" />2023 — Present</div>
            <div className="work-role">Learning Coach</div>
            <div className="work-org">TUMO Coimbra</div>
            <p className="work-desc">Supports teens 12–18 in self-directed learning across animation, game dev, filmmaking, music, robotics, and 3D modeling. Guides, motivates, and provides feedback.</p>
            <div className="work-tags">
              <span className="tag tag-rose">Youth Tech</span>
              <span className="tag tag-peach">Coaching</span>
              <span className="tag tag-lavender">Game Dev</span>
            </div>
          </div>

          <div className="card c-peach" data-delay="150">
            <div className="work-year"><div className="dot" style={{ background: "var(--peach)" }} /><span style={{ color: "var(--peach)" }}>Dec 2023 — Aug 2025</span></div>
            <div className="work-role">Info Desk</div>
            <div className="work-org">TUMO Coimbra</div>
            <p className="work-desc">Managed student enquiries, check-in/out, registration & enrolment, database upkeep, and parent communication.</p>
            <div className="work-tags">
              <span className="tag tag-peach">Operations</span>
              <span className="tag tag-yellow">Administration</span>
            </div>
          </div>

          <div className="card c-teal" data-delay="200">
            <div className="work-year"><div className="dot" style={{ background: "var(--teal)" }} /><span style={{ color: "var(--teal)" }}>2022 — Present</span></div>
            <div className="work-role">Middle School Teacher</div>
            <div className="work-org">Escola Tenente Valadim</div>
            <p className="work-desc">Teaching Visual Education, Technology Education, and Design in Interactive Media — developing creative expression and aesthetic understanding through art and tech.</p>
            <div className="work-tags">
              <span className="tag tag-teal">Visual Education</span>
              <span className="tag tag-sky">Interactive Design</span>
            </div>
          </div>

          <div className="card c-lavender" data-delay="250">
            <div className="work-year"><div className="dot" style={{ background: "var(--lavender)" }} /><span style={{ color: "var(--lavender)" }}>Oct 2023 — Present</span></div>
            <div className="work-role">Clonlara Teacher</div>
            <div className="work-org">Colégio de São José · International School</div>
            <p className="work-desc">Personalized learning that fosters authenticity, autonomy, and genuine joy in the learning journey.</p>
            <div className="work-tags">
              <span className="tag tag-lavender">Pedagogy</span>
              <span className="tag tag-sky">Autonomy</span>
            </div>
          </div>

          <div className="card c-sky" data-delay="300">
            <div className="work-year"><div className="dot" style={{ background: "var(--sky)" }} /><span style={{ color: "var(--sky)" }}>Dec 2022 — Aug 2023</span></div>
            <div className="work-role">ICT Teacher</div>
            <div className="work-org">Agrupamento Dr. Bissaya Barreto</div>
            <p className="work-desc">Information and Communication Technologies for students ages 8 to 18 in a public school setting.</p>
            <div className="work-tags">
              <span className="tag tag-sky">ICT</span>
              <span className="tag tag-peach">Curriculum</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── INTERNSHIPS ── */}
      <section className="cv-section">
        <div className="section-label">experience abroad</div>
        <div className="section-title">Internships</div>
        <div className="work-grid">
          <div className="card c-rose" data-delay="0">
            <div className="work-year"><div className="dot" />Sep 2021 — Mar 2022 · Paris, France</div>
            <div className="work-role">Production & Creative Direction</div>
            <div className="work-org">Julien Tavel — Fashion Photographer</div>
            <p className="work-desc">Production and photo crew assistant. Created mood boards, designed 3D portfolio boxes, reorganized a 7-year photographic archive, and handled logistics and equipment.</p>
            <div className="work-tags">
              <span className="tag tag-rose">Fashion</span>
              <span className="tag tag-sky">Photography</span>
              <span className="tag tag-peach">3D Modeling</span>
              <span className="tag tag-yellow">Creative Direction</span>
            </div>
          </div>
          <div className="card c-sky" data-delay="150">
            <div className="work-year"><div className="dot" style={{ background: "var(--sky)" }} /><span style={{ color: "var(--sky)" }}>Jul — Aug 2021 · Athens, Greece</span></div>
            <div className="work-role">Graphic & Email Designer</div>
            <div className="work-org">ShipLemon · DeliverBack</div>
            <p className="work-desc">Web design, graphic design, and email/newsletter optimization for two tech startups. Built mobile-friendly templates and marketing materials.</p>
            <div className="work-tags">
              <span className="tag tag-sky">Web Design</span>
              <span className="tag tag-teal">Email Design</span>
              <span className="tag tag-peach">Graphic Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VOLUNTEERING ── */}
      <section className="cv-section">
        <div className="section-label">giving back</div>
        <div className="section-title">Volunteering</div>
        <div className="work-grid">
          <div className="card volunteer-card c-yellow" data-delay="0">
            <div className="card-featured-inner">
              <div>
                <div className="featured-badge" style={{ background: "rgba(249,200,70,.15)", borderColor: "rgba(249,200,70,.4)", color: "#9a7800" }}>💛 volunteer</div>
                <div className="work-year"><div className="dot" style={{ background: "var(--yellow)" }} /><span style={{ color: "#9a7800" }}>Jul — Aug 2024 · Bulgaria</span></div>
                <div className="work-role">Summer Activities Creator</div>
                <div className="work-org">SOS Children&rsquo;s Villages · Future World Association</div>
                <p className="work-desc">Created and led summer activities for children at SOS Children&rsquo;s Villages — bringing creativity, play, and warmth through hands-on workshops and joyful programming.</p>
                <div className="work-tags">
                  <span className="tag tag-yellow">Children&rsquo;s Activities</span>
                  <span className="tag tag-peach">Community Care</span>
                  <span className="tag tag-rose">Creative Workshops</span>
                </div>
              </div>
              <div className="volunteer-thumb">
                <img src="/bulgaria.webp" alt="Volunteering in Bulgaria"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const ph = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                    if (ph) ph.style.display = "flex";
                  }}
                />
                <div style={{ display: "none", fontSize: "48px", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>🇧🇬</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="cv-section">
        <div className="section-label">academia</div>
        <div className="section-title">Education</div>
        <div className="edu-timeline">
          <div className="edu-item">
            <div className="edu-year">2016 — 2019</div>
            <div className="edu-degree">Bachelor&rsquo;s Degree in Design &amp; Multimedia</div>
            <div className="edu-school">University of Coimbra · Faculty of Sciences and Technology</div>
          </div>
          <div className="edu-item">
            <div className="edu-year" style={{ color: "var(--yellow)" }}>Mar — Jun 2023</div>
            <div className="edu-degree" style={{ fontSize: "17px" }}>Computational Thinking in Maths with Scratch</div>
            <div className="edu-school">CENFORMAZ</div>
          </div>
          <div className="edu-item">
            <div className="edu-year" style={{ color: "var(--teal)" }}>Jun — Jul 2023</div>
            <div className="edu-degree" style={{ fontSize: "17px" }}>Oil Painting Techniques</div>
            <div className="edu-school">CEARTE · Fine and Studio Arts</div>
          </div>
          <div className="edu-item">
            <div className="edu-year" style={{ color: "var(--lavender)" }}>Jan — Apr 2021</div>
            <div className="edu-degree" style={{ fontSize: "17px" }}>Fundamentals of Digital Marketing</div>
            <div className="edu-school">The Open University</div>
          </div>
          <div className="edu-item">
            <div className="edu-year" style={{ color: "var(--peach)" }}>2008 — 2012</div>
            <div className="edu-degree" style={{ fontSize: "17px" }}>Music Course — Clarinet, 5th Grade</div>
            <div className="edu-school">Escola de Música · Colégio São Teotónio</div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="cv-section">
        <div className="section-label">toolkit</div>
        <div className="section-title">Software &amp; Skills</div>
        <div className="skills-grid">
          {[
            { icon: "🎨", name: "Illustrator",  d: 0.00 },
            { icon: "📐", name: "InDesign",     d: 0.05 },
            { icon: "📷", name: "Photoshop",    d: 0.10 },
            { icon: "🎬", name: "Premiere",     d: 0.15 },
            { icon: "📸", name: "Lightroom",    d: 0.20 },
            { icon: "💻", name: "HTML",         d: 0.25 },
            { icon: "🎨", name: "CSS",          d: 0.30 },
            { icon: "📊", name: "MS Office",    d: 0.35 },
            { icon: "🤖", name: "AI Tools",     d: 0.40 },
            { icon: "🌱", name: "Scratch",      d: 0.45 },
            { icon: "🧠", name: "Prompting",    d: 0.50 },
            { icon: "🖼️", name: "Oil Painting", d: 0.55 },
            { icon: "🌐", name: "Web Design",   d: 0.60 },
            { icon: "🎵", name: "Clarinet",     d: 0.65 },
          ].map(s => (
            <div key={s.name} className="skill-chip" data-d={s.d}>
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LANGUAGES ── */}
      <section className="cv-section">
        <div className="section-label">communication</div>
        <div className="section-title">Languages</div>
        <div className="lang-grid">
          {[
            { code: "PT", name: "Portuguese", cert: "Native",      w: 100, color: "var(--rose)", d: 0   },
            { code: "EN", name: "English",    cert: "Native / C2", w: 98,  color: "var(--sky)",  d: 0.1 },
          ].map(l => (
            <div key={l.code} className="lang-card" data-d={l.d}>
              <div className="lang-level" style={{ color: l.color }}>{l.code}</div>
              <div className="lang-name">{l.name}</div>
              <div className="lang-cert">{l.cert}</div>
              <div className="lang-bar"><div className="lang-fill" data-w={l.w} style={{ background: l.color }} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <div className="contact-bar">
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌸</div>
        <div className="contact-cta">
          Let&rsquo;s build something{" "}
          <span style={{ background: "linear-gradient(120deg, var(--rose), var(--peach), var(--yellow))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            beautiful
          </span>
          {" "}together.
        </div>
        <a href="mailto:mariajgbrito@hotmail.com" className="contact-btn">✉ Get in touch</a>
        <p style={{ marginTop: "24px", color: "var(--muted)", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>
          mariajgbrito@hotmail.com &nbsp;·&nbsp;
          <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" style={{ color: "var(--sky)", textDecoration: "none" }}>
            linkedin.com/in/mariajbrito
          </a>
          {" "}&nbsp;·&nbsp;{" "}
          <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" style={{ color: "var(--green)", textDecoration: "none" }}>
            floresabeirario.pt
          </a>
        </p>
      </div>
    </>
  );
}
