import { useState } from 'react';

import { useTheme } from '@mui/material';

import { ListAccordionDealsData } from './DealsAccordion.data';

export const useDealsAccordion = () => {
  const [isExpanded, setIsExpanded] = useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setIsExpanded(newExpanded ? panel : false);
    };

  const theme = useTheme();

  return {
    theme,
    isExpanded,
    setIsExpanded,
    handleChange,
    ListAccordionDealsData,
  };
};
