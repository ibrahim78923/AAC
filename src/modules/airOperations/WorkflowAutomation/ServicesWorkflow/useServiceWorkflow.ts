import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useServiceWorkflow = () => {
  const theme = useTheme();
  const router = useRouter();
  const backClick =
    router?.query?.type === 'Supervisor Rules'
      ? 3
      : router?.query?.type === 'Scheduled Workflows'
        ? 2
        : 1;
  const [activeItem, setActiveItem] = useState<any>(backClick);

  const handleItemClick = (id: any, title: any) => {
    setActiveItem(id);
    router?.push({
      query: { type: title },
      pathname: router?.pathname,
    });
  };

  return {
    theme,
    router,
    activeItem,
    handleItemClick,
  };
};
