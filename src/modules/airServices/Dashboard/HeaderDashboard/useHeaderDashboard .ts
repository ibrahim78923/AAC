import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

export function useHeaderDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return {
    theme,
    router,
    isDrawerOpen,
    setIsDrawerOpen,
  };
}
