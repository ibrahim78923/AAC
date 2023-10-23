import React from 'react';

import { Box, Grid } from '@mui/material';
import { styles } from '../Call.style';

const CallRightArea = ({ callsMode }: any) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          {callsMode && <Box sx={styles.leftWrapper}>s</Box>}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <Box sx={styles.rightWrapper}>e</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CallRightArea;
