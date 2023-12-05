import { useState } from 'react';
import EngagementAd from './EngagementAd';
import WebsiteGenAd from './WebsiteGenAd';
import SearchAd from './SearchAd';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';

const useCreateAd = () => {
  const theme = useTheme();
  const router = useRouter();
  const [isActiveAd, setIsActiveAd] = useState('engagement-Ad');

  const activeAdComponent = (val: any) => {
    switch (val) {
      case 'engagement-Ad':
        return <EngagementAd />;
      case 'website-Ad':
        return <WebsiteGenAd />;
      case 'generation-Ad':
        return <WebsiteGenAd />;
      case 'search-Ad':
        return <SearchAd />;
    }
  };
  return {
    theme,
    router,
    isActiveAd,
    setIsActiveAd,
    activeAdComponent,
  };
};

export default useCreateAd;
