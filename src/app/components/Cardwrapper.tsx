// src/app/components/Cardwrapper.tsx
'use client';

import { motion, Variants, Transition } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface CardWrapperProps {
  children: ReactNode;
  customKey: string;
  animationVariants: Variants;
  transition: Transition;
  onAnimationComplete?: () => void;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ 
  children, 
  customKey, 
  animationVariants, 
  transition,
  onAnimationComplete
}) => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div ref={container} className='h-screen sticky top-0'>
      <motion.div 
        key={customKey}
        variants={animationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        onAnimationComplete={onAnimationComplete}
        // OPTIMIZED: Added will-change-transform and touch optimizations
        className='relative h-full w-full will-change-transform'
        style={{ touchAction: 'auto' }}
        drag={false}
        
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CardWrapper;
