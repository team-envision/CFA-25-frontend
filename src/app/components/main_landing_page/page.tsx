import React from "react";

const Home = () => {
  return (
    <div className="relative h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      
      <div className="relative h-screen w-screen flex flex-col bg-[radial-gradient(120%_100%_at_80%_20%,#ff7b2d_0%,#e35213_40%,#e5320f_80%,#2c2420_100%)] text-white overflow-hidden">
        {/* Remove padding and max-width, full screen */}
        
        <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(255,90,40,0.3)_0%,_rgba(255,90,40,0)_65%)] rounded-full -translate-x-1/2 -translate-y-1/2 animate-spin-slow blur-md z-0" />

        <header className="relative z-10 flex justify-between items-center px-8 sm:px-12">
          <img
            src="/images/a.png"
            alt="AARUUSH Logo"
            className="w-[400px] max-w-[150px] sm:max-w-[400px]"
          />
          <button className="px-8 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-medium backdrop-blur-md shadow-md">
            Visit our Website
          </button>
        </header>

        <main className="flex-grow flex items-center justify-center relative z-10 px-8 sm:px-12">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Call For</h2>
            <div className="relative inline-block">
              <h1 className="text-[3.2rem] sm:text-[5rem] font-extrabold tracking-wide">
                AARUUSH
              </h1>
              <img
                src="/images/image.png"
                alt="AARUUSH Graphic Icon"
                className="absolute w-[65px] sm:w-[230px] bottom-[35%] sm:bottom-[42%] left-[75%] sm:left-[85%]"
              />
            </div>
          </div>
        </main>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 relative z-10 px-8 sm:px-12 pb-8">
          <button className="px-8 sm:px-11 py-3 text-lg font-semibold text-white bg-white/15 hover:bg-white/25 rounded-full shadow-md backdrop-blur-md w-4/5 sm:w-auto">
            Know Us
          </button>
          <button className="px-8 sm:px-11 py-3 text-lg font-semibold text-white bg-white/15 hover:bg-white/25 rounded-full shadow-md backdrop-blur-md w-4/5 sm:w-auto">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
