import { useState } from 'react';
import { useTheme } from '@mui/material';

export function useAddAnnouncement() {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleIconButton = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return {
    setIsDrawerOpen,
    isDrawerOpen,
    theme,
    handleIconButton,
  };
}
