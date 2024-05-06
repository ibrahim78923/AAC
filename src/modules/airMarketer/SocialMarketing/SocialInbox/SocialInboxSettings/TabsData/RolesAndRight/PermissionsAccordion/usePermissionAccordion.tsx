import { useState } from 'react';

import { useTheme } from '@mui/material';

const usePermissionAccordion = () => {
  const theme = useTheme();

  const [selectedModule, setSelectedModule] = useState<string>();
  const [selectedSubModule, setSelectedSubModule] = useState<string>();

  const handleExpandAccordionChange = (module: string) => {
    if (module === selectedModule) {
      setSelectedModule('');
    } else {
      setSelectedModule(module);
    }
  };

  const handleChangeSubModule = (subModule: any) => {
    if (subModule === selectedSubModule) {
      setSelectedSubModule('');
    } else {
      setSelectedSubModule(subModule);
    }
  };

  return {
    handleExpandAccordionChange,
    handleChangeSubModule,
    setSelectedModule,
    selectedSubModule,
    selectedModule,
    theme,
  };
};

export default usePermissionAccordion;
