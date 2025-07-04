// components/Footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";


const Footer = () => {
  return (
<div className="footer bottom-0 w-full min-h-[25vh] bg-[#00000000] z-10 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-[5vw] pt-4 lg:pt-[2vw] pb-4 box-border overflow-hidden">
      {/* Left Section */}
      <div className="left flex flex-col w-full lg:max-w-[33.3%] mb-6 lg:mb-0 items-center lg:-ml-16 lg:mr-10">




        <Image 
          src="/images/a.png" 
          alt="Logo A" 
          width={250} 
          height={150} 
          className="w-[70vw] sm:w-[45vw] lg:w-[23vw] max-w-[300px] lg:max-w-none h-auto object-contain"

        />
 <div className="logos flex justify-center items-center gap-7 w-full max-w-[250px] mt-1.5 mx-auto">
  <Link href="https://www.aaruush.org/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/aaruush.png" alt="Aaruush" width={28.43} height={15.99} className="object-contain" />
  </Link>
  <Link href="https://www.facebook.com/aaruush.srm" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/Vector.png" alt="K" width={16.01} height={16.01} className="object-contain" />
  </Link>
  <Link href="https://x.com/aaruushsrmist" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/Vector (1).png" alt="LinkedIn" width={14.53} height={14.53} className="object-contain" />
  </Link>
  <Link href="https://www.linkedin.com/company/aaruush-srm-ist/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/Vector (2).png" alt="X" width={16.01} height={16.01} className="object-contain" />
  </Link>
  <Link href="https://www.instagram.com/aaruush_srm/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/image 31.png" alt="Instagram" width={16.01} height={16.01} className="object-contain" />
  </Link>
</div>


</div>
      {/* Middle Section */}
      <div className="middle text-white p-2 flex flex-col justify-center w-full lg:flex-1 mb-6 lg:mb-0 text-center lg:text-left lg:-ml-6">


      <h2 className="text-base sm:text-xl font-bold mb-2 lg:-mt-5">Contact Us</h2>

        <div className="bubbles flex flex-col gap-2 font-Raleway">
          <div className="row1 flex flex-col sm:flex-row lg:flex-col xl:flex-row flex-wrap gap-2 justify-center lg:justify-start">
            <p className="border border-gray-600 rounded-full px-3 py-1 w-[90%] sm:w-fit text-sm sm:text-base mx-auto sm:mx-0 text-center sm:text-left">
              Email: csi@aaruush.org
            </p>
            <p className="border border-gray-600 rounded-full px-3 py-1 w-[90%] sm:w-fit text-sm sm:text-base mx-auto sm:mx-0 text-center sm:text-left">
              Avni Rajawat: +91 7389342169
            </p>
          </div>
          <div className="row2 flex flex-col sm:flex-row flex-wrap gap-2 justify-center lg:justify-start">
            <p className="border border-gray-600 rounded-full px-3 py-1 w-[90%] sm:w-fit text-sm sm:text-base mx-auto sm:mx-0 text-center sm:text-left">
              Balkar Singh Sekhon: +91 9908284055
            </p>
            <p className="border border-gray-600 rounded-full px-3 py-1 w-[90%] sm:w-fit text-sm sm:text-base mx-auto sm:mx-0 text-center sm:text-left">
              Ishan Chadha: +91 8580826594
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right flex flex-col w-full lg:w-auto items-center lg:items-end flex-shrink-0 lg:justify-self-end lg:translate-x-6 mb-6 lg:mb-0">


        <Image 
          src="/images/b.png" 
          alt="Logo B" 
          width={300} 
          height={150} 
          className="w-[55vw] sm:w-[35vw] lg:w-[19vw] max-w-[200px] lg:max-w-none h-auto object-contain"

        />
             
             <div className="logos flex justify-center items-center gap-7 w-full max-w-[250px] mt-1.5 mx-auto">
  <Link href="https://envision.aaruush.org/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/Mask group.png" alt="Facebook" width={17.68} height={32} />
  </Link>
  <Link href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/Vector.png" alt="K" width={16.01} height={16.01} className="object-contain" />
  </Link>
  <Link href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/Vector (1).png" alt="LinkedIn" width={14.53} height={14.53} className="object-contain" />
  </Link>
  <Link href="linkedin.com/company/team-envision/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/Vector (2).png" alt="X" width={16.01} height={16.01} className="object-contain" />
  </Link>
  <Link href="https://www.instagram.com/teamenvision_srm?igsh=enN2azU2dGdqaWU3" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src="/images/image 31.png" alt="Instagram" width={16.01} height={16.01} className="object-contain" />
  </Link>
</div>


      </div>
    </div>
  );
};

export default Footer;