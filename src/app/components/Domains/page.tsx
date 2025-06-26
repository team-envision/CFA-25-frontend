import React from "react";


const Domains = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden">
      {/* Particles component for background effect */}
      

      <div className="relative backdrop-blur-md bg-gradient-radial from-orange-900/30 via-transparent to-zinc-900 rounded-2xl p-8 w-full max-w-6xl text-white h-[90vh] z-10">
        <h1 className="text-4xl text-center mb-8 font-bold">Domains</h1>

        <div className="flex gap-12 relative h-full">
          {/* Left Section */}
          <div className="flex flex-col gap-4 flex-1">
            {[
              { title: "Highlights", desc: "Promote understanding and collaboration while supervising the provision of hospitality of guests." },
              { title: "Championships", desc: "Enable smooth event execution and inspire greatness through fair play and competition." },
              { title: "Initiatives", desc: "Assimilate new strategies and enterprises to make a difference in our Society." },
              { title: "Workshops & Expos", desc: "Conceptualise and Conduct workshops with notable global organisations." },
              { title: "Finance", desc: "Propose the Annual Budget, Allocate funds, and manage fiscal records." },
              { title: "Quality Assurance", desc: "Assimilate new strategies and enterprises to make a difference in our Society." },
              { title: "Quality Assurance", desc: "Assimilate new strategies and enterprises to make a difference in our Society." },
              { title: "Quality Assurance", desc: "Assimilate new strategies and enterprises to make a difference in our Society." }
            ].map((item, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
                <p className="text-sm text-zinc-300">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white translate-x-[-50%] h-[60vh]" />

          {/* Right Section */}
          <div className="flex flex-col gap-4 flex-1">
            {[
              { title: "Challenges & Hackathons", desc: "Turn ideas into reality through coordination, innovation, and creative hackathons." },
              { title: "Sponsorship & Marketing", desc: "Establishing relationships with potential partners and Drafting contracts" },
              { title: "Corporate Strategy & Marketing", desc: "Build the Aaruush Brand and direct Marketing along with Publicity." },
              { title: "Public Relations", desc: "Commandeering all channels of Correspondence, Communications, and Content." },
              { title: "Operations & Resource Management", desc: "Maintain and manage resources for smooth operations of the Fest." },
              { title: "Deco & Arts", desc: "Create and conceptualize all the decorations and miniatures with artistic flair for the Fest." },
              { title: "Deco & Arts", desc: "Create and conceptualize all the decorations and miniatures with artistic flair for the Fest." },
              { title: "Deco & Arts", desc: "Create and conceptualize all the decorations and miniatures with artistic flair for the Fest." }
            ].map((item, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold mb-1 text-right">{item.title}</h2>
                <p className="text-sm text-zinc-300 text-right">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 px-8 py-3 text-xl font-bold rounded-full backdrop-blur bg-gradient-to-br from-zinc-900 to-zinc-800 border border-orange-600/30 shadow-lg text-white hover:from-zinc-800 hover:to-zinc-700 hover:shadow-orange-500/20">
          Join a Domain
        </button>
      </div>
    </div>
  );
};

export default Domains;