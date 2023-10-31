import React, { useState } from 'react';

import { Box, Grid } from '@mui/material';

import CallLeftArea from './CallLeftArea';
import CallRightArea from './CallRightArea';

import { styles } from './Call.style';

const Call = () => {
  const [callsMode, setCallsMode] = useState('calls');
  const [activeCallsSelectedData, setActiveCallsSelectedData] = useState();
  const [isActiveCalling, setIsActiveCalling] = useState();
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
              setIsActiveCalling={setIsActiveCalling}
              isActiveCalling={isActiveCalling}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <Box sx={styles.rightWrapper}>
            <CallRightArea
              callsMode={callsMode}
              activeCallsSelectedData={activeCallsSelectedData}
              setActiveCallsSelectedData={setActiveCallsSelectedData}
              setIsActiveCalling={setIsActiveCalling}
              isActiveCalling={isActiveCalling}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Call;
