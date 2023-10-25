import { useState } from 'react';

import { useTheme } from '@mui/material';

import { ListAccordionDealsData } from './DealsAccordion.data';

export const useDealsAccordion = () => {
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
    ListAccordionDealsData,
  };
};
