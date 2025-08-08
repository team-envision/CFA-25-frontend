"use client";

import Image from "next/image";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600", "800"] });

interface MainLandingPageProps {
  scrollDown100vh: () => void;
  navigateToRecruitment: (
    recruitmentType: "recruitment" | "envision_recruitment"
  ) => void;
  scrollToTop: () => void; // ← Added this prop
}

export default function MainLandingPage({
  scrollDown100vh,
  navigateToRecruitment,
  scrollToTop, // ← Added this prop
}: MainLandingPageProps) {

  return (
    <div className="relative  w-full h-[100vh] overflow-hidden ">
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

      <div
        className={`relative z-10 flex flex-col   h-full ${raleway.className}`}
      >
        {/* Combined Responsive Header */}
        {/* Logo - Now clickable */}
        <div className="absolute top-5 left-3 sm:top-6 sm:left-4 z-10">
          <button onClick={scrollToTop} className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/a.png"
              alt="AARUUSH Logo"
              width={200}
              height={64}
              className="w-[170px] sm:w-[220px] h-auto cursor-pointer hover:opacity-80 transition-opacity"

            />
          </button>
        </div>
        {/* Button with proper glass effect matching target design */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-auto max-w-[60vw] sm:max-w-none">
          <div className="px-0 sm:px-4 py-[2px] rounded-full bg-transparent backdrop-blur-md">
            <button

              className={`
        rounded-full px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3.5 lg:py-3
        bg-transparent backdrop-blur-md text-white
        border border-white/20
        hover:bg-black/20 hover:border-white/30
        transition-all duration-300 ease-in-out
        text-[10px] sm:text-sm md:text-base font-semibold whitespace-nowrap
        shadow-lg shadow-black/20
      `}
              onClick={() => window.open("https://aaruush.org", "_blank")}
            >
              Visit our Website
            </button>
          </div>
        </div>



        {/* Main */}
        <main
          className={`flex-grow flex items-center justify-center text-center px-4 ${raleway.className}`}
        >
          <div className="flex flex-col items-center gap-2 w-full max-w-[530px] mb-20">
            <Image
              src="/images/cfapng.png"
              alt="AARUUSH Logo"
              width={577}
              height={200}
              className="w-full h-auto ml-[4.5vw]"
              priority
            />

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-2 mr-[4.5vw]">
              <button
                onClick={scrollDown100vh}
                className="
                  px-6 sm:px-8 md:px-12 py-2 text-sm md:text-base font-medium text-white rounded-full
                  bg-transparent backdrop-blur-md
                  border border-white/20
                  hover:bg-black/20 hover:border-white/30
                  transition-all duration-300 ease-in-out
                  shadow-lg shadow-black/20
                "
              >
                Know Us
              </button>
              <button
                onClick={() => navigateToRecruitment("recruitment")}
                className="
                  px-6 sm:px-8 md:px-10.5 py-2 text-sm md:text-base font-medium text-white rounded-full
                  bg-transparent backdrop-blur-md
                  border border-white/20
                  hover:bg-black/20 hover:border-white/30
                  transition-all duration-300 ease-in-out
                  shadow-lg shadow-black/20
                "
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
