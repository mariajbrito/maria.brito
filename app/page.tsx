"use client";
import { useState } from "react";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("experience");

  // Dados extraídos do teu CV
  const experience = [
    { role: "Learning Coach & Infodesk", company: "TUMO Coimbra", year: "2023-Today", desc: "Programa pós-escolar onde jovens (12-18) aprendem animação, game dev, filmmaking, música, robótica e modelação 3D." },
    { role: "Clonlara Teacher", company: "Colégio de São José", year: "2023-Today", desc: "Abordagem de aprendizagem altamente personalizada que promove a autenticidade, autonomia e a alegria de aprender." },
    { role: "Private Teacher", company: "Homeschooling", year: "2022-Today", desc: "Ensino de Educação Tecnológica, Visual e Design em Media Interativa (idades 11-14)." },
    { role: "ICT Teacher", company: "Escolas de Castanheira de Pêra", year: "2022-2023", desc: "Professora de Tecnologias de Informação e Comunicação (idades 8-18)." }
  ];

  const educationAndInternships = [
    { role: "Photo Crew Assistant & Creative Dir.", company: "Julien Tavel (Paris)", year: "2021-2022", type: "Internship" },
    { role: "Graphic Designer", company: "ShipLemon & DeliverBack (Athens)", year: "2021", type: "Internship" },
    { role: "Computational Thinking & Scratch", company: "CENFORMAZ", year: "2023", type: "Training" },
    { role: "Bachelor in Design and Multimedia", company: "University of Coimbra", year: "2016", type: "Degree" }
  ];

  const skills = ["HTML", "CSS", "Photoshop", "Illustrator", "InDesign", "Premiere", "Lightroom", "Microsoft Office"];

  return (
    <main className="min-h-screen bg-[#030303] text-gray-300 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      
      {/* Efeitos de Luz de Fundo (High-Tech) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        {/* Linhas de grelha subtis */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-16 relative z-10">
        
        {/* Lado Esquerdo: Perfil e Contactos */}
        <div className="md:w-1/3 flex flex-col space-y-8 relative">
          {/* Caixa de Foto/Nome com borda brilhante */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0a0a0a] border border-gray-800 p-8 rounded-2xl flex flex-col items-start">
              <h1 className="text-5xl font-black tracking-tighter text-white mb-2 uppercase">Maria <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Brito</span></h1>
              <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase mb-6">Creative Developer <br/>& Educator</p>
              
              <div className="space-y-3 font-mono text-xs text-gray-400 w-full">
                <a href="mailto:mariajgbrito@hotmail.com" className="flex items-center gap-3 hover:text-cyan-400 transition-colors bg-gray-900/50 p-3 rounded-lg border border-gray-800 hover:border-cyan-500/50">
                  <span className="text-cyan-500">EMAIL_</span> mariajgbrito@hotmail.com
                </a>
                <a href="https://www.linkedin.com/in/mariajbrito/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors bg-gray-900/50 p-3 rounded-lg border border-gray-800 hover:border-cyan-500/50">
                  <span className="text-cyan-500">LINK_</span> linkedin.com/in/mariajbrito
                </a>
              </div>
            </div>
          </div>

          {/* Línguas */}
          <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-2xl">
            <h3 className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-4 uppercase">System Languages</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white">Portuguese</span><span className="text-cyan-500 font-mono">NATIVE</span></div>
              <div className="flex justify-between"><span className="text-white">English</span><span className="text-cyan-500 font-mono">C2</span></div>
              <div className="flex justify-between"><span className="text-white">Spanish</span><span className="text-cyan-500 font-mono">A2</span></div>
              <div className="flex justify-between"><span className="text-white">French</span><span className="text-cyan-500 font-mono">A2</span></div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Conteúdo Interativo (Tabs) */}
        <div className="md:w-2/3 flex flex-col">
          
          {/* Navegação das Abas */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-800 pb-4">
            {["experience", "education", "skills"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-md transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,255,0.2)]" 
                    : "text-gray-500 hover:text-white hover:bg-gray-800 border border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conteúdo Dinâmico com base na aba escolhida */}
          <div className="relative min-h-[400px]">
            
            {/* TAB: EXPERIENCE */}
            {activeTab === "experience" && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
                {experience.map((item, idx) => (
                  <div key={idx} className="group relative bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(0,255,255,0.05)]">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.role}</h3>
                      <span className="font-mono text-xs text-purple-400 bg-purple-900/20 px-3 py-1 rounded-full mt-2 md:mt-0 border border-purple-500/30">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-gray-500 mb-3">{item.company}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: EDUCATION & INTERNSHIPS */}
            {activeTab === "education" && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
                {educationAndInternships.map((item, idx) => (
                  <div key={idx} className="group relative bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(168,85,247,0.05)]">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{item.role}</h3>
                      <span className="font-mono text-xs text-cyan-400 bg-cyan-900/20 px-3 py-1 rounded-full mt-2 md:mt-0 border border-cyan-500/30">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-gray-500">{item.company}</p>
                    <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 font-mono text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded shadow-lg uppercase">
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SKILLS */}
            {activeTab === "skills" && (
              <div className="animate-[fadeIn_0.5s_ease-in-out]">
                <h3 className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-6 uppercase">Software Core Protocols</h3>
                <div className="flex flex-wrap gap-4">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="relative group cursor-default">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                      <div className="relative font-mono text-sm bg-gray-900 border border-gray-700 text-white px-6 py-3 rounded-lg group-hover:border-cyan-500 transition-colors">
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      
      {/* Pequeno CSS injetado para a animação de fade in suave nas abas */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </main>
  );
}
