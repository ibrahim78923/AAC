import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';

const useComments = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  return {
    setSelectedValue,
    selectedValue,
    handleClose,
    handleClick,
    navigate,
    theme,
  };
};

export default useComments;
