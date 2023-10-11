import React from 'react';

import { Box, Grid, Typography, Button } from '@mui/material';

import TaskEditorDrawer from './TaskEditorDrawer';
import ActionDropdown from './ActionDropdown';
import TanstackTable from '@/components/Tabel/TanstackTable';

import useTasks from './useTasks';

import { columns } from './Tasks.data';

import { TasksTableData } from '@/mock/modules/Deals';

import { PlusSharedIcon } from '@/assets/icons';

const Tasks = () => {
  const { openDrawer, setOpenDrawer } = useTasks();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2"> Tasks</Typography>
            <Box sx={{ gap: 1, display: 'flex' }}>
              <ActionDropdown setOpenDrawer={setOpenDrawer} />
              <Button
                variant="contained"
                sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                onClick={() => setOpenDrawer('Add')}
              >
                <PlusSharedIcon /> Add New Task
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable columns={columns} data={TasksTableData} />
        </Grid>
      </Grid>

      <TaskEditorDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default Tasks;
