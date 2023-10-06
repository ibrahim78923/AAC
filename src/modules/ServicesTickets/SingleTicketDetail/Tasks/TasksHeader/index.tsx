import { useState } from 'react';
import { Button, Grid, MenuItem, Popover, Typography } from '@mui/material';
import { ActionButtonIcon, CirclePlusIcon } from '@/assets/icons';
import { taskStyles } from '../TicketTasks.styles';

export const TasksHeader = ({
  setIsAddDrawerOpen,
  setIsEditDrawerOpen,
  activeCheck,
}: any) => {
  const [actionDropdown, setActionDropdown] = useState(false);
  // const [exportVal, setExportVal] = useState(false);
  return (
    <Grid container spacing={{ sm: 0, xs: 2 }} sx={taskStyles?.headContainer}>
      <Grid
        item
        sm={6}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-start', xs: 'center' },
        }}
      >
        <Typography variant="h5" sx={taskStyles?.headText}>
          Task
        </Typography>
      </Grid>
      <Grid sm={6} xs={12} item sx={taskStyles?.btnContainer}>
        <Button
          sx={taskStyles?.actionBtn}
          endIcon={<ActionButtonIcon />}
          disableElevation
          disabled={!!!activeCheck.length}
          onClick={() => setActionDropdown(true)}
        >
          Action
        </Button>
        <Popover open={actionDropdown} onClose={() => setActionDropdown(false)}>
          <MenuItem>Delete</MenuItem>
          <MenuItem
            onClick={() => {
              setIsEditDrawerOpen(true), setActionDropdown(false);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem>
            Export
            {/* {exportVal === true && (
          <Popover open={exportVal} onClick={()=> setExportVal(false)}>
        <MenuItem onClick={()=> setExportVal(false)}>CSV</MenuItem>
        <MenuItem>PDF</MenuItem>
        </Popover>
        )} */}
          </MenuItem>
        </Popover>
        <Button
          sx={taskStyles?.addTaskBtn}
          onClick={() => setIsAddDrawerOpen(true)}
          startIcon={<CirclePlusIcon />}
        >
          Add New Task
        </Button>
      </Grid>
    </Grid>
  );
};
