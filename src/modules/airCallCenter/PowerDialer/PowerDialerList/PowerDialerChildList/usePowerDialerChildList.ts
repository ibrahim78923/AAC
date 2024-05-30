import { useTheme } from '@mui/material';
import { useState } from 'react';

export const usePowerDialerChildList = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [buttonName, setButtonName] = useState('IN progress');
  const [selectedData, setSelectedData] = useState([]);
  const [powerDialerModal, setPowerDialerModal] = useState(false);
  const [startPowerDialerModal, setStartPowerDialerModal] = useState(false);
  // Add your custom logic here

  return {
    theme,
    search,
    setSearch,
    buttonName,
    setButtonName,
    selectedData,
    setSelectedData,
    powerDialerModal,
    setPowerDialerModal,
    startPowerDialerModal,
    setStartPowerDialerModal,
  };
};
