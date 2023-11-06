import React, { useState } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import Search from '@/components/Search';
import CallsGrid from './CallsGrid';
import MessagesGrid from './MessagesGrid';

import { CallContainedIcon, MessageContainedIcon } from '@/assets/icons';

import { styles } from './CallLeftArea.style';

const CallLeftArea = ({
  toggleCall,
  setToggleCall,
  setActiveCallsSelectedData,
  activeCallsSelectedData,
  isActiveCalling,
  setIsActiveCalling,

  activeMessageData,
  setActiveMessageData,
  isActiveMessage,
  setIsActiveMessage,
}: any) => {
  const theme = useTheme();

  const [callSearch, setCallSearch] = useState('');

  return (
    <Box>
      <Box sx={{ padding: '15px 15px 0px 15px ' }}>
        <Typography variant="h3">Call</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            mt: 2,
          }}
        >
          <Box
            sx={styles.tabsWrapperCalls(toggleCall)}
            onClick={() => setToggleCall('calls')}
          >
            <CallContainedIcon />
            <Typography
              variant="body2"
              color={theme.palette.primary.main}
              fontWeight="500"
            >
              Call
            </Typography>
          </Box>
          <Box
            sx={styles.tabsWrapperMessage(toggleCall)}
            onClick={() => setToggleCall('messages')}
          >
            <MessageContainedIcon />
            <Typography
              variant="body2"
              color={theme.palette.primary.main}
              fontWeight="500"
            >
              Message
            </Typography>
          </Box>
        </Box>
        <br />
        <Search
          searchBy={callSearch}
          setSearchBy={setCallSearch}
          label="Search"
          size="small"
          fullWidth
        />
      </Box>
      {toggleCall === 'calls' && (
        <CallsGrid
          setActiveCallsSelectedData={setActiveCallsSelectedData}
          activeCallsSelectedData={activeCallsSelectedData}
          isActiveCalling={isActiveCalling}
          setIsActiveCalling={setIsActiveCalling}
        />
      )}
      {toggleCall === 'messages' && (
        <MessagesGrid
          activeMessageData={activeMessageData}
          setActiveMessageData={setActiveMessageData}
          isActiveMessage={isActiveMessage}
          setIsActiveMessage={setIsActiveMessage}
          setActiveCallsSelectedData={setActiveCallsSelectedData}
          setIsActiveCalling={setIsActiveCalling}
        />
      )}
    </Box>
  );
};

export default CallLeftArea;
