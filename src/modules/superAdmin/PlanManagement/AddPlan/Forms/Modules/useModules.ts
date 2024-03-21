import { useState } from 'react';

import { useTheme } from '@mui/material';

export const useModules = () => {
  const theme = useTheme();
  const [selectModule, setSelectModule] = useState();

  const [isAccordionExpanded, setIsAccordionExpanded] = useState<
    string | false
  >('plan-air-sales-accordion');

  const handleExpandAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setIsAccordionExpanded(newExpanded ? panel : false);
    };

  const handleValue = (value: any, e: any) => {
    if (e?.target?.checked) {
      setSelectModule(value);
    } else {
      setSelectModule([]);
    }
  };
  return {
    theme,
    isAccordionExpanded,
    setIsAccordionExpanded,
    handleExpandAccordionChange,
    selectModule,
    handleValue,
  };
};
