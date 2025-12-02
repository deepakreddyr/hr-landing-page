// hooks/useIsMobile.ts or utility file

import { useState, useEffect } from 'react';

const mobileBreakpoint = 768; // Adjust this value as needed

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check the screen width
    const checkIsMobile = () => {
      // We check if window is defined to avoid errors during server-side rendering (SSR)
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < mobileBreakpoint);
      }
    };

    // Set initial state
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
};