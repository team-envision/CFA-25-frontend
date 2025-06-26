import React from "react";


const Teams = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-10 relative overflow-hidden">
      

      <div className="relative bg-[radial-gradient(circle_at_top_left,rgba(121,39,0,0.3),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(121,39,0,0.3),transparent_20%),#0c0c0c] rounded-2xl p-8 w-full max-w-[90vw] text-white h-[90vh] z-10 flex flex-col">
        <h1 className="text-4xl font-bold text-center mb-8">Teams</h1>

        <div className="mb-9">
          <h2 className="text-xl font-semibold mb-3">• Envision</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            Envision is a multi-disciplinary technical team of Aaruush, focused on creating unique, end-to-end solutions and ideas. It has the following 9 divisions.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-2 border border-white/30 rounded-full text-xs text-gray-200 bg-white/5 hover:bg-white/20 transition">Artificial Intelligence / Machine Learning</span>
            <span className="px-3 py-2 border border-white/30 rounded-full text-xs text-gray-200 bg-white/5 hover:bg-white/20 transition">Application Development</span>
            <span className="px-3 py-2 border border-white/30 rounded-full text-xs text-gray-200 bg-white/5 hover:bg-white/20 transition">Blockchain</span>
            <span className="px-3 py-2 border border-white/30 rounded-full text-xs text-gray-200 bg-white/5 hover:bg-white/20 transition">Cloud & Devops</span>
            <span className="px-3 py-2 border border-white/30 rounded-full text-xs text-gray-200 bg-white/5 hover:bg-white/20 transition">Design</span>
            <span className="px-3 py-2 border border-white/30 rounded-full text-xs text-gray-200 bg-white/5 hover:bg-white/20 transition">Editorial</span>
            <span className="px-3 py-2 border border-white/30 rounded-full text-xs text-gray-200 bg-white/5 hover:bg-white/20 transition">Game Development</span>
            <span className="px-3 py-2 border border-white/30 rounded-full text-xs text-gray-200 bg-white/5 hover:bg-white/20 transition">Embedded Systems & Mechatronics</span>
            <span className="px-3 py-2 border border-white/30 rounded-full text-xs text-gray-200 bg-white/5 hover:bg-white/20 transition">Web Development</span>
          </div>
        </div>

        <div className="mb-9">
          <h2 className="text-xl font-semibold mb-3">• Outreach</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Team Outreach at Aaruush excels in executing events outside SRMIST in collaboration with partner universities and clubs to enhance the name of Aaruush. They organise impactful events that engage diverse audiences and provide valuable insights into trends and needs. Their efficient coordination ensures smooth management, and by mastering these areas, Team Outreach enhances Aaruush's reputation, builds strong connections, and drives growth and success within the community and beyond.
          </p>
        </div>

        <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-1/2 flex gap-5 z-10">
          <button className="px-7 py-3 border border-[#ff5a28]/30 rounded-2xl text-base font-bold bg-gradient-to-br from-[#121212] to-[#1a1a1a] text-white shadow-[inset_0_0_6px_rgba(255,90,40,0.2),0_0_10px_rgba(255,90,40,0.1)] backdrop-blur transition hover:from-[#1e1e1e] hover:to-[#2a2a2a]">Join Team Envision</button>
          <button className="px-7 py-3 border border-[#ff5a28]/30 rounded-2xl text-base font-bold bg-gradient-to-br from-[#121212] to-[#1a1a1a] text-white shadow-[inset_0_0_6px_rgba(255,90,40,0.2),0_0_10px_rgba(255,90,40,0.1)] backdrop-blur transition hover:from-[#1e1e1e] hover:to-[#2a2a2a]">Join Team Outreach</button>
        </div>
      </div>
    </div>
  );
};

export default Teams;