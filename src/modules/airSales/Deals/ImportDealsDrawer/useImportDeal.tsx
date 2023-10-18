import { useState } from 'react';

import { useTheme } from '@mui/material';

const useImportDeal = () => {
  const theme: any = useTheme();
  const [isColumnsSelect, setIsColumnsSelect] = useState(false);
  const handleSubmit = () => {
    if (!isColumnsSelect) {
      setIsColumnsSelect(true);
    } else {
    }
  };
  return {
    handleSubmit,
    isColumnsSelect,
    setIsColumnsSelect,
    theme,
  };
};

export default useImportDeal;
