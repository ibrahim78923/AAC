import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useServiceWorkflow = () => {
  const theme = useTheme();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<any>(null);

  const handleItemClick = (id: any) => {
    setActiveItem(id);
  };
  return {
    theme,
    router,
    activeItem,
    handleItemClick,
  };
};
