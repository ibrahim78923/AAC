import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { serviceWorkflowsCardData } from './ServicesWorkflow.data';

export const useServiceWorkflow = () => {
  const theme = useTheme();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<any>(null);

  const handleItemClick = (id: any) => {
    setActiveItem(id);
  };
  useEffect(() => {
    if (activeItem === null && serviceWorkflowsCardData.length > 0) {
      handleItemClick(serviceWorkflowsCardData[0].id);
    }
  }, [activeItem, handleItemClick]);
  return {
    theme,
    router,
    activeItem,
    handleItemClick,
  };
};
