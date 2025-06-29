'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BackgroundGradientAnimation } from '@/app/components/ui/background-gradient-animation';
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600", "800"] });

export default function MainLandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[radial-gradient(120%_100%_at_85%_85%,_#fff0d9_0%,_#fa8c57_20%,_#ef6522_40%,_#e97318_60%,_#831f00_85%,_#6A1B09_100%)]">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgba(106,27,9,0.3)"
        gradientBackgroundEnd="rgba(255,106,0,0.4)"
        firstColor="233,115,24"
        secondColor="250,140,87"
        thirdColor="239,101,34"
        fourthColor="255,240,217"
        fifthColor="131,31,0"
        pointerColor="250,140,87"
        size="200%"
        blendingValue="screen"
        containerClassName="overflow-hidden"
        className="relative flex flex-col min-h-screen justify-between px-2 sm:px-4"
      >
        <div className={`relative z-10 flex flex-col min-h-screen ${raleway.className}`}>
          {/* Header - Responsive Layout */}
          {/* Header (logo + desktop button) */}
{/* Header - Logo + Desktop Website Button */}
<header className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 pt-6 sm:pt-8">
  {/* Logo */}
  <div className="flex justify-center sm:justify-start w-full sm:w-auto">
    <Image
      src="/images/a.png"
      alt="AARUUSH Logo"
      width={200}
      height={50}
      className="h-8 sm:h-10 lg:h-12 w-auto"
      priority
    />
  </div>

  {/* Desktop Website Button (hidden on mobile) */}
<button
  onClick={() => router.push('https://www.aaruush.org')}
  className="hidden sm:inline-flex px-5 md:px-7 py-2 md:py-3 rounded-full bg-white/20 text-white font-semibold backdrop-blur-md shadow-lg hover:bg-white/30 transition text-sm md:text-base"
>
  Visit our Website
</button>
</header>

{/* Visit Website Button - Mobile only, immediately below AARUUSH text */}
<div className="sm:hidden mt-6 mb-4 w-full max-w-xs mx-auto">
  <button
    onClick={() => router.push('https://www.aaruush.org')}
    className="w-full px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-white/15 border border-white/15 backdrop-blur-md shadow-md hover:bg-white/25 transition"
  >
    Visit our Website
  </button>
</div>


          {/* Main Content - Centered and Responsive */}
                 {/* Main Content */}
         <main className={`flex flex-1 flex-col justify-center items-center text-center px-4 ${raleway.className}`}>
         
         <div className="flex flex-col items-start justify-center mb-6 md:mb-10">
         
                     <h2 className="text-3xl md:text-5xl  mb-2   font-semibold tracking-tight text-white">Call For</h2>
                     <div className="relative flex items-center right-2 justify-center mb-8">
                       <h1 className="text-7xl md:text-7xl  font-extrabold tracking-wider text-white tracking-wide">
                         AARUUSH
                     </h1>
                     {/* Megaphone SVG or Image */}
                     <div className="absolute w-[55px] h-auto bottom-[35%] left-[75%] md:w-[80px] md:bottom-[38%] md:left-[80%] lg:w-[175px] lg:h-[175px] lg:bottom-[42%] lg:left-[86%]">
                       <Image
                         src="/images/image.png"
                         alt="AARUUSH Graphic Icon"
                         width={230}
                         height={139}
                         className="w-full h-auto"
                       />
                     </div>
                   </div>
                   </div>
                   {/* CTA Buttons */}
                   <div className="flex gap-6 -mt-10 ">
                     <button
                       onClick={() => router.push('/know-us')}
                       className="px-8 md:px-12 py-2 md:py-2 text-sm text-center md:text-base font-medium text-white rounded-[3rem] bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition"
         
                     >
                       Know Us
                     </button>
                     <button
                       onClick={() => router.push('/apply')}
                       className="px-8 md:px-10.5 py-2 md:py-2 text-sm md:text-base text-center font-medium text-white rounded-[3rem] bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition"
         
                     >
                       Apply Now
                     </button>
                   </div>
                 </main>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
}
