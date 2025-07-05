'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600", "800"] });

interface MainLandingPageProps {
  scrollDown100vh: () => void;
}

export default function MainLandingPage({ scrollDown100vh }: MainLandingPageProps) {
  const router = useRouter();

  return (
<div className="relative ml-[3.5vw] mt-[6vh] sm:mt-[3.5vw] w-[93vw] h-[92vh] overflow-hidden rounded-[45px]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/HeroBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={`relative z-10 flex flex-col h-full ${raleway.className}`}>
        {/* Header */}
        <header className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 pt-6 sm:pt-8">
          <div className="flex justify-center sm:justify-start w-full sm:w-auto">
            <Image src="/images/a.png" alt="AARUUSH Logo" width={200} height={50} className="h-8 sm:h-10 lg:h-12 w-auto" priority />
          </div>
          <button
            onClick={() => router.push('https://www.aaruush.org')}
            className="hidden sm:inline-flex px-5 mr-[4vw] md:px-7 py-2 md:py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold backdrop-blur-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/25 transition duration-300 ease-in-out text-sm md:text-base"
          >
            Visit our Website
          </button>
        </header>

        {/* Mobile Header Button */}
        <div className="sm:hidden mt-6 mb-4 w-full max-w-xs mx-auto">
          <button
            onClick={() => router.push('https://www.aaruush.org')}
            className="w-full px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-white/10 border border-white/20 backdrop-blur-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/25 transition duration-300 ease-in-out"
          >
            Visit our Website
          </button>
        </div>

        {/* Main */}
        <main className={`flex-grow flex items-center justify-center text-center px-4 ${raleway.className}`}>
          <div className="flex flex-col items-center gap-2 w-full max-w-[577px] mb-20">
            <Image
              src="/images/cfa.png"
              alt="AARUUSH Logo"
              width={577}
              height={200}
              className="w-full h-auto ml-[4.5vw]"
              priority
            />

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-2 mr-[4.5vw]">
              <button
                onClick={scrollDown100vh}
                className="px-6 sm:px-8 md:px-12 py-2 text-sm md:text-base font-medium text-white rounded-full bg-white/10 border border-white/20 backdrop-blur-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/25 transition duration-300 ease-in-out"
              >
                Know Us
              </button>
              <button
                onClick={() => router.push('/Recruitment')}
                className="px-6 sm:px-8 md:px-10.5 py-2 text-sm md:text-base font-medium text-white rounded-full bg-white/10 border border-white/20 backdrop-blur-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/25 transition duration-300 ease-in-out"
              >
                Apply Now
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
