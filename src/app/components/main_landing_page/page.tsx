'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BackgroundGradientAnimation } from '@/app/components/ui/background-gradient-animation';

export default function MainLandingPage() {
  const router = useRouter();

  return (
    <BackgroundGradientAnimation
  gradientBackgroundStart="#831f00"
  gradientBackgroundEnd="#ef6522"
  firstColor="233,115,24"
  secondColor="250,140,87"
  thirdColor="239,101,34"
  fourthColor="255,240,217"
  fifthColor="131,31,0"
  pointerColor="250,140,87"
  size="180%"
  blendingValue="screen"
  containerClassName="rounded-[3rem] overflow-hidden"
  className="relative flex flex-col min-h-screen justify-between px-4"
>
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center px-8 pt-8">
          <Image
            src="/images/a.png"
            alt="AARUUSH Logo"
            width={180}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <button
            onClick={() => router.push('https://www.aaruush.org')}
            className="px-7 py-2 rounded-full bg-white/15 text-white font-medium backdrop-blur-md shadow-md hover:bg-white/25 transition"
          >
            Visit our Website
          </button>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
          <h2 className="text-5xl md:text-5xl  font-semibold mb-1 text-white">Call For</h2>
          <div className="relative flex items-center justify-center mb-8">
            <h1 className="text-7xl md:text-7xl  font-extrabold text-white tracking-wide">
              AARUUSH
            </h1>
            {/* Megaphone SVG or Image */}
            <div className="absolute w-[65px] h-auto bottom-[35%] left-[75%] md:w-[80px] md:bottom-[38%] md:left-[80%] lg:w-[230px] lg:bottom-[42%] lg:left-[85%]">
              <Image
                src="/images/image.png"
                alt="AARUUSH Graphic Icon"
                width={230}
                height={139}
                className="w-full h-auto"
              />
            </div>
          </div>
          {/* CTA Buttons */}
          <div className="flex gap-6 mt-4 justify-center">
            <button
              onClick={() => router.push('/know-us')}
              className="px-10 py-3 text-lg font-semibold text-white rounded-full bg-white/10 border border-white/20 shadow-inner backdrop-blur-sm hover:bg-white/20 transition"
            >
              Know Us
            </button>
            <button
              onClick={() => router.push('/apply')}
              className="px-10 py-3 text-lg font-semibold text-white rounded-full bg-white/10 border border-white/20 shadow-inner backdrop-blur-sm hover:bg-white/20 transition"
            >
              Apply Now
            </button>
          </div>
        </main>
      </div>
    </BackgroundGradientAnimation>
  );
}
