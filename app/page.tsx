<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Maria Brito — CV</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --orange: #F4631E;
    --yellow: #F5C518;
    --green: #3DBE6E;
    --blue: #3B82F6;
    --pink: #E879F9;
    --teal: #14B8A6;
    --red: #EF4444;
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

  /* CUSTOM CURSOR */
  .cursor {
    width: 12px; height: 12px;
    background: var(--yellow);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s, background 0.2s, width 0.2s, height 0.2s;
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
    transition: transform 0.15s ease-out, width 0.2s, height 0.2s, border-color 0.2s;
    mix-blend-mode: difference;
  }

  /* NOISE OVERLAY */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
    opacity: 0.4;
  }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    overflow: hidden;
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
    overflow: hidden;
  }

  .hero-bg-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    animation: pulse 6s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    from { transform: scale(1) rotate(0deg); }
    to { transform: scale(1.2) rotate(20deg); }
  }

  .blob1 { width: 500px; height: 500px; background: var(--orange); top: -100px; left: -100px; }
  .blob2 { width: 400px; height: 400px; background: var(--pink); bottom: -100px; right: -50px; animation-delay: -3s; }
  .blob3 { width: 300px; height: 300px; background: var(--blue); top: 50%; left: 40%; animation-delay: -1.5s; }

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

  .hero-name span {
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

  .hero-title em { color: var(--yellow); font-style: normal; }

  .hero-links {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    animation: fadeSlideIn 0.8s ease 0.3s both;
  }

  .hero-link {
    display: flex;
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

  .hero-link:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  }

  .link-email { background: var(--orange); color: white; }
  .link-linkedin { background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); color: var(--blue); }
  .link-flores { background: rgba(61, 190, 110, 0.2); border: 1px solid rgba(61, 190, 110, 0.4); color: var(--green); }

  /* PHOTO FRAME */
  .photo-frame {
    position: relative;
    width: 320px;
    height: 380px;
    animation: fadeSlideIn 0.8s ease 0.4s both;
    z-index: 2;
  }

  .photo-border {
    position: absolute;
    inset: 0;
    border-radius: 200px 200px 40px 40px;
    border: 2px solid transparent;
    background: linear-gradient(135deg, var(--orange), var(--pink), var(--blue)) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: rotate-border 8s linear infinite;
  }

  @keyframes rotate-border {
    from { filter: hue-rotate(0deg); }
    to { filter: hue-rotate(360deg); }
  }

  .photo-inner {
    position: absolute;
    inset: 8px;
    border-radius: 190px 190px 32px 32px;
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

  .photo-placeholder .initials {
    font-family: 'Syne', sans-serif;
    font-size: 64px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--orange), var(--yellow));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* FLOATING TAGS around photo */
  .float-tag {
    position: absolute;
    background: var(--card);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    padding: 8px 16px;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    white-space: nowrap;
    z-index: 3;
    animation: float 4s ease-in-out infinite alternate;
  }

  .ft1 { top: 30px; right: -40px; color: var(--yellow); border-color: rgba(245, 197, 24, 0.3); animation-delay: 0s; }
  .ft2 { bottom: 60px; left: -60px; color: var(--pink); border-color: rgba(232, 121, 249, 0.3); animation-delay: -1s; }
  .ft3 { top: 50%; right: -70px; color: var(--teal); border-color: rgba(20, 184, 166, 0.3); animation-delay: -2s; }
  .ft4 { bottom: 20px; right: 10px; color: var(--green); border-color: rgba(61, 190, 110, 0.3); animation-delay: -0.5s; }

  @keyframes float {
    from { transform: translateY(0px); }
    to { transform: translateY(-10px); }
  }

  /* SCROLL HINT */
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
  }

  .scroll-arrow {
    width: 24px;
    height: 24px;
    border-right: 2px solid var(--muted);
    border-bottom: 2px solid var(--muted);
    transform: rotate(45deg);
    animation: bounce 2s ease infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: rotate(45deg) translateY(0); }
    50% { transform: rotate(45deg) translateY(6px); }
  }

  /* SECTIONS */
  section {
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
    margin-bottom: 16px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

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

  .visible .section-label,
  .visible .section-title {
    opacity: 1;
    transform: translateY(0);
  }

  /* CARDS */
  .card {
    background: var(--card);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 24px;
    padding: 32px;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
  }

  .card.visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s, filter 0.3s;
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

  /* WORK GRID */
  .work-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .work-card { transition-delay: var(--delay, 0s); }

  .work-year {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--orange);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .work-year .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--orange);
    flex-shrink: 0;
  }

  .dot-green { background: var(--green) !important; }
  .year-green { color: var(--green) !important; }
  .dot-blue { background: var(--blue) !important; }
  .year-blue { color: var(--blue) !important; }

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
    margin-bottom: 16px;
  }

  .work-desc {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(232, 228, 217, 0.7);
  }

  .work-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 16px;
  }

  .tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 100px;
    border: 1px solid;
  }

  .tag-orange { color: var(--orange); border-color: rgba(244, 99, 30, 0.3); background: rgba(244, 99, 30, 0.08); }
  .tag-green { color: var(--green); border-color: rgba(61, 190, 110, 0.3); background: rgba(61, 190, 110, 0.08); }
  .tag-blue { color: var(--blue); border-color: rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.08); }
  .tag-pink { color: var(--pink); border-color: rgba(232, 121, 249, 0.3); background: rgba(232, 121, 249, 0.08); }
  .tag-yellow { color: var(--yellow); border-color: rgba(245, 197, 24, 0.3); background: rgba(245, 197, 24, 0.08); }
  .tag-teal { color: var(--teal); border-color: rgba(20, 184, 166, 0.3); background: rgba(20, 184, 166, 0.08); }

  /* FEATURED CARD (Flores à Beira-Rio) */
  .card-featured {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, rgba(61, 190, 110, 0.1), rgba(20, 184, 166, 0.08));
    border-color: rgba(61, 190, 110, 0.2);
  }

  .featured-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(61, 190, 110, 0.15);
    border: 1px solid rgba(61, 190, 110, 0.3);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    color: var(--green);
    margin-bottom: 16px;
  }

  .card-featured-content {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 40px;
    align-items: start;
  }

  .flores-visual {
    width: 120px;
    height: 120px;
    border-radius: 20px;
    background: linear-gradient(135deg, #0f3d22, #1a5c35);
    border: 1px solid rgba(61, 190, 110, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    animation: rotate-slow 20s linear infinite;
    flex-shrink: 0;
  }

  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* SKILLS SECTION */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }

  .skill-chip {
    background: var(--card2);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 20px 16px;
    text-align: center;
    transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
    cursor: default;
    opacity: 0;
    transform: scale(0.9);
  }

  .skill-chip.visible {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, box-shadow 0.2s;
  }

  .skill-chip:hover {
    transform: scale(1.08) !important;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  }

  .skill-icon { font-size: 28px; margin-bottom: 8px; }
  .skill-name { font-size: 12px; font-family: 'JetBrains Mono', monospace; color: var(--text); }

  /* EDUCATION */
  .edu-timeline {
    position: relative;
    padding-left: 40px;
  }

  .edu-timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 8px;
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

  .edu-item.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .edu-item::before {
    content: '';
    position: absolute;
    left: -46px;
    top: 8px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--dark);
    border: 2px solid var(--orange);
    transition: background 0.3s;
  }

  .edu-item:nth-child(2)::before { border-color: var(--pink); }
  .edu-item:nth-child(3)::before { border-color: var(--blue); }

  .edu-item:hover::before { background: var(--orange); }

  .edu-year {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--orange);
    margin-bottom: 6px;
  }

  .edu-degree {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .edu-school {
    font-size: 13px;
    color: var(--muted);
  }

  /* LANGUAGES */
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
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s;
  }

  .lang-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .lang-card:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }

  .lang-level {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 4px;
  }

  .lang-name {
    font-size: 13px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 12px;
  }

  .lang-bar {
    height: 3px;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
    overflow: hidden;
  }

  .lang-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 1s ease 0.5s;
  }

  /* INTERNSHIPS */
  .intern-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* CONTACT BAR */
  .contact-bar {
    background: var(--card);
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 60px;
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

  .contact-cta span {
    background: linear-gradient(135deg, var(--orange), var(--yellow));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
    box-shadow: 0 20px 50px rgba(244, 99, 30, 0.4);
  }

  /* MARQUEE */
  .marquee-wrap {
    overflow: hidden;
    padding: 24px 0;
    border-top: 1px solid rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.04);
    background: rgba(255,255,255,0.02);
    margin-bottom: 0;
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
    font-size: 13px;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 2px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .marquee-item::after {
    content: '✦';
    color: var(--orange);
    font-size: 10px;
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* SECTION ROW LAYOUT */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
  }

  /* INTERACTIVE COUNTER */
  .stat-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 60px;
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

  /* HOVER highlight effect */
  .highlight {
    position: relative;
    display: inline-block;
  }
  .highlight::after {
    content: '';
    position: absolute;
    bottom: 2px; left: 0; right: 0;
    height: 8px;
    background: var(--yellow);
    opacity: 0.3;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: -1;
  }
  .highlight:hover::after { transform: scaleX(1); }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 768px) {
    .hero { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    section { padding: 60px 24px; }
    .work-grid, .intern-grid, .two-col { grid-template-columns: 1fr; }
    .lang-grid { grid-template-columns: repeat(2, 1fr); }
    .stat-row { grid-template-columns: repeat(2, 1fr); }
    .card-featured-content { grid-template-columns: 1fr; }
    .hero-left { padding: 60px 24px; }
    .contact-bar { padding: 40px 24px; }
  }
</style>
</head>
<body>

<!-- CURSOR -->
<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>

<!-- HERO -->
<div class="hero">
  <div class="hero-bg-blob blob1"></div>
  <div class="hero-bg-blob blob2"></div>
  <div class="hero-bg-blob blob3"></div>

  <div class="hero-left">
    <div class="status-badge">
      <div class="status-dot"></div>
      open to opportunities
    </div>

    <h1 class="hero-name">
      Maria<span>Brito</span>
    </h1>

    <p class="hero-title">
      Designer · Educator · <em>Co-founder</em> · Tech Enthusiast
    </p>

    <div class="hero-links">
      <a href="mailto:mariajgbrito@hotmail.com" class="hero-link link-email">
        ✉ mariajgbrito@hotmail.com
      </a>
      <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" class="hero-link link-linkedin">
        in LinkedIn
      </a>
      <a href="https://floresabeirario.pt" target="_blank" class="hero-link link-flores">
        🌸 floresabeirario.pt
      </a>
    </div>
  </div>

  <div class="hero-right">
    <div class="photo-frame">
      <div class="photo-border"></div>
      <div class="photo-inner">
        <!-- Replace src="mj.webp" with your actual photo -->
        <img src="mj.webp" alt="Maria Brito"
          onerror="this.style.display='none'; this.parentNode.querySelector('.photo-placeholder').style.display='flex';">
        <div class="photo-placeholder" style="display:none;">
          <div class="initials">MJB</div>
          <span>add mj.webp<br>to same folder</span>
        </div>
      </div>
      <div class="float-tag ft1">🎨 Design</div>
      <div class="float-tag ft2">🤖 AI Coach</div>
      <div class="float-tag ft3">👩‍💻 Educator</div>
      <div class="float-tag ft4">🌸 Founder</div>
    </div>
  </div>

  <div class="scroll-hint">
    <span>scroll</span>
    <div class="scroll-arrow"></div>
  </div>
</div>

<!-- MARQUEE -->
<div class="marquee-wrap">
  <div class="marquee-track">
    <div class="marquee-item">Design & Multimedia</div>
    <div class="marquee-item">AI Education</div>
    <div class="marquee-item">Flower Preservation</div>
    <div class="marquee-item">Web Development</div>
    <div class="marquee-item">Youth Workshops</div>
    <div class="marquee-item">Visual Storytelling</div>
    <div class="marquee-item">Creative Technology</div>
    <div class="marquee-item">Design & Multimedia</div>
    <div class="marquee-item">AI Education</div>
    <div class="marquee-item">Flower Preservation</div>
    <div class="marquee-item">Web Development</div>
    <div class="marquee-item">Youth Workshops</div>
    <div class="marquee-item">Visual Storytelling</div>
    <div class="marquee-item">Creative Technology</div>
  </div>
</div>

<!-- STATS -->
<section class="reveal-section">
  <div class="section-label">at a glance</div>
  <div class="section-title">By the numbers</div>
  <div class="stat-row">
    <div class="stat-box">
      <div class="stat-num" style="color: var(--orange);" data-count="5">0</div>
      <div class="stat-label">years teaching</div>
    </div>
    <div class="stat-box">
      <div class="stat-num" style="color: var(--pink);" data-count="4">0</div>
      <div class="stat-label">languages</div>
    </div>
    <div class="stat-box">
      <div class="stat-num" style="color: var(--green);" data-count="1">0</div>
      <div class="stat-label">company co-founded</div>
    </div>
  </div>
</section>

<!-- WORK EXPERIENCE -->
<section class="reveal-section">
  <div class="section-label">career</div>
  <div class="section-title">Work experience</div>

  <div class="work-grid">

    <!-- FLORES À BEIRA-RIO - FEATURED -->
    <div class="card card-green card-featured" style="--delay: 0s;">
      <div class="featured-badge">⭐ latest venture</div>
      <div class="card-featured-content">
        <div>
          <div class="work-year year-green"><div class="dot dot-green"></div>2025 — Present</div>
          <div class="work-role">Co-Founder</div>
          <div class="work-org">Flores à Beira-Rio · floresabeirario.pt</div>
          <p class="work-desc">Co-founded a flower preservation company, creating lasting botanical art through pressed and dried flower techniques. Manages design, branding, digital presence and creative direction.</p>
          <div class="work-tags">
            <span class="tag tag-green">Entrepreneurship</span>
            <span class="tag tag-teal">Branding</span>
            <span class="tag tag-green">Creative Direction</span>
          </div>
        </div>
        <div class="flores-visual">🌸</div>
      </div>
    </div>

    <!-- TUMO -->
    <div class="card card-orange" style="--delay: 0.1s;">
      <div class="work-year"><div class="dot"></div>2023 — Present</div>
      <div class="work-role">Learning Coach & Infodesk</div>
      <div class="work-org">TUMO Coimbra</div>
      <p class="work-desc">After-school tech program where teens 12–18 learn animation, game development, filmmaking, music, robotics, and 3D modeling.</p>
      <div class="work-tags">
        <span class="tag tag-orange">Youth Tech</span>
        <span class="tag tag-yellow">Coaching</span>
        <span class="tag tag-pink">Game Dev</span>
      </div>
    </div>

    <!-- CLONLARA -->
    <div class="card card-pink" style="--delay: 0.2s;">
      <div class="work-year"><div class="dot" style="background: var(--pink)"></div><span style="color:var(--pink)">2023 — Present</span></div>
      <div class="work-role">Clonlara Teacher</div>
      <div class="work-org">Colégio de São José</div>
      <p class="work-desc">Personalized learning approach that fosters authenticity, autonomy, and joy in the learning process.</p>
      <div class="work-tags">
        <span class="tag tag-pink">Pedagogy</span>
        <span class="tag tag-blue">Autonomy</span>
      </div>
    </div>

    <!-- PRIVATE TEACHER -->
    <div class="card card-blue" style="--delay: 0.3s;">
      <div class="work-year"><div class="dot dot-blue"></div><span class="year-blue">2022 — Present</span></div>
      <div class="work-role">Private Teacher</div>
      <div class="work-org">Homeschooling · ages 11–14</div>
      <p class="work-desc">Teaching Technological Education, Visual Education and Design in Interactive Media to homeschooled students.</p>
      <div class="work-tags">
        <span class="tag tag-blue">Interactive Design</span>
        <span class="tag tag-teal">Visual Education</span>
      </div>
    </div>

    <!-- ICT TEACHER -->
    <div class="card card-yellow" style="--delay: 0.4s;">
      <div class="work-year"><div class="dot" style="background: var(--yellow)"></div><span style="color:var(--yellow)">2022 — 2023</span></div>
      <div class="work-role">ICT Teacher</div>
      <div class="work-org">Agrupamento de Escolas de Castanheira de Pêra · ages 8–18</div>
      <p class="work-desc">Teaching Information and Communication Technologies across all age groups in a public school environment.</p>
      <div class="work-tags">
        <span class="tag tag-yellow">ICT</span>
        <span class="tag tag-orange">Curriculum Design</span>
      </div>
    </div>

  </div>
</section>

<!-- EDUCATION -->
<section class="reveal-section">
  <div class="section-label">academia</div>
  <div class="section-title">Education</div>
  <div class="edu-timeline">
    <div class="edu-item">
      <div class="edu-year">2023</div>
      <div class="edu-degree highlight">Training in Computational Thinking in Mathematics with Scratch</div>
      <div class="edu-school">CENFORMAZ</div>
    </div>
    <div class="edu-item">
      <div class="edu-year" style="color: var(--pink)">2016</div>
      <div class="edu-degree highlight">Bachelor's Degree in Design and Multimedia</div>
      <div class="edu-school">University of Coimbra · Faculty of Sciences and Technology</div>
    </div>
  </div>
</section>

<!-- SKILLS / SOFTWARE -->
<section class="reveal-section">
  <div class="section-label">toolkit</div>
  <div class="section-title">Software & Skills</div>
  <div class="skills-grid" id="skillsGrid">
    <div class="skill-chip" style="--d:0.0s"><div class="skill-icon">🎨</div><div class="skill-name">Illustrator</div></div>
    <div class="skill-chip" style="--d:0.05s"><div class="skill-icon">📐</div><div class="skill-name">InDesign</div></div>
    <div class="skill-chip" style="--d:0.1s"><div class="skill-icon">📷</div><div class="skill-name">Photoshop</div></div>
    <div class="skill-chip" style="--d:0.15s"><div class="skill-icon">🎬</div><div class="skill-name">Premiere</div></div>
    <div class="skill-chip" style="--d:0.2s"><div class="skill-icon">📸</div><div class="skill-name">Lightroom</div></div>
    <div class="skill-chip" style="--d:0.25s"><div class="skill-icon">💻</div><div class="skill-name">HTML</div></div>
    <div class="skill-chip" style="--d:0.3s"><div class="skill-icon">🎨</div><div class="skill-name">CSS</div></div>
    <div class="skill-chip" style="--d:0.35s"><div class="skill-icon">📊</div><div class="skill-name">MS Office</div></div>
    <div class="skill-chip" style="--d:0.4s"><div class="skill-icon">🤖</div><div class="skill-name">AI Tools</div></div>
    <div class="skill-chip" style="--d:0.45s"><div class="skill-icon">🌱</div><div class="skill-name">Scratch</div></div>
    <div class="skill-chip" style="--d:0.5s"><div class="skill-icon">🧠</div><div class="skill-name">Prompting</div></div>
    <div class="skill-chip" style="--d:0.55s"><div class="skill-icon">🌐</div><div class="skill-name">Web Design</div></div>
  </div>
</section>

<!-- INTERNSHIPS -->
<section class="reveal-section">
  <div class="section-label">experience abroad</div>
  <div class="section-title">Internships</div>
  <div class="intern-grid">

    <div class="card card-pink" style="--delay: 0s;">
      <div class="work-year"><div class="dot" style="background: var(--pink)"></div><span style="color: var(--pink)">2021 — 2022 · Paris, France</span></div>
      <div class="work-role">Production & Creative Direction</div>
      <div class="work-org">Photo Crew Assistant — Julien Tavel, Fashion Photographer</div>
      <p class="work-desc">Assisted in production, photo crew management, and creative direction with internationally recognized fashion photographer.</p>
      <div class="work-tags">
        <span class="tag tag-pink">Fashion</span>
        <span class="tag tag-blue">Photography</span>
        <span class="tag tag-yellow">Creative Direction</span>
      </div>
    </div>

    <div class="card card-blue" style="--delay: 0.15s;">
      <div class="work-year"><div class="dot dot-blue"></div><span class="year-blue">2021 · Athens, Greece</span></div>
      <div class="work-role">Graphic Designer</div>
      <div class="work-org">ShipLemon & DeliverBack</div>
      <p class="work-desc">Web design, graphic design, email & newsletter optimization and restructuring for two tech-oriented companies.</p>
      <div class="work-tags">
        <span class="tag tag-blue">Web Design</span>
        <span class="tag tag-teal">Email Design</span>
        <span class="tag tag-orange">Graphic Design</span>
      </div>
    </div>

  </div>
</section>

<!-- LANGUAGES -->
<section class="reveal-section">
  <div class="section-label">communication</div>
  <div class="section-title">Languages</div>
  <div class="lang-grid">
    <div class="lang-card" style="--d: 0s;">
      <div class="lang-level" style="color: var(--orange);">PT</div>
      <div class="lang-name">Portuguese</div>
      <div style="font-size: 11px; color: var(--muted); margin-bottom: 10px; font-family: 'JetBrains Mono', monospace;">Native</div>
      <div class="lang-bar"><div class="lang-fill" data-w="100" style="width: 0%; background: var(--orange);"></div></div>
    </div>
    <div class="lang-card" style="--d: 0.1s;">
      <div class="lang-level" style="color: var(--blue);">EN</div>
      <div class="lang-name">English</div>
      <div style="font-size: 11px; color: var(--muted); margin-bottom: 10px; font-family: 'JetBrains Mono', monospace;">C2</div>
      <div class="lang-bar"><div class="lang-fill" data-w="95" style="width: 0%; background: var(--blue);"></div></div>
    </div>
    <div class="lang-card" style="--d: 0.2s;">
      <div class="lang-level" style="color: var(--yellow);">ES</div>
      <div class="lang-name">Spanish</div>
      <div style="font-size: 11px; color: var(--muted); margin-bottom: 10px; font-family: 'JetBrains Mono', monospace;">A2</div>
      <div class="lang-bar"><div class="lang-fill" data-w="35" style="width: 0%; background: var(--yellow);"></div></div>
    </div>
    <div class="lang-card" style="--d: 0.3s;">
      <div class="lang-level" style="color: var(--pink);">FR</div>
      <div class="lang-name">French</div>
      <div style="font-size: 11px; color: var(--muted); margin-bottom: 10px; font-family: 'JetBrains Mono', monospace;">A2</div>
      <div class="lang-bar"><div class="lang-fill" data-w="35" style="width: 0%; background: var(--pink);"></div></div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<div class="contact-bar">
  <div class="contact-cta">Let's build something <span>amazing</span> together.</div>
  <a href="mailto:mariajgbrito@hotmail.com" class="contact-btn">
    ✉ Get in touch
  </a>
  <p style="margin-top: 24px; color: var(--muted); font-size: 13px; font-family: 'JetBrains Mono', monospace;">
    mariajgbrito@hotmail.com &nbsp;·&nbsp;
    <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" style="color: var(--blue); text-decoration: none;">linkedin.com/in/mariajbrito</a> &nbsp;·&nbsp;
    <a href="https://floresabeirario.pt" target="_blank" style="color: var(--green); text-decoration: none;">floresabeirario.pt</a>
  </p>
</div>

<script>
  // ── CURSOR ──
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  document.querySelectorAll('a, button, .card, .skill-chip').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px'; cursor.style.height = '20px';
      ring.style.width = '60px'; ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px'; cursor.style.height = '12px';
      ring.style.width = '40px'; ring.style.height = '40px';
    });
  });

  // ── INTERSECTION OBSERVER ──
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // animate lang bars
        entry.target.querySelectorAll('.lang-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 300);
        });
        // animate counters
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          const target = parseInt(el.dataset.count);
          let current = 0;
          const step = Math.ceil(target / 30);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(timer);
          }, 50);
        });
      }
    });
  }, { threshold: 0.15 });

  // Observe sections
  document.querySelectorAll('.reveal-section').forEach(s => {
    s.querySelectorAll('.section-label, .section-title').forEach(el => io.observe(el));
  });

  // Observe cards with delays
  document.querySelectorAll('.card').forEach((card, i) => {
    const delay = parseFloat(getComputedStyle(card).getPropertyValue('--delay')) || 0;
    const cardObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), delay * 1000);
          cardObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    cardObs.observe(card);
  });

  // Observe skill chips
  document.querySelectorAll('.skill-chip').forEach(chip => {
    const delay = parseFloat(getComputedStyle(chip).getPropertyValue('--d')) || 0;
    const chipObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), delay * 1000);
          chipObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    chipObs.observe(chip);
  });

  // Observe lang cards, edu items
  document.querySelectorAll('.lang-card, .edu-item').forEach(el => {
    const delay = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
    const elObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.classList.add('visible');
            e.target.querySelectorAll('.lang-fill').forEach(bar => {
              setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 300);
            });
          }, delay * 1000);
          elObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    elObs.observe(el);
  });

  // Observe stat counters
  document.querySelectorAll('[data-count]').forEach(el => {
    const statObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.count);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + 1, target);
            e.target.textContent = current;
            if (current >= target) clearInterval(timer);
          }, 80);
          statObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    statObs.observe(el);
  });

  // ── PARALLAX on hero blobs ──
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    document.querySelector('.blob1').style.transform = `translate(${x}px, ${y}px)`;
    document.querySelector('.blob2').style.transform = `translate(${-x * 0.8}px, ${-y * 0.8}px)`;
    document.querySelector('.blob3').style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  });
</script>
</body>
</html>
