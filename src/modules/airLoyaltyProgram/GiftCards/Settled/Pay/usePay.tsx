import { useState } from 'react';
import { payTabelData } from './Pay.data';
import { useTheme } from '@mui/material';

export const usePay = () => {
  const [hideZeroPrice, setHideZeroPrice] = useState(false);
  const { palette } = useTheme();
  const shouldHideColumn = (columnName: string) => {
    return (
      hideZeroPrice &&
      payTabelData?.every(
        (item: any) =>
          item?.value?.receive !== columnName || item?.value?.price <= 0,
      )
    );
  };
  const toggleHideZeroPrice = () => {
    setHideZeroPrice(!hideZeroPrice);
  };
  return { palette, shouldHideColumn, hideZeroPrice, toggleHideZeroPrice };
};
