import { useState } from 'react';

import { useTheme } from '@mui/material';

export const useModules = () => {
  const [expanded, setExpanded] = useState<string | false>(
    'plan-air-sales-accordion',
  );

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
  };
};
