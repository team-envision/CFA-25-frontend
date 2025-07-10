// src/app/hooks/useLogoNavigation.ts
'use client';

import { useState, useCallback } from 'react';

export const useLogoNavigation = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string>('');

  const navigateToMain = useCallback(() => {
    setTargetUrl('/');
    setIsTransitioning(true);
  }, []);

  const onAnimationStart = useCallback(() => {
    console.log('Logo transition started');
  }, []);

  const resetTransition = useCallback(() => {
    setIsTransitioning(false);
    setTargetUrl('');
  }, []);

  return {
    isTransitioning,
    targetUrl,
    navigateToMain,
    onAnimationStart,
    resetTransition
  };
};
