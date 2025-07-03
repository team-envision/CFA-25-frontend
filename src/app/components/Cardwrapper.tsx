// src/app/components/Cardwrapper.tsx
'use client';

import { motion, Variants, Transition } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface CardWrapperProps {
  children: ReactNode;
  customKey: string;
  animationVariants: Variants;
  // --- ADD THESE NEW PROPS ---
  transition: Transition;
  onAnimationComplete?: () => void;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ 
  children, 
  customKey, 
  animationVariants, 
  transition, // <-- New prop
  onAnimationComplete // <-- New prop
}) => {
  const container = useRef<HTMLDivElement>(null);

  return (
    // The outer div remains a simple sticky container
    <div ref={container} className='h-screen sticky top-0'>
      <motion.div 
        key={customKey}
        variants={animationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        // --- USE THE DYNAMIC PROPS HERE ---
        transition={transition}
        onAnimationComplete={onAnimationComplete}
        className='relative h-full w-full'
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CardWrapper;
