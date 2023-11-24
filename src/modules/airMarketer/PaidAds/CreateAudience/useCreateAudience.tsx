import { useTheme } from '@mui/material';
import { useState } from 'react';

export default function usePaidAds() {
  const [isCreateAudience, setIsCreateAudience] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<string | null>(null);
  const handleCloseDrawer = () => {
    setIsDrawerOpen(null);
  };
  const theme = useTheme();

  const handleDrawerActions = (value: string) => {
    setIsDrawerOpen(value);
  };
  return {
    isCreateAudience,
    setIsCreateAudience,
    theme,
    handleDrawerActions,
    isDrawerOpen,
    setIsDrawerOpen,
    handleCloseDrawer,
  };
}
