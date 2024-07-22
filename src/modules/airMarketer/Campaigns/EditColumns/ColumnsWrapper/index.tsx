import { Box, Checkbox } from '@mui/material';

import { DragIcon } from '@/assets/icons';

const ColumnsWrapper = ({ ...rest }) => {
  const { title, checkboxProps } = rest;
  return (
    <Box my={'16px'}>
      <Box>
        <DragIcon />
        {title}
      </Box>
      <Checkbox {...checkboxProps} />
    </Box>
  );
};

export default ColumnsWrapper;
