// src/app/components/LenisWrapper.tsx
'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useState } from 'react';

interface LenisWrapperProps {
  children: ReactNode;
}

const LenisWrapper: React.FC<LenisWrapperProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ReactLenis 
      root
      options={{
        syncTouch: isMobile,
        syncTouchLerp: isMobile ? 0.08 : undefined,  // ← MATCHED to HomePage
        touchInertiaMultiplier: isMobile ? 20 : undefined,  // ← MATCHED to HomePage
        touchMultiplier: isMobile ? 0.9 : undefined,  // ← MATCHED to HomePage
        gestureOrientation: isMobile ? 'vertical' : undefined,
        infinite: false,
        smoothWheel: !isMobile,
        
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisWrapper;
