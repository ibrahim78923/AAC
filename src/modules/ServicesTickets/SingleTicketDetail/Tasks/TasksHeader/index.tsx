import { Button, Typography } from '@mui/material';
import { ActionButtonIcon, CirclePlusIcon } from '@/assets/icons';
import { taskStyles } from '../TicketTasks.styles';

export const TasksHeader = ({ setIsAddDrawerOpen, activeCheck }: any) => {
  return (
    <div style={taskStyles?.headContainer}>
      <Typography variant="h5" sx={taskStyles?.headText}>
        Task
      </Typography>
      <div style={taskStyles?.btnContainer}>
        <Button
          sx={taskStyles?.actionBtn}
          endIcon={<ActionButtonIcon />}
          disableElevation
          disabled={!!!activeCheck.length}
        >
          Action
        </Button>
        <Button
          sx={taskStyles?.addTaskBtn}
          onClick={() => setIsAddDrawerOpen(true)}
          startIcon={<CirclePlusIcon />}
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
};
