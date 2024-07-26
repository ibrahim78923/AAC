import { Box, Checkbox, useTheme } from '@mui/material';

import { styles } from '../ContactsCustomize.style';

import { DragIcon } from '@/assets/icons';

const ColumnsWrapper = ({ ...rest }) => {
  const { title, checkboxProps } = rest;
  const theme = useTheme();
  return (
    <Box my={'16px'} sx={styles?.BoxStyle(theme)}>
      <Box sx={styles?.ChildBoxStyle}>
        <DragIcon />
        {title}
      </Box>
      <Checkbox {...checkboxProps} />
    </Box>
  );
};

export default ColumnsWrapper;
