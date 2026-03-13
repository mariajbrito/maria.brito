"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // parallax blobs
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      const b1 = document.getElementById("blob1");
      const b2 = document.getElementById("blob2");
      const b3 = document.getElementById("blob3");
      if (b1) b1.style.transform = `translate(${x}px, ${y}px)`;
      if (b2) b2.style.transform = `translate(${-x * 0.8}px, ${-y * 0.8}px)`;
      if (b3) b3.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    };

    const animCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(animCursor);
    };
    raf = requestAnimationFrame(animCursor);
    document.addEventListener("mousemove", onMouseMove);

    // hover effects on interactive elements
    const hoverEls = document.querySelectorAll("a, button, .card, .skill-chip");
    const enterH = () => {
      if (cursorRef.current) { cursorRef.current.style.width = "20px"; cursorRef.current.style.height = "20px"; }
      if (ringRef.current) { ringRef.current.style.width = "60px"; ringRef.current.style.height = "60px"; }
    };
    const leaveH = () => {
      if (cursorRef.current) { cursorRef.current.style.width = "12px"; cursorRef.current.style.height = "12px"; }
      if (ringRef.current) { ringRef.current.style.width = "40px"; ringRef.current.style.height = "40px"; }
    };
    hoverEls.forEach(el => { el.addEventListener("mouseenter", enterH); el.addEventListener("mouseleave", leaveH); });

    // Intersection Observer for scroll animations
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // lang bars
          (entry.target as HTMLElement).querySelectorAll<HTMLElement>(".lang-fill").forEach(bar => {
            setTimeout(() => { bar.style.width = (bar.dataset.w ?? "0") + "%"; }, 300);
          });
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".section-label, .section-title, .edu-item").forEach(el => io.observe(el));

    // Cards with delay
    document.querySelectorAll<HTMLElement>(".card").forEach(card => {
      const delay = parseFloat(card.style.getPropertyValue("--delay") || "0") || 0;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), delay * 1000);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(card);
    });

    // Skill chips
    document.querySelectorAll<HTMLElement>(".skill-chip").forEach(chip => {
      const delay = parseFloat(chip.dataset.d ?? "0") || 0;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), delay * 1000);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(chip);
    });

    // Lang cards
    document.querySelectorAll<HTMLElement>(".lang-card").forEach(el => {
      const delay = parseFloat(el.dataset.d ?? "0") || 0;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.classList.add("visible");
              (e.target as HTMLElement).querySelectorAll<HTMLElement>(".lang-fill").forEach(bar => {
                setTimeout(() => { bar.style.width = (bar.dataset.w ?? "0") + "%"; }, 300);
              });
            }, delay * 1000);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(el);
    });

    // Counters
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const target = parseInt((e.target as HTMLElement).dataset.count ?? "0");
            let current = 0;
            const timer = setInterval(() => {
              current = Math.min(current + 1, target);
              e.target.textContent = String(current);
              if (current >= target) clearInterval(timer);
            }, 80);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      obs.observe(el);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      hoverEls.forEach(el => { el.removeEventListener("mouseenter", enterH); el.removeEventListener("mouseleave", leaveH); });
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --orange: #F4631E;
          --yellow: #F5C518;
          --green: #3DBE6E;
          --blue: #3B82F6;
          --pink: #E879F9;
          --teal: #14B8A6;
          --dark: #0F0E17;
          --cream: #FFFBF0;
          --card: #1A1929;
          --card2: #14131f;
          --text: #E8E4D9;
          --muted: #8B85A0;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          background: var(--dark);
          color: var(--text);
          font-family: 'Space Grotesk', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        .cursor {
          width: 12px; height: 12px;
          background: var(--yellow);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background 0.2s;
          mix-blend-mode: difference;
        }
        .cursor-ring {
          width: 40px; height: 40px;
          border: 1.5px solid var(--yellow);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s;
          mix-blend-mode: difference;
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
          filter: blur(80px);
          opacity: 0.15;
          animation: pulse 6s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .blob1 { width: 500px; height: 500px; background: var(--orange); top: -100px; left: -100px; }
        .blob2 { width: 400px; height: 400px; background: var(--pink); bottom: -100px; right: -50px; animation-delay: -3s; }
        .blob3 { width: 300px; height: 300px; background: var(--blue); top: 50%; left: 40%; animation-delay: -1.5s; }

        @keyframes pulse {
          from { transform: scale(1) rotate(0deg); }
          to { transform: scale(1.2) rotate(20deg); }
        }

        .hero-left {
          padding: 80px 60px;
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
          overflow: visible;
          z-index: 2;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(61, 190, 110, 0.15);
          border: 1px solid rgba(61, 190, 110, 0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
          color: var(--green);
          margin-bottom: 32px;
          width: fit-content;
          animation: fadeSlideIn 0.8s ease both;
        }

        .status-dot {
          width: 6px; height: 6px;
          background: var(--green);
          border-radius: 50%;
          animation: blink 2s ease infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .hero-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(60px, 8vw, 100px);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -3px;
          margin-bottom: 20px;
          animation: fadeSlideIn 0.8s ease 0.1s both;
        }

        .hero-name-gradient {
          display: block;
          background: linear-gradient(135deg, var(--orange), var(--yellow), var(--pink));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title {
          font-size: 16px;
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 40px;
          animation: fadeSlideIn 0.8s ease 0.2s both;
        }

        .hero-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeSlideIn 0.8s ease 0.3s both;
        }

        .hero-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 13px;
          font-family: 'JetBrains Mono', monospace;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          font-weight: 500;
        }
        .hero-link:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.4); }
        .link-email { background: var(--orange); color: white; }
        .link-linkedin { background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); color: var(--blue); }
        .link-flores { background: rgba(61,190,110,0.2); border: 1px solid rgba(61,190,110,0.4); color: var(--green); }

        .photo-frame {
          position: relative;
          width: 300px;
          height: 360px;
          animation: fadeSlideIn 0.8s ease 0.4s both;
        }

        .photo-border-anim {
          position: absolute;
          inset: 0;
          border-radius: 150px 150px 40px 40px;
          padding: 3px;
          background: linear-gradient(135deg, var(--orange), var(--yellow), var(--pink), var(--blue));
          animation: hueShift 8s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        @keyframes hueShift {
          from { filter: hue-rotate(0deg); }
          to { filter: hue-rotate(360deg); }
        }

        .photo-inner {
          position: absolute;
          inset: 8px;
          border-radius: 140px 140px 32px 32px;
          overflow: hidden;
          background: var(--card);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .photo-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .photo-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: var(--muted);
          font-size: 13px;
          font-family: 'JetBrains Mono', monospace;
          text-align: center;
          padding: 20px;
        }

        .initials {
          font-family: 'Syne', sans-serif;
          font-size: 64px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--orange), var(--yellow));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .float-tag {
          position: absolute;
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          padding: 8px 14px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          white-space: nowrap;
          z-index: 3;
        }
        .ft1 { top: 20px; right: -50px; color: var(--yellow); border-color: rgba(245,197,24,0.3); animation: float1 4s ease-in-out infinite alternate; }
        .ft2 { bottom: 80px; left: -70px; color: var(--pink); border-color: rgba(232,121,249,0.3); animation: float2 4s ease-in-out infinite alternate; }
        .ft3 { top: 45%; right: -80px; color: var(--teal); border-color: rgba(20,184,166,0.3); animation: float1 5s ease-in-out infinite alternate; }
        .ft4 { bottom: 30px; right: -20px; color: var(--green); border-color: rgba(61,190,110,0.3); animation: float2 3.5s ease-in-out infinite alternate; }

        @keyframes float1 { from { transform: translateY(0); } to { transform: translateY(-10px); } }
        @keyframes float2 { from { transform: translateY(0); } to { transform: translateY(-8px); } }

        .scroll-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          animation: fadeSlideIn 1s ease 1s both;
          z-index: 2;
          pointer-events: none;
        }

        .scroll-arrow {
          width: 20px; height: 20px;
          border-right: 2px solid var(--muted);
          border-bottom: 2px solid var(--muted);
          transform: rotate(45deg);
          animation: bounce 2s ease infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(6px); }
        }

        .marquee-wrap {
          overflow: hidden;
          padding: 20px 0;
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          background: rgba(255,255,255,0.02);
          position: relative;
          z-index: 2;
        }

        .marquee-track {
          display: flex;
          gap: 40px;
          animation: marquee 25s linear infinite;
          width: max-content;
        }

        .marquee-item {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 2px;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .marquee-item::after { content: '✦'; color: var(--orange); font-size: 10px; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .cv-section {
          padding: 100px 60px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .section-label.visible { opacity: 1; transform: translateY(0); }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -2px;
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .section-title.visible { opacity: 1; transform: translateY(0); }

        .stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 0;
        }

        .stat-box {
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
        }

        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 44px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 12px;
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
        }

        .work-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .card {
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .card.visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          transform: translateY(-4px) !important;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .card:hover::before { opacity: 1; }
        .card-orange::before { background: linear-gradient(90deg, var(--orange), var(--yellow)); }
        .card-pink::before { background: linear-gradient(90deg, var(--pink), var(--blue)); }
        .card-green::before { background: linear-gradient(90deg, var(--green), var(--teal)); }
        .card-blue::before { background: linear-gradient(90deg, var(--blue), var(--teal)); }
        .card-yellow::before { background: linear-gradient(90deg, var(--yellow), var(--orange)); }

        .card-featured {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, rgba(61,190,110,0.1), rgba(20,184,166,0.08));
          border-color: rgba(61,190,110,0.2);
        }

        .featured-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(61,190,110,0.15);
          border: 1px solid rgba(61,190,110,0.3);
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: var(--green);
          margin-bottom: 16px;
        }

        .card-featured-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: start;
        }

        .flores-visual {
          width: 110px; height: 110px;
          border-radius: 20px;
          background: linear-gradient(135deg, #0f3d22, #1a5c35);
          border: 1px solid rgba(61,190,110,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 44px;
          flex-shrink: 0;
          animation: rotateSlow 20s linear infinite;
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .work-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--orange);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }

        .work-role {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .work-org {
          font-size: 13px;
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 14px;
        }

        .work-desc {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(232,228,217,0.7);
        }

        .work-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }

        .tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid;
        }
        .tag-orange { color: var(--orange); border-color: rgba(244,99,30,0.3); background: rgba(244,99,30,0.08); }
        .tag-green { color: var(--green); border-color: rgba(61,190,110,0.3); background: rgba(61,190,110,0.08); }
        .tag-blue { color: var(--blue); border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.08); }
        .tag-pink { color: var(--pink); border-color: rgba(232,121,249,0.3); background: rgba(232,121,249,0.08); }
        .tag-yellow { color: var(--yellow); border-color: rgba(245,197,24,0.3); background: rgba(245,197,24,0.08); }
        .tag-teal { color: var(--teal); border-color: rgba(20,184,166,0.3); background: rgba(20,184,166,0.08); }

        .edu-timeline {
          position: relative;
          padding-left: 40px;
        }
        .edu-timeline::before {
          content: '';
          position: absolute;
          left: 0; top: 8px; bottom: 8px;
          width: 2px;
          background: linear-gradient(180deg, var(--orange), var(--pink), var(--blue));
          border-radius: 2px;
        }

        .edu-item {
          position: relative;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .edu-item.visible { opacity: 1; transform: translateX(0); }
        .edu-item::before {
          content: '';
          position: absolute;
          left: -46px; top: 8px;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--dark);
          border: 2px solid var(--orange);
          transition: background 0.3s;
        }
        .edu-item:nth-child(2)::before { border-color: var(--pink); }
        .edu-item:hover::before { background: var(--orange); }

        .edu-year { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--orange); margin-bottom: 6px; }
        .edu-degree { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .edu-school { font-size: 13px; color: var(--muted); }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 12px;
        }

        .skill-chip {
          background: var(--card2);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 20px 16px;
          text-align: center;
          cursor: default;
          opacity: 0;
          transform: scale(0.9);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .skill-chip.visible { opacity: 1; transform: scale(1); transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, box-shadow 0.2s; }
        .skill-chip:hover { transform: scale(1.08) !important; box-shadow: 0 8px 30px rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.15); }

        .skill-icon { font-size: 28px; margin-bottom: 8px; }
        .skill-name { font-size: 12px; font-family: 'JetBrains Mono', monospace; color: var(--text); }

        .lang-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .lang-card {
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px 20px;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
        }
        .lang-card.visible { opacity: 1; transform: translateY(0); transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s; }
        .lang-card:hover { transform: translateY(-6px) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }

        .lang-level { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; margin-bottom: 4px; }
        .lang-name { font-size: 13px; color: var(--muted); font-family: 'JetBrains Mono', monospace; margin-bottom: 4px; }
        .lang-cert { font-size: 11px; color: var(--muted); font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; }
        .lang-bar { height: 3px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
        .lang-fill { height: 100%; border-radius: 2px; width: 0%; transition: width 1s ease 0.5s; }

        .contact-bar {
          background: var(--card);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 80px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
          z-index: 2;
        }
        .contact-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--orange), var(--yellow), var(--pink), var(--blue), var(--green));
        }

        .contact-cta {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          margin-bottom: 32px;
          letter-spacing: -1px;
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--orange);
          color: white;
          text-decoration: none;
          padding: 16px 36px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .contact-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 50px rgba(244,99,30,0.4);
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero { grid-template-columns: 1fr; }
          .hero-right { display: none; }
          .cv-section { padding: 60px 24px; }
          .work-grid, .lang-grid { grid-template-columns: 1fr; }
          .stat-row { grid-template-columns: repeat(2, 1fr); }
          .card-featured-inner { grid-template-columns: 1fr; }
          .hero-left { padding: 60px 24px; }
          .contact-bar { padding: 40px 24px; }
        }
      `}</style>

      {/* Cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* HERO */}
      <div className="hero">
        <div id="blob1" className="hero-blob blob1" />
        <div id="blob2" className="hero-blob blob2" />
        <div id="blob3" className="hero-blob blob3" />

        <div className="hero-left">
          <div className="status-badge">
            <div className="status-dot" />
            open to opportunities
          </div>
          <h1 className="hero-name">
            Maria
            <span className="hero-name-gradient">Brito</span>
          </h1>
          <p className="hero-title">
            Designer · Educator ·{" "}
            <span style={{ color: "var(--yellow)" }}>Co-founder</span> · Tech Enthusiast
          </p>
          <div className="hero-links">
            <a href="mailto:mariajgbrito@hotmail.com" className="hero-link link-email">
              ✉ mariajgbrito@hotmail.com
            </a>
            <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" className="hero-link link-linkedin">
              in LinkedIn
            </a>
            <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" className="hero-link link-flores">
              🌸 floresabeirario.pt
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="photo-frame">
            <div className="photo-border-anim" />
            <div className="photo-inner">
              <img
                src="/mj.webp"
                alt="Maria Brito"
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

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {["Design & Multimedia", "AI Education", "Flower Preservation", "Web Development", "Youth Workshops", "Visual Storytelling", "Creative Technology",
            "Design & Multimedia", "AI Education", "Flower Preservation", "Web Development", "Youth Workshops", "Visual Storytelling", "Creative Technology"].map((item, i) => (
            <div key={i} className="marquee-item">{item}</div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="cv-section">
        <div className="section-label">at a glance</div>
        <div className="section-title">By the numbers</div>
        <div className="stat-row">
          <div className="stat-box">
            <div className="stat-num" style={{ color: "var(--orange)" }} data-count="5">0</div>
            <div className="stat-label">years teaching</div>
          </div>
          <div className="stat-box">
            <div className="stat-num" style={{ color: "var(--pink)" }} data-count="4">0</div>
            <div className="stat-label">languages</div>
          </div>
          <div className="stat-box">
            <div className="stat-num" style={{ color: "var(--green)" }} data-count="1">0</div>
            <div className="stat-label">company co-founded</div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="cv-section">
        <div className="section-label">career</div>
        <div className="section-title">Work experience</div>
        <div className="work-grid">

          {/* Flores à Beira-Rio */}
          <div className="card card-green card-featured" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="featured-badge">⭐ latest venture</div>
            <div className="card-featured-inner">
              <div>
                <div className="work-year">
                  <div className="dot" style={{ background: "var(--green)" }} />
                  <span style={{ color: "var(--green)" }}>2025 — Present</span>
                </div>
                <div className="work-role">Co-Founder</div>
                <div className="work-org">Flores à Beira-Rio · floresabeirario.pt</div>
                <p className="work-desc">
                  Co-founded a flower preservation company, creating lasting botanical art through pressed and dried flower techniques. Manages design, branding, digital presence, and creative direction.
                </p>
                <div className="work-tags">
                  <span className="tag tag-green">Entrepreneurship</span>
                  <span className="tag tag-teal">Branding</span>
                  <span className="tag tag-green">Creative Direction</span>
                </div>
              </div>
              <div className="flores-visual">🌸</div>
            </div>
          </div>

          {/* TUMO */}
          <div className="card card-orange" style={{ "--delay": "0.1s" } as React.CSSProperties}>
            <div className="work-year"><div className="dot" />2023 — Present</div>
            <div className="work-role">Learning Coach & Infodesk</div>
            <div className="work-org">TUMO Coimbra</div>
            <p className="work-desc">After-school tech program where teens 12–18 learn animation, game development, filmmaking, music, robotics, and 3D modeling.</p>
            <div className="work-tags">
              <span className="tag tag-orange">Youth Tech</span>
              <span className="tag tag-yellow">Coaching</span>
              <span className="tag tag-pink">Game Dev</span>
            </div>
          </div>

          {/* Clonlara */}
          <div className="card card-pink" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            <div className="work-year">
              <div className="dot" style={{ background: "var(--pink)" }} />
              <span style={{ color: "var(--pink)" }}>2023 — Present</span>
            </div>
            <div className="work-role">Clonlara Teacher</div>
            <div className="work-org">Colégio de São José</div>
            <p className="work-desc">Personalized learning approach that fosters authenticity, autonomy, and joy in the learning process.</p>
            <div className="work-tags">
              <span className="tag tag-pink">Pedagogy</span>
              <span className="tag tag-blue">Autonomy</span>
            </div>
          </div>

          {/* Private Teacher */}
          <div className="card card-blue" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            <div className="work-year">
              <div className="dot" style={{ background: "var(--blue)" }} />
              <span style={{ color: "var(--blue)" }}>2022 — Present</span>
            </div>
            <div className="work-role">Private Teacher</div>
            <div className="work-org">Homeschooling · ages 11–14</div>
            <p className="work-desc">Teaching Technological Education, Visual Education, and Design in Interactive Media to homeschooled students.</p>
            <div className="work-tags">
              <span className="tag tag-blue">Interactive Design</span>
              <span className="tag tag-teal">Visual Education</span>
            </div>
          </div>

          {/* ICT */}
          <div className="card card-yellow" style={{ "--delay": "0.4s" } as React.CSSProperties}>
            <div className="work-year">
              <div className="dot" style={{ background: "var(--yellow)" }} />
              <span style={{ color: "var(--yellow)" }}>2022 — 2023</span>
            </div>
            <div className="work-role">ICT Teacher</div>
            <div className="work-org">Agrupamento de Escolas de Castanheira de Pêra · ages 8–18</div>
            <p className="work-desc">Teaching Information and Communication Technologies across all age groups in a public school setting.</p>
            <div className="work-tags">
              <span className="tag tag-yellow">ICT</span>
              <span className="tag tag-orange">Curriculum Design</span>
            </div>
          </div>

        </div>
      </section>

      {/* EDUCATION */}
      <section className="cv-section">
        <div className="section-label">academia</div>
        <div className="section-title">Education</div>
        <div className="edu-timeline">
          <div className="edu-item">
            <div className="edu-year">2023</div>
            <div className="edu-degree">Training in Computational Thinking in Mathematics with Scratch</div>
            <div className="edu-school">CENFORMAZ</div>
          </div>
          <div className="edu-item">
            <div className="edu-year" style={{ color: "var(--pink)" }}>2016</div>
            <div className="edu-degree">Bachelor&rsquo;s Degree in Design and Multimedia</div>
            <div className="edu-school">University of Coimbra · Faculty of Sciences and Technology</div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="cv-section">
        <div className="section-label">toolkit</div>
        <div className="section-title">Software & Skills</div>
        <div className="skills-grid">
          {[
            { icon: "🎨", name: "Illustrator", d: 0.0 },
            { icon: "📐", name: "InDesign", d: 0.05 },
            { icon: "📷", name: "Photoshop", d: 0.1 },
            { icon: "🎬", name: "Premiere", d: 0.15 },
            { icon: "📸", name: "Lightroom", d: 0.2 },
            { icon: "💻", name: "HTML", d: 0.25 },
            { icon: "🎨", name: "CSS", d: 0.3 },
            { icon: "📊", name: "MS Office", d: 0.35 },
            { icon: "🤖", name: "AI Tools", d: 0.4 },
            { icon: "🌱", name: "Scratch", d: 0.45 },
            { icon: "🧠", name: "Prompting", d: 0.5 },
            { icon: "🌐", name: "Web Design", d: 0.55 },
          ].map((s) => (
            <div key={s.name} className="skill-chip" data-d={s.d}>
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNSHIPS */}
      <section className="cv-section">
        <div className="section-label">experience abroad</div>
        <div className="section-title">Internships</div>
        <div className="work-grid">
          <div className="card card-pink" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="work-year">
              <div className="dot" style={{ background: "var(--pink)" }} />
              <span style={{ color: "var(--pink)" }}>2021 — 2022 · Paris, France</span>
            </div>
            <div className="work-role">Production & Creative Direction</div>
            <div className="work-org">Photo Crew — Julien Tavel, Fashion Photographer</div>
            <p className="work-desc">Assisted in production, photo crew management, and creative direction with an internationally recognized fashion photographer.</p>
            <div className="work-tags">
              <span className="tag tag-pink">Fashion</span>
              <span className="tag tag-blue">Photography</span>
              <span className="tag tag-yellow">Creative Direction</span>
            </div>
          </div>
          <div className="card card-blue" style={{ "--delay": "0.15s" } as React.CSSProperties}>
            <div className="work-year">
              <div className="dot" style={{ background: "var(--blue)" }} />
              <span style={{ color: "var(--blue)" }}>2021 · Athens, Greece</span>
            </div>
            <div className="work-role">Graphic Designer</div>
            <div className="work-org">ShipLemon & DeliverBack</div>
            <p className="work-desc">Web design, graphic design, email & newsletter optimization and restructuring for two tech-oriented companies.</p>
            <div className="work-tags">
              <span className="tag tag-blue">Web Design</span>
              <span className="tag tag-teal">Email Design</span>
              <span className="tag tag-orange">Graphic Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* LANGUAGES */}
      <section className="cv-section">
        <div className="section-label">communication</div>
        <div className="section-title">Languages</div>
        <div className="lang-grid">
          {[
            { code: "PT", name: "Portuguese", cert: "Native", w: 100, color: "var(--orange)", d: 0 },
            { code: "EN", name: "English", cert: "C2", w: 95, color: "var(--blue)", d: 0.1 },
            { code: "ES", name: "Spanish", cert: "A2", w: 35, color: "var(--yellow)", d: 0.2 },
            { code: "FR", name: "French", cert: "A2", w: 35, color: "var(--pink)", d: 0.3 },
          ].map((l) => (
            <div key={l.code} className="lang-card" data-d={l.d}>
              <div className="lang-level" style={{ color: l.color }}>{l.code}</div>
              <div className="lang-name">{l.name}</div>
              <div className="lang-cert">{l.cert}</div>
              <div className="lang-bar">
                <div className="lang-fill" data-w={l.w} style={{ background: l.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <div className="contact-bar">
        <div className="contact-cta">
          Let&rsquo;s build something{" "}
          <span style={{ background: "linear-gradient(135deg, var(--orange), var(--yellow))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            amazing
          </span>{" "}
          together.
        </div>
        <a href="mailto:mariajgbrito@hotmail.com" className="contact-btn">
          ✉ Get in touch
        </a>
        <p style={{ marginTop: "24px", color: "var(--muted)", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
          mariajgbrito@hotmail.com &nbsp;·&nbsp;
          <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" style={{ color: "var(--blue)", textDecoration: "none" }}>
            linkedin.com/in/mariajbrito
          </a>{" "}
          &nbsp;·&nbsp;
          <a href="https://floresabeirario.pt" target="_blank" rel="noreferrer" style={{ color: "var(--green)", textDecoration: "none" }}>
            floresabeirario.pt
          </a>
        </p>
      </div>
    </>
  );
}
