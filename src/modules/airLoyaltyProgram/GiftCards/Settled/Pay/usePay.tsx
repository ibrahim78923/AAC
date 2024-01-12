import { useState } from 'react';
import { payTabelData } from './Pay.data';
import { useTheme } from '@mui/material';

export const usePay = () => {
  const [hideZeroPrice] = useState(false);
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
  return { palette, shouldHideColumn, hideZeroPrice };
};
