"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import NextImage from "next/image";

interface SimpleAssetPreloaderProps {
  onComplete: () => void;
  preloaderImageSrc: string;
  alt?: string;
}

// ✅ FIXED: Move static arrays outside component to avoid dependency issues
const STATIC_IMAGE_URLS = [
  '/images/Committees.png',
  '/images/Domains.png'
];

const STATIC_VIDEO_URLS = [
  '/HeroBG.mp4'
];

const SimpleAssetPreloader = ({ 
  onComplete,
  preloaderImageSrc,
  alt = "Loading..."
}: SimpleAssetPreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const totalAssets = STATIC_IMAGE_URLS.length + STATIC_VIDEO_URLS.length;

  const preloadImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      
      const handleLoad = () => {
        // console.log(`✅ Loaded image: ${url}`);
        setLoadedCount(prev => prev + 1);
        resolve();
      };
      
      const handleError = () => {
        console.warn(`⚠️ Failed to load image: ${url}`);
        setLoadedCount(prev => prev + 1);
        resolve();
      };
      
      img.onload = handleLoad;
      img.onerror = handleError;
      img.src = url;
    });
  }, []);

  const preloadVideo = useCallback((url: string): Promise<void> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      
      const handleLoad = () => {
        console.log(`✅ Loaded video: ${url}`);
        setLoadedCount(prev => prev + 1);
        resolve();
      };
      
      const handleError = () => {
        console.warn(`⚠️ Failed to load video: ${url}`);
        setLoadedCount(prev => prev + 1);
        resolve();
      };
      
      video.oncanplaythrough = handleLoad;
      video.onerror = handleError;
      video.preload = 'metadata';
      video.src = url;
      video.load();
    });
  }, []);

  // ✅ FIXED: No dependency issues since arrays are outside component
  useEffect(() => {
    const loadAssets = async () => {
      console.log("🚀 Starting asset preloading...");
      setLoadedCount(0);
      
      try {
        const allPromises = [
          ...STATIC_IMAGE_URLS.map(url => preloadImage(url)),
          ...STATIC_VIDEO_URLS.map(url => preloadVideo(url))
        ];
        
        await Promise.all(allPromises);
        console.log("✅ All assets loaded successfully!");
        setAllAssetsLoaded(true);
        
      } catch (error) {
        console.error('❌ Error preloading assets:', error);
        setAllAssetsLoaded(true);
      }
    };

    loadAssets();
  }, [preloadImage, preloadVideo]); // ✅ Only callback dependencies needed

  // Rest of your component remains the same...
  useEffect(() => {
    if (allAssetsLoaded && loadedCount >= totalAssets) {
      console.log(`🎯 All ${totalAssets} assets loaded, preparing website...`);
      
      const timer = setTimeout(() => {
        console.log("🎉 Preloader complete - showing website");
        setIsLoading(false);
        onComplete();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [allAssetsLoaded, loadedCount, totalAssets, onComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut"
          }}
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
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <NextImage
              src={preloaderImageSrc}
              alt={alt}
              width={300}
              height={300}
              className="max-w-[70vw] max-h-[70vh] object-contain"
            />
          </motion.div>
          
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="text-white text-sm opacity-60">
              {/* {loadedCount} / {totalAssets} assets loaded */}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SimpleAssetPreloader;
