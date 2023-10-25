import { useState } from 'react';

import { useTheme } from '@mui/material';

import { ListAccordionDashboardData } from './DashboardAccordion.data';

export const useListAccordion = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const theme = useTheme();

  return {
    theme,
    expanded,
    setExpanded,
    handleChange,
    ListAccordionDashboardData,
  };
};
