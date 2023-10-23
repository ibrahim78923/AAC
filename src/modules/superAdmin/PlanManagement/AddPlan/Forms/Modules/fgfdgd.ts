import { useState } from 'react';

import { useTheme } from '@mui/material';

export const useModules = () => {
  const theme = useTheme();

  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    'plan-air-sales-accordion',
  );

  const handleExpandAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setAccordionExpanded(newExpanded ? panel : false);
    };

  return {
    theme,
    accordionExpanded,
    setAccordionExpanded,
    handleExpandAccordionChange,
  };
};
