import React, { useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const useSocialSettings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 899px)');
  const tabsOrientation = isMobile ? 'horizontal' : 'vertical';
  const tabValue = searchParams?.get('tab');
  const theme = useTheme();

  useEffect(() => {
    //todo: isReady check router fields are updated client-side and ready for use
    if (router?.isReady) {
      router?.push({ query: { tab: 0 } });
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router?.push({ query: { tab: newValue } });
  };
  return { tabsOrientation, tabValue, handleChange, theme };
};

export default useSocialSettings;
