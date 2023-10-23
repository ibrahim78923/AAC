import React, { useState } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { CallContainedIcon, MessageContainedIcon } from '@/assets/icons';

import { styles } from './CallLeftArea.style';
import Search from '@/components/Search';
import CallsGrid from './CallsGrid';
import MessagesGrid from './MessagesGrid';

const CallLeftArea = ({ toggleCall, setToggleCall }: any) => {
  const theme = useTheme();

  // const [toggleCall, setToggleCall] = useState('calls')
  const [callSearch, setCallSearch] = useState('');

  return (
    <Box>
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
      {toggleCall === 'calls' && <CallsGrid />}
      {toggleCall === 'messages' && <MessagesGrid />}
    </Box>
  );
};

export default CallLeftArea;
