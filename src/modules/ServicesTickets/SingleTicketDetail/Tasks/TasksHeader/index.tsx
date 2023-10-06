import { Button, Grid, MenuItem, Popover, Typography } from '@mui/material';
import { ActionButtonIcon, CirclePlusIcon } from '@/assets/icons';
import { useTasks } from '../useTasks';
import { taskStyles } from '../TicketTasks.styles';
import { TasksHeaderI } from '../Tasks.interface';

export const TasksHeader = ({
  setIsAddDrawerOpen,
  setIsEditDrawerOpen,
  activeCheck,
}: TasksHeaderI) => {
  const {
    actionPop,
    setActionPop,
    openAction,
    handleActionClick,
    handleActionClose,
    actionExportPop,
    openActionExport,
    handleActionExportClick,
    handleActionExportClose,
  } = useTasks();
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
          onClick={handleActionClick}
        >
          Action
        </Button>
        <Popover
          open={openAction}
          anchorEl={actionPop}
          onClose={handleActionClose}
          sx={{ mt: '8px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <MenuItem
            onClick={() => {
              setIsEditDrawerOpen(true), setActionPop(null);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem sx={{ p: 1 }}>Delete</MenuItem>
          <MenuItem sx={{ p: 1 }}>
            <a onClick={handleActionExportClick}>Export Task</a>
            <Popover
              open={openActionExport}
              anchorEl={actionExportPop}
              onClose={handleActionExportClose}
              sx={{ ml: '-12px' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => window.history.go(-1)}>CSV</MenuItem>
              <MenuItem onClick={() => window.history.go(-1)}>Excel</MenuItem>
            </Popover>
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
