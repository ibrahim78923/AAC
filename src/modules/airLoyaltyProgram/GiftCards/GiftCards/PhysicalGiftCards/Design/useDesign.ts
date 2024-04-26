import { useState } from 'react';
import { designColumnsDynamic } from './Design.data';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

export const useDesign: any = () => {
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const router = useRouter();
  const designColumns = designColumnsDynamic(router);
  return {
    designColumns,
    setSearch,
    search,
    theme,
    router,
  };
};
