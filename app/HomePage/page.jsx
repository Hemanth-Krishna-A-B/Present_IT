"use client";

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AuthenticationPage_S from '../components/Small_screen/Authentication_S';
import AuthenticationPage_L from '../components/Large_screen/Authentication_L';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

    
  const isMobile = useMediaQuery({ maxWidth: 767 });
  if (!mounted) return null;


  return isMobile ? <AuthenticationPage_S /> : <AuthenticationPage_L />;
}
