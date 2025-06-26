// src/app/components/CardWrapper.tsx
'use client';

import { useTransform, motion, MotionValue } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface CardWrapperProps {
  i: number;
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  i,
  children,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef<HTMLDivElement>(null);

  // This transform scales the card down as you scroll, creating the stack effect.
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    // This div is sticky and takes up the full screen height.
    // Its height contributes to the parent's total scrollable height.
    <div ref={container} className='h-screen sticky top-0'>
      <motion.div
        style={{ scale }}
        // Key Changes:
        // - `h-screen` and `w-full`: Makes the animated container fill the entire viewport.
        // - `origin-top`: Ensures the scaling animation originates from the top edge.
        // - We've removed all padding, background colors, and border-radius from the wrapper.
        className='relative h-screen w-full origin-top'
      >
        {/* Your full-page component is rendered here, and it can now fill the space correctly. */}
        {children}
      </motion.div>
    </div>
  );
};

export default CardWrapper;
