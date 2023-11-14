import { useState } from 'react';
import { useTheme } from '@mui/material';

export function useDashboard() {
  const theme = useTheme();
  const [isbarchart, setIsBarChart] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleIconButtonClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return {
    setIsDrawerOpen,
    isDrawerOpen,
    theme,
    handleIconButtonClick,
    isbarchart,
    setIsBarChart,
  };
}
