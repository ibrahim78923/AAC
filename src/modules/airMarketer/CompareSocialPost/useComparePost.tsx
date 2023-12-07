import { useState } from 'react';
import { useTheme } from '@mui/material';
import Facebook from '@/assets/icons/modules/airMarketer/SocialMarketing/PostBox/facebook';
import Instagram from '@/assets/icons/modules/airMarketer/SocialMarketing/PostBox/instagram';

export const useComparePost = () => {
  const theme = useTheme();
  const [isSelectPostModal, setIsSelectPostModal] = useState(false);
  const [isOverView, setIsOverview] = useState(false);
  const [searchBy, setSearchBy] = useState('');
  const [firstPost, setFirstPost] = useState<any>({});
  const [secondPost, setSecondPost] = useState<any>({});

  const socialCatgory: any = {
    facebook: <Facebook />,
    instagram: <Instagram />,
  };

  return {
    theme,
    searchBy,
    setSearchBy,
    isOverView,
    setIsOverview,
    isSelectPostModal,
    setIsSelectPostModal,
    firstPost,
    secondPost,
    setFirstPost,
    setSecondPost,
    socialCatgory,
  };
};
