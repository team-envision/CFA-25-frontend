'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600", "800"] });

export default function MainLandingPage() {
  const router = useRouter();

  return (
    // The main container with rounded corners and overflow hidden
    <div className="relative ml-[3.5vw] mt-[1.5vw] w-[93vw] h-[97vh] overflow-hidden rounded-[45px]">
      
      {/* --- VIDEO BACKGROUND LAYER --- */}
      <video
        // FIX #2: autoPlay is camelCased and 'muted' is added. This is essential for autoplay.
        autoPlay
        loop
        muted
        playsInline // Important for preventing fullscreen on mobile (iOS)
        // FIX #3: z-index is still -10, but the parent's bg-black will be transparent.
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        {/* FIX #1: The src path correctly starts from the root, not /public. */}
        <source src="/HeroBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- FOREGROUND CONTENT LAYER (Unchanged) --- */}
      {/* The background color has been removed from the parent, so the video is visible. */}
      <div className={`relative z-10 flex flex-col min-h-full ${raleway.className}`}>
        {/* Header */}
        <header className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 pt-6 sm:pt-8">
          <div className="flex justify-center sm:justify-start w-full sm:w-auto">
            <Image src="/images/a.png" alt="AARUUSH Logo" width={200} height={50} className="h-8 sm:h-10 lg:h-12 w-auto" priority />
          </div>
          <button onClick={() => router.push('https://www.aaruush.org')} className="hidden sm:inline-flex px-5 mr-[10vw] md:px-7 py-2 md:py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold backdrop-blur-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/25 transition duration-300 ease-in-out text-sm md:text-base">
            Visit our Website
          </button>
        </header>

        {/* Mobile Button */}
        <div className="sm:hidden mt-6 mb-4 w-full max-w-xs mx-auto">
          <button onClick={() => router.push('https://www.aaruush.org')} className="w-full px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-white/10 border border-white/20 backdrop-blur-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/25 transition duration-300 ease-in-out">
            Visit our Website
          </button>
        </div>

        {/* Main Content */}
        <main className={`flex flex-1 flex-col justify-center items-center text-center px-4 ${raleway.className}`}>
          <div className="flex flex-col items-start justify-center mb-6 md:mb-10">
            <h2 className="text-3xl md:text-5xl mb-2 font-semibold tracking-tight text-white">Call For</h2>
            <div className="relative flex items-center right-2 justify-center mb-8">
              <h1 className="text-7xl md:text-7xl font-extrabold tracking-wider text-white">AARUUSH</h1>
              <Image src="/images/image.png" alt="AARUUSH Graphic Icon" width={230} height={139} className="absolute w-[55px] h-auto bottom-[30%] left-[75%] md:w-[80px] md:bottom-[38%] md:left-[80%] lg:w-[175px] lg:h-[175px] lg:bottom-[43%] lg:left-[86%]" />
            </div>
          </div>
          <div className="flex gap-6 -mt-10">
            <button onClick={() => router.push('/know-us')} className="px-8 md:px-12 py-2 md:py-2 text-sm md:text-base font-medium text-white rounded-full bg-white/10 border border-white/20 backdrop-blur-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/25 transition duration-300 ease-in-out">Know Us</button>
            <button onClick={() => router.push('/apply')} className="px-8 md:px-10.5 py-2 md:py-2 text-sm md:text-base font-medium text-white rounded-full bg-white/10 border border-white/20 backdrop-blur-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/25 transition duration-300 ease-in-out">Apply Now</button>
          </div>
        </main>
      </div>
    </div>
  );
}
