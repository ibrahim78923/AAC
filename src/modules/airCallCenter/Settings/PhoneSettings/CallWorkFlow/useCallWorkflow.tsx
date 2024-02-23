import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';

const useCallWorkflow = () => {
  const navigate = useRouter();
  //states
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState(null);

  //functions

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  return {
    theme,
    navigate,
    handleClose,
    handleClick,
    selectedValue,
  };
};

export default useCallWorkflow;
