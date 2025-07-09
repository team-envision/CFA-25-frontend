// src/app/hooks/useRecruitmentNavigation.ts
'use client';

import { useState, useCallback } from 'react';

export const useRecruitmentNavigation = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string>('');

  const navigateToRecruitment = useCallback((recruitmentType: 'recruitment' | 'envision_recruitment') => {
    const url = recruitmentType === 'envision_recruitment' 
      ? '/Team_Envision_recruitment' 
      : '/Recruitment';
    
    setTargetUrl(url);
    setIsTransitioning(true);
  }, []);

  const onAnimationStart = useCallback(() => {
    // Optional: Add any side effects when animation starts
    console.log('Recruitment page transition started');
  }, []);

  const resetTransition = useCallback(() => {
    setIsTransitioning(false);
    setTargetUrl('');
  }, []);

  return {
    isTransitioning,
    targetUrl,
    navigateToRecruitment,
    onAnimationStart,
    resetTransition
  };
};
