import { useState } from 'react';
import { useTheme } from '@mui/material';

export function useDashboard() {
  const theme = useTheme();
  const [isbarchart, setIsBarChart] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleIconButton = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return {
    setIsDrawerOpen,
    isDrawerOpen,
    theme,
    handleIconButton,
    isbarchart,
    setIsBarChart,
  };
}
