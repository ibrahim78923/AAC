import React from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';
import { styles } from './SkeletonTable.style';

const SkeletonTable = () => {
  const theme: any = useTheme(); // for too small logic we do not make hooks.

  return (
    <Box>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={'100%'}
        height={50}
        sx={styles?.root(theme)}
      />
    </Box>
  );
};

export default SkeletonTable;
