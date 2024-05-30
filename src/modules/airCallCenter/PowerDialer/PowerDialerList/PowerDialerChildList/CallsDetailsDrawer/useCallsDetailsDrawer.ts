import { useTheme } from '@mui/material';
import React, { useState } from 'react';

export const useCallsDetailsDrawer = () => {
  const theme = useTheme();
  const [isCallDetailsDrawerOpen, setIsCallDetailsDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getCallDetailsText = () => {
    if (value === 0) {
      return 'Call Details for John';
    } else if (value === 1 || value === 2) {
      return 'Call details for Andrew Loon';
    } else {
      return 'Call details +18506128791';
    }
  };

  return {
    theme,
    isCallDetailsDrawerOpen,
    setIsCallDetailsDrawerOpen,
    value,
    handleChange,
    getCallDetailsText,
  };
};
