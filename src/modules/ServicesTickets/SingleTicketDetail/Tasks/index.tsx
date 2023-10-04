import { useState } from 'react';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { columns, data } from './TicketTasks.mock';
import { Button, Typography } from '@mui/material';
import { TicketTaskDrawer } from './TicketTaskDrawer';
import { ActionButtonIcon, CirclePlusIcon } from '@/assets/icons';
import { taskStyles } from './TicketTasks.styles';

export const Tasks = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [index, setIndex] = useState<any>(0);
  const handleCheckboxChange = (event: any) => {
    setActive(event.target.checked);
  };
  return (
    <div>
      <div style={taskStyles?.headContainer}>
        <Typography variant="h5" sx={taskStyles?.headText}>
          Task
        </Typography>
        <div style={taskStyles?.btnContainer}>
          <Button
            sx={taskStyles?.actionBtn}
            endIcon={<ActionButtonIcon />}
            disabled={!active}
          >
            Action
          </Button>
          <Button
            sx={taskStyles?.addTaskBtn}
            onClick={() => setIsDrawerOpen(true)}
            startIcon={<CirclePlusIcon />}
          >
            Add New Task
          </Button>
        </div>
      </div>
      <TicketTaskDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={setIsDrawerOpen}
        id="create"
      />
      <TicketTaskDrawer
        isDrawerOpen={isUpdateDrawerOpen}
        onClose={setIsUpdateDrawerOpen}
        id="details"
        taskDetail={data[data.findIndex((img: any) => img.taskID === index)]}
      />
      <br />
      <TanstackTable
        columns={columns(setIsUpdateDrawerOpen, handleCheckboxChange, setIndex)}
        data={data}
      />
    </div>
  );
};
