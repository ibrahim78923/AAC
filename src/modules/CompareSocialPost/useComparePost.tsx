import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useComparePost = () => {
  const theme = useTheme();
  const [isSelectPostModal, setIsSelectPostModal] = useState(false);
  const [isOverView, setIsOverview] = useState(false);
  const [searchBy, setSearchBy] = useState('');

  return {
    theme,
    searchBy,
    setSearchBy,
    isOverView,
    setIsOverview,
    isSelectPostModal,
    setIsSelectPostModal,
  };
};
