import { useTheme } from '@mui/material';
import { useState } from 'react';

export const usePowerDialerList = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [buttonName, setButtonName] = useState('IN progress');
  const [powerDialerModal, setPowerDialerModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Add any additional logic or state management here

  return {
    theme,
    search,
    setSearch,
    buttonName,
    setButtonName,
    powerDialerModal,
    setPowerDialerModal,
    isDrawerOpen,
    setIsDrawerOpen,
    // Add any additional values or functions you want to expose
  };
};
