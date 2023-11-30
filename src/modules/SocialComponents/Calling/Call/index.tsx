import React from 'react';

import { Box, Grid, useTheme } from '@mui/material';

import CallLeftArea from './CallLeftArea';
import CallRightArea from './CallRightArea';

import useCall from './useCall';

import { styles } from './Call.style';

const Call = () => {
  const {
    callsMode,
    setCallsMode,
    activeCallsSelectedData,
    setActiveCallsSelectedData,
    isActiveCalling,
    setIsActiveCalling,
    activeMessageData,
    setActiveMessageData,
    isActiveMessage,
    setIsActiveMessage,
  } = useCall();

  const theme = useTheme();

  return (
    <Box sx={{ background: theme?.palette?.common?.white }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <Box sx={styles?.leftWrapper}>
            <CallLeftArea
              toggleCall={callsMode}
              setToggleCall={setCallsMode}
              setActiveCallsSelectedData={setActiveCallsSelectedData}
              activeCallsSelectedData={activeCallsSelectedData}
              setIsActiveCalling={setIsActiveCalling}
              isActiveCalling={isActiveCalling}
              activeMessageData={activeMessageData}
              setActiveMessageData={setActiveMessageData}
              isActiveMessage={isActiveMessage}
              setIsActiveMessage={setIsActiveMessage}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <Box sx={styles?.rightWrapper}>
            <CallRightArea
              callsMode={callsMode}
              activeCallsSelectedData={activeCallsSelectedData}
              setActiveCallsSelectedData={setActiveCallsSelectedData}
              setIsActiveCalling={setIsActiveCalling}
              isActiveCalling={isActiveCalling}
              activeMessageData={activeMessageData}
              setActiveMessageData={setActiveMessageData}
              isActiveMessage={isActiveMessage}
              setIsActiveMessage={setIsActiveMessage}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Call;
