import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Import from '../Import';
import ActivityAndPerformance from '../ActivityAndPerformance';
import CreateTask from '../CreateTask';
import { styles } from './TaskHeader.style';

const TaskHeader = () => {
  const { header, title, action } = styles(useTheme());

  return (
    <Box sx={header}>
      <Typography sx={title}>Tasks</Typography>
      <Box sx={action}>
        <Import />
        <ActivityAndPerformance />
        <CreateTask />
      </Box>
    </Box>
  );
};

export default TaskHeader;
