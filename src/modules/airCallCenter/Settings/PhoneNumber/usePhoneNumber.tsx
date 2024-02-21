import { useTheme } from '@mui/material';
import { useState } from 'react';

const usePhoneNumber = () => {
  const theme = useTheme();
  const [isBuyNewNumber, setIsBuyNewNumber] = useState(false);
  return {
    theme,
    isBuyNewNumber,
    setIsBuyNewNumber,
  };
};

export default usePhoneNumber;
