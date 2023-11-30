import React from 'react';
import { Box, Checkbox } from '@mui/material';
import { DragIcon } from '@/assets/icons';
import { EditColumnI } from '../EditColumn.interface';
import { styles } from './ColumnWrapper.style';

export const ColumnsWrapper = ({
  key,
  title,
  checkBoxProps = {},
}: EditColumnI) => {
  return (
    <Box key={key} my={'16px'} sx={styles?.columnWrapper}>
      <Box sx={styles?.dragIcon}>
        <DragIcon />
        {title}
      </Box>
      <Checkbox {...checkBoxProps} />
    </Box>
  );
};
