import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { data, digitalGiftCardColumnsFunction } from './DigitalGiftCards.data';
import { useTheme } from '@mui/material';

export const useDigitalGiftCards = (setShowButtons: any) => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const theme = useTheme();
  useEffect(() => {
    setShowButtons(false);
  }, []);

  const digitalGiftCardColumns = digitalGiftCardColumnsFunction(router);

  return {
    theme,
    router,
    digitalGiftCardColumns,
    data,
    search,
    setSearch,
  };
};
