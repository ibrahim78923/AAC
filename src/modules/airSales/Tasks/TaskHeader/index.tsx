import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Import from '../Import';
import ActivityAndPerformance from '../ActivityAndPerformance';
import CreateTask from '../CreateTask';
const TaskHeader = () => {
  // const { header, title, action } = styles(useTheme());
  const theme = useTheme();
  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     padding: '16px 24px',
    //     flexWrap: 'wrap',
    //     gap: '15px',
    //   }}
    // >
    //   <Typography
    //     sx={{
    //       flex: 1,
    //       fontSize: '24px',
    //       fontWeight: 600,
    //       color: theme?.palette?.grey[800],
    //     }}
    //   >
    //     Tasks
    //   </Typography>
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       flexWrap: 'wrap',
    //       gap: '8px',
    //     }}
    //   >
    //     <Import />
    //     <ActivityAndPerformance />
    //     <CreateTask />
    //   </Box>
    // </Box>

    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
        padding: '16px 24px',
        gap: '15px',
      }}
    >
      <Typography
        sx={{
          flex: 1,
          fontSize: '24px',
          fontWeight: 600,
          color: theme?.palette?.grey[800],
          marginBottom: { xs: '16px', sm: 0 },
          width: { xs: '100%', sm: 'auto' },
          textAlign: { xs: 'center', sm: 'start', md: 'start', lg: 'start' },
        }}
      >
        Tasks
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: '8px', sm: '8px' },
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        <Import />
        <ActivityAndPerformance />
        <CreateTask />
      </Box>
    </Box>
  );
};

export default TaskHeader;
