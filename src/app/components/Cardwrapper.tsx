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
    <div 
      ref={container} 
      className='sticky top-0'
      style={{
        height: 'auto', // Changed from h-screen to auto height
        maxHeight: '100vh', // Prevent exceeding viewport
        overflow: 'hidden', // Prevent content overflow
      }}
    >
      <motion.div 
        key={customKey}
        variants={animationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        onAnimationComplete={onAnimationComplete}
        className='relative w-full will-change-transform'
        style={{ 
          touchAction: 'auto',
          height: 'fit-content', // Let content determine height
        }}
        drag={false}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CardWrapper;
