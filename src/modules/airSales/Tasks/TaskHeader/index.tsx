import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';

import ActivityAndPerformance from '../ActivityAndPerformance';
import CreateTask from '../CreateTask';
import { PlusIcon, UmbrellaIcon } from '@/assets/icons';
import ImportTaskDrawer from '../ImportTaskDrawer';
const TaskHeader = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateTaskDrawerOpen, setIsCreateTaskDrawerOpen] = useState(false);
  return (
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
        <Button
          variant="outlined"
          className="small"
          color="inherit"
          startIcon={<UmbrellaIcon />}
          onClick={() => setIsOpen(true)}
        >
          Import
        </Button>
        <ActivityAndPerformance />
        <Button
          onClick={() => setIsCreateTaskDrawerOpen(true)}
          className="small"
          variant="contained"
          startIcon={<PlusIcon />}
        >
          Create Task
        </Button>
        {isCreateTaskDrawerOpen && (
          <CreateTask
            isCreateTaskDrawerOpen={isCreateTaskDrawerOpen}
            setIsCreateTaskDrawerOpen={setIsCreateTaskDrawerOpen}
            creationMode={'create'}
          />
        )}
      </Box>
      {isOpen && (
        <ImportTaskDrawer onClose={() => setIsOpen(false)} open={isOpen} />
      )}
    </Box>
  );
};

export default TaskHeader;
