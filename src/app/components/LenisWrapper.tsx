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
        syncTouchLerp: isMobile ? 0.075 : undefined,
        touchInertiaMultiplier: isMobile ? 35 : undefined,
        touchMultiplier: isMobile ? 0.75 : undefined,
        gestureOrientation: isMobile ? 'vertical' : undefined,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisWrapper;
