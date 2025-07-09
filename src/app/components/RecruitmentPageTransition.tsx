// src/app/components/RecruitmentPageTransition.tsx
'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RecruitmentPageTransitionProps {
  targetUrl: string;
  onAnimationStart: () => void;
  isActive: boolean; // ← Added this prop
}

const RecruitmentPageTransition: React.FC<RecruitmentPageTransitionProps> = ({ 
  targetUrl, 
  onAnimationStart,
  isActive // ← Added this prop
}) => {
  const router = useRouter();

  useEffect(() => {
    if (isActive) {
      onAnimationStart();
      
      // Navigate after animation completes
      const timer = setTimeout(() => {
        router.push(targetUrl);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isActive, targetUrl, router, onAnimationStart]);

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Overlay Animation */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              transformOrigin: "bottom"
            }}
            className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 z-[9999]"
          />
          
          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="fixed inset-0 flex items-center justify-center z-[10000]"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-white text-xl font-semibold"
              >
                Loading Recruitment Form...
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RecruitmentPageTransition;
