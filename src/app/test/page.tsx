// src/app/test/page.tsx
'use client';
import { Player } from '@lottiefiles/react-lottie-player';

export default function LottieTestPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h1 style={{ color: 'white', textAlign: 'center' }}>Lottie Test Page</h1>
        <Player
          src="/HeroBG.lottie"
          loop
          autoplay
          style={{ width: '500px', height: '500px', border: '2px solid red' }}
        />
      </div>
    </div>
  );
}
