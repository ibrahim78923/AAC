import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useMeetingAndGreetingList = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return {
    theme,
    search,
    setSearch,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
