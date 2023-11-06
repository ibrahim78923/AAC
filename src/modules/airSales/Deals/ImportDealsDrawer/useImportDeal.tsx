import { useState } from 'react';

import { useTheme } from '@mui/material';

const useImportDeal = () => {
  const theme: any = useTheme();

  const [isColumnsSelect, setIsColumnsSelect] = useState(false);
  const okTitle = isColumnsSelect ? 'Import' : 'Next';
  const handleSubmit = () => {
    if (!isColumnsSelect) {
      setIsColumnsSelect(true);
    }
  };
  return {
    handleSubmit,
    isColumnsSelect,
    setIsColumnsSelect,
    theme,
    okTitle,
  };
};

export default useImportDeal;
