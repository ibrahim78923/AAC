import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useAccordionItem = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleAccordionClick = () => {
    setIsActive(!isActive);
  };
  const theme = useTheme();
  return {
    isActive,
    setIsActive,
    handleAccordionClick,
    theme,
  };
};
