import { useState } from 'react';

import { Theme, useTheme } from '@mui/material';

import { columns } from './Templates.data';
import { useRouter } from 'next/router';

const useTemplatese = () => {
  const [productSearch, setproductSearch] = useState<string>('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const navigate = useRouter();
  const theme = useTheme<Theme>();
  const deleteTemplete = async () => {
    setIsOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const getRowValues = columns(setIsOpenAlert, navigate, theme);

  return {
    productSearch,
    setproductSearch,
    theme,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    deleteTemplete,
    navigate,
  };
};

export default useTemplatese;
