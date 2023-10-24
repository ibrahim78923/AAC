import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { styles } from './Call.style';
import CallLeftArea from './CallLeftArea';
import CallRightArea from './CallRightArea';

const Call = () => {
  const [callsMode, setCallsMode] = useState('calls');
  const [activeCallsSelectedData, setActiveCallsSelectedData] = useState();
  return (
    <Box sx={{ background: '#fff' }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <Box sx={styles.leftWrapper}>
            <CallLeftArea
              toggleCall={callsMode}
              setToggleCall={setCallsMode}
              setActiveCallsSelectedData={setActiveCallsSelectedData}
              activeCallsSelectedData={activeCallsSelectedData}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <Box sx={styles.rightWrapper}>
            <CallRightArea
              callsMode={callsMode}
              activeCallsSelectedData={activeCallsSelectedData}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Call;
