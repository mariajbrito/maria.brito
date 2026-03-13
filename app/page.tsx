"use client";
import Image from "next/image";

// Estilos de animação customizados via CSS injetado
const globalStyles = `
  @keyframes float-blob { 
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(40px, -60px) scale(1.1); }
    66% { transform: translate(-30px, 30px) scale(0.9); }
  }
  @keyframes fade-up { 
    from { opacity: 0; transform: translateY(20px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  .animate-blob { animation: float-blob 20s infinite alternate ease-in-out; }
  .animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
`;

export default function Home() {
  
  // Dados traduzidos e atualizados do CV
  const experience = [
    { 
      role: "Co-founder & Chief Design Botanist", 
      company: "Flores à beira rio", 
      year: "2025–Present", 
      color: "border-[#CA7333]/50 text-[#CA7333]",
      desc: "Merging interactive design and nature education. We create tech-enabled botanical installations and educational experiences along the riverside, teaching conservation through visual storytelling." 
    },
    { 
      role: "Learning Coach & Infodesk", 
      company: "TUMO Coimbra", 
      year: "2023–Present", 
      color: "border-[#4C95D4]/50 text-[#4C95D4]",
      desc: "After-school program where teens (12-18) learn skills like animation, game development, filmmaking, music, robotics, and 3D modeling." 
    },
    { 
      role: "Clonlara Teacher", 
      company: "Colégio de São José", 
      year: "2023–Present", 
      color: "border-[#FABC05]/50 text-[#FABC05]",
      desc: "Highly personalized learning approach that fosters authenticity, autonomy, and joy in the learning process." 
    },
    { 
      role: "Private Teacher (Homeschooling)", 
      company: "Independent Contractor", 
      year: "2022–Present", 
      color: "border-[#E89CB0]/50 text-[#E89CB0]",
      desc: "Teaching Technological Education, Visual Education, and Design in Interactive Media for ages 11-14." 
    },
    { 
      role: "ICT Teacher", 
      company: "Castanheira de Pêra Schools", 
      year: "2022–2023", 
      color: "border-[#CA7333]/50 text-[#CA7333]",
      desc: "Information and Communication Technologies (ICT) Teacher for ages 8-18." 
    }
  ];

  const education = [
    { degree: "Computational Thinking & Scratch in Math", company: "CENFORMAZ", year: "2023" },
    { degree: "Bachelor's Degree in Design and Multimedia", company: "University of Coimbra (Faculty of Sciences & Technology)", year: "2016" }
  ];

  const internships = [
    { role: "Photo Crew Assistant & Creative Direction", company: "Fashion Photographer Julien Tavel (Paris, France)", year: "2021–2022" },
    { role: "Graphic Designer", company: "ShipLemon & DeliverBack (Athens, Greece)", year: "2021", desc: "Web design, graphic design, email & newsletter optimization." }
  ];

  const software = ["HTML", "CSS", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Adobe Premiere Pro", "Adobe Lightroom", "Microsoft Office"];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#E89CB0]/30 selection:text-[#E89CB0] overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {/* --- COMPLEX BACKGROUND ANIMATION (Bué Colorido & High-Tech) --- */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,black_30%,transparent_100%)]">
        {/* Ochre Blob */}
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#CA7333]/30 rounded-full blur-[180px] animate-blob"></div>
        {/* Blue Blob */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] bg-[#4C95D4]/25 rounded-full blur-[200px] animate-blob animate-delay-2000"></div>
        {/* Pink Blob */}
        <div className="absolute top-[30%] right-[20%] w-[60vw] h-[60vw] bg-[#E89CB0]/15 rounded-full blur-[150px] animate-blob animate-delay-4000"></div>
        {/* Yellow Flash */}
        <div className="absolute top-[10%] right-[30%] w-[300px] h-[300px] bg-[#FABC05]/10 rounded-full blur-[100px] animate-pulse"></div>
        
        {/* Subtil Grid Overlay */}
        <div className="absolute inset-0 bg-[size:100px_100px] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 flex flex-col md:flex-row gap-16">
        
        {/* --- LEFT SIDE: Perfil & Bio (Animação de Entrada) --- */}
        <div className="md:w-[35%] flex flex-col items-center md:items-start text-center md:text-left space-y-12 animate-fade-up">
          
          {/* Caixa de Foto/Nome Orgânica & Tech */}
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#CA7333] via-[#FABC05] to-[#4C95D4] rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-zinc-900 border border-zinc-800 p-10 rounded-3xl flex flex-col items-center md:items-start space-y-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-700 shadow-xl group-hover:border-zinc-100 transition-colors">
                <Image src="/mj.webp" alt="Maria Brito" fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-6xl md:text-7xl font-bold font-serif tracking-tight text-white mb-2 leading-[0.9]">maria<br/>brito</h1>
                <p className="font-mono text-xs tracking-widest text-[#FABC05] uppercase">Creative Developer / Digital Botanist / Educator</p>
              </div>
              <div className="w-full space-y-3 font-mono text-xs text-zinc-400">
                <a href="mailto:mariajgbrito@hotmail.com" className="flex items-center gap-3 hover:text-[#CA7333] transition-colors p-3 bg-zinc-950/50 rounded-lg border border-zinc-800 hover:border-[#CA7333]/50">
                  <span className="text-[#CA7333] font-black">@_</span> mariajgbrito@hotmail.com
                </a>
                <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#4C95D4] transition-colors p-3 bg-zinc-950/50 rounded-lg border border-zinc-800 hover:border-[#4C95D4]/50">
                  <span className="text-[#4C95D4] font-black">LINK_</span> linkedin.com/in/mariajbrito
                </a>
              </div>
            </div>
          </div>

          {/* Línguas (Efeito Glow) */}
          <div className="w-full bg-zinc-900 border border-zinc-800 p-8 rounded-3xl animate-fade-up animate-delay-200">
            <h3 className="font-mono text-xs tracking-widest text-zinc-600 uppercase mb-5 border-b border-zinc-800 pb-2">Language Matrix</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="flex justify-between items-center"><span className="text-zinc-100 font-medium">Portuguese</span> <span className="text-[#CA7333] text-xs font-mono p-1 bg-[#CA7333]/10 rounded border border-[#CA7333]/30">Native</span></div>
              <div className="flex justify-between items-center"><span className="text-zinc-100 font-medium">English</span> <span className="text-[#4C95D4] text-xs font-mono p-1 bg-[#4C95D4]/10 rounded border border-[#4C95D4]/30">C2</span></div>
              <div className="flex justify-between items-center"><span className="text-zinc-100 font-medium">Spanish</span> <span className="text-[#E89CB0] text-xs font-mono p-1 bg-[#E89CB0]/10 rounded border border-[#E89CB0]/30">A2</span></div>
              <div className="flex justify-between items-center"><span className="text-zinc-100 font-medium">French</span> <span className="text-[#FABC05] text-xs font-mono p-1 bg-[#FABC05]/10 rounded border border-[#FABC05]/30">A2</span></div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: Conteúdo Dinâmico (Animação de Escada) --- */}
        <div className="md:w-[65%] space-y-16">
          
          {/* Work Experience */}
          <section className="space-y-8 animate-fade-up animate-delay-300">
            <h2 className="text-2xl font-black text-white uppercase font-serif tracking-tight border-b border-zinc-800 pb-3">System Protocol_ Work Experience</h2>
            <div className="space-y-8">
              {experience.map((item, idx) => (
                <div key={idx} className={`relative p-8 rounded-3xl bg-zinc-900 border border-zinc-800 ${item.color.split(' ')[0]} group hover:bg-zinc-800/50 hover:shadow-[0_10px_30px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-1`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-zinc-50 group-hover:text-white transition-colors leading-tight">{item.role}</h3>
                    <span className={`flex-shrink-0 font-mono text-xs ${item.color.split(' ')[1]} p-2 bg-black/30 rounded-full border ${item.color.split(' ')[0]} h-fit tracking-wide mt-1 md:mt-0`}>
                      {item.year}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-zinc-500 mb-4">{item.company}</p>
                  <p className="text-zinc-300 text-sm leading-relaxed max-w-xl">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Internships (Grid Colorido) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up animate-delay-500">
            {/* Education */}
            <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white uppercase font-serif border-l-4 border-[#FABC05] pl-3">Education</h2>
              <div className="space-y-6">
                {education.map((item, idx) => (
                  <div key={idx} className="space-y-1 font-sans group">
                    <p className="text-zinc-100 font-semibold group-hover:text-[#FABC05] transition-colors">{item.degree}</p>
                    <p className="text-xs text-zinc-500 font-mono tracking-wide">{item.company} | {item.year}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Internships */}
            <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white uppercase font-serif border-l-4 border-[#E89CB0] pl-3">System Integrations_ Internships</h2>
              <div className="space-y-6">
                {internships.map((item, idx) => (
                  <div key={idx} className="space-y-1 group relative">
                    <p className="text-zinc-100 font-semibold group-hover:text-[#E89CB0] transition-colors">{item.role}</p>
                    <p className="text-xs text-zinc-500 font-mono tracking-wide">{item.company} | {item.year}</p>
                    {item.desc && <p className="text-xs text-zinc-400 mt-2 italic leading-relaxed">{item.desc}</p>}
                    <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 font-mono text-[9px] bg-[#E89CB0]/10 text-[#E89CB0] px-2 py-0.5 rounded border border-[#E89CB0]/30 uppercase">Global</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Software Skills (Tech Tags Glow) */}
          <section className="animate-fade-up animate-delay-700 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-black text-white uppercase font-serif tracking-tight border-b border-zinc-800 pb-3 mb-8">Software Core Protocols_</h2>
            <div className="flex flex-wrap gap-4">
              {software.map((skill, idx) => (
                <div key={idx} className="group relative">
                  {/* Glowing Outline Eeffect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4C95D4] via-[#FABC05] to-[#E89CB0] rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
                  <div className="relative font-mono text-sm bg-black/60 border border-zinc-700 text-zinc-200 px-6 py-3 rounded-xl group-hover:border-zinc-500 transition-all duration-300 cursor-default">
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
      
      {/* Footer (Tech Detail) */}
      <footer className="w-full text-center py-10 border-t border-zinc-900 animate-fade-up animate-delay-900 mt-20 relative z-10">
        <div className="font-mono text-[10px] text-zinc-700 tracking-[0.3em]">
          MARIA_BRITO_SYSTEM_OS v2.6 // FLORA_ENGINE: ACTIVE
        </div>
      </footer>
    </main>
  );
}
