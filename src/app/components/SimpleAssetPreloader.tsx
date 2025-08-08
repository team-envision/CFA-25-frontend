"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, ReactNode } from "react";
import NextImage from "next/image";

interface SimpleAssetPreloaderProps {
  onComplete?: () => void;
  preloaderImageSrc: string;
  alt?: string;
  children: ReactNode; // ✅ Main page content
}

const SimpleAssetPreloader = ({ 
  onComplete,
  preloaderImageSrc,
  alt = "Loading...",
  children
}: SimpleAssetPreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const imageUrls = [
    '/images/Committees.png',
    '/images/Domains.png'
  ];

  const videoUrls = [
    '/HeroBG.mp4'
  ];

  const totalAssets = imageUrls.length + videoUrls.length;

  const preloadImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        setLoadedCount(prev => prev + 1);
        resolve();
      };
      img.onerror = () => {
        setLoadedCount(prev => prev + 1);
        resolve();
      };
      img.src = url;
    });
  }, []);

  const preloadVideo = useCallback((url: string): Promise<void> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.oncanplaythrough = () => {
        setLoadedCount(prev => prev + 1);
        resolve();
      };
      video.onerror = () => {
        setLoadedCount(prev => prev + 1);
        resolve();
      };
      video.preload = 'metadata';
      video.src = url;
      video.load();
    });
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      setLoadedCount(0);
      try {
        await Promise.all([
          ...imageUrls.map(preloadImage),
          ...videoUrls.map(preloadVideo)
        ]);
        setAllAssetsLoaded(true);
      } catch {
        setAllAssetsLoaded(true);
      }
    };
    loadAssets();
  }, [preloadImage, preloadVideo]);

  useEffect(() => {
    if (allAssetsLoaded && loadedCount >= totalAssets) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, 300); // minimal delay
      return () => clearTimeout(timer);
    }
  }, [allAssetsLoaded, loadedCount, totalAssets, onComplete]);

  return (
    <>
      {/* Main page content is ALWAYS rendered */}
      {children}

      {/* Preloader overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <NextImage
                src={preloaderImageSrc}
                alt={alt}
                width={300}
                height={300}
                className="max-w-[70vw] max-h-[70vh] object-contain"
                priority
              />

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <NextImage
                  src={preloaderImageSrc}
                  alt={alt}
                  width={300}
                  height={300}
                  className="max-w-[70vw] max-h-[70vh] object-contain"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SimpleAssetPreloader;
