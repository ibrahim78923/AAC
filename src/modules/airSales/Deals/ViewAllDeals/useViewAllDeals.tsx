import { useState } from 'react';

import { Box, Checkbox, useTheme } from '@mui/material';

import { DragIcon } from '@/assets/icons';

import { styles } from './ViewAllDeals.style';

const useViewAllDeals = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');

  const ColumnsWrapper = ({ ...rest }) => {
    const { title, checkboxProps } = rest;
    return (
      <Box my={'16px'} sx={styles?.viewBox(theme)}>
        <Box sx={styles?.viewChildBox}>
          <DragIcon />
          {title}
        </Box>
        <Checkbox {...checkboxProps} />
      </Box>
    );
  };
  return {
    search,
    setSearch,
    theme,
    ColumnsWrapper,
  };
};

export default useViewAllDeals;
