// src/app/components/Cardwrapper.tsx
'use client';

import { motion } from 'motion/react';
import { useRef, ReactNode } from 'react';

// The props are now much simpler.
interface CardWrapperProps {
  children: ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  const container = useRef<HTMLDivElement>(null);

  // The CardWrapper is now just a sticky container.
  // The stacking effect happens naturally as you scroll.
  // There are no transforms or scaling animations.
  return (
    <div ref={container} className='h-screen sticky top-0'>
      <motion.div className='relative h-full w-full'>
        {children}
      </motion.div>
    </div>
  );
};

export default CardWrapper;
