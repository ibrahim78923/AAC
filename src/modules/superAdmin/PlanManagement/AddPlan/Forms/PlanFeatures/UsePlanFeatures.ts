import { useState } from 'react';

import { useTheme } from '@mui/material';

export const UsePlanFeatures = () => {
  const theme = useTheme();

  const [expandedAccordion, setExpandAccordion] = useState<string | false>(
    'plan-features-sales-accordion',
  );

  const handleExpandAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandAccordion(isExpanded ? panel : false);
    };

  return {
    theme,
    expandedAccordion,
    handleExpandAccordionChange,
  };
};
