'use client';

import MainLandingPage from '@/app/components/main_landing_page/MainLandingPage';

export default function Page() {
  const scrollDown100vh = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return <MainLandingPage scrollDown100vh={scrollDown100vh} />;
}
