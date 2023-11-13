import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useComparePost = () => {
  const theme = useTheme();
  const [isSelectPostModal, setIsSelectPostModal] = useState(false);
  const [isOverView, setIsOverview] = useState(false);
  const [searchBy, setSearchBy] = useState('');
  const [fisrtPost, setFirstPost] = useState<any>({});
  const [secondPost, setSecondPost] = useState<any>({});

  return {
    theme,
    searchBy,
    setSearchBy,
    isOverView,
    setIsOverview,
    isSelectPostModal,
    setIsSelectPostModal,
    fisrtPost,
    secondPost,
    setFirstPost,
    setSecondPost,
  };
};
