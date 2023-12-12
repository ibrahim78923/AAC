import { Box, Grid, Typography, Button } from '@mui/material';

import TaskEditorDrawer from './TaskEditorDrawer';
import ActionDropdown from './ActionDropdown';
import TanstackTable from '@/components/Table/TanstackTable';

import useTasks from './useTasks';

import { columns } from './Tasks.data';

import { PlusIcon } from '@/assets/icons';

const Tasks = () => {
  const {
    openDrawer,
    setOpenDrawer,
    handleCheckboxChange,
    selectedCheckboxes,
    taskData,
    setSelectedCheckboxes,
  } = useTasks();
  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4"> Tasks</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              gap: 1,
              display: 'flex',
              justifyContent: 'end',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <ActionDropdown
              selectedCheckboxes={selectedCheckboxes}
              setSelectedCheckboxes={setSelectedCheckboxes}
              setOpenDrawer={setOpenDrawer}
            />
            <Button
              variant="contained"
              sx={{ minWidth: '0px', gap: 0.5 }}
              onClick={() => setOpenDrawer('Add')}
              className="small"
            >
              <PlusIcon /> Add New Task
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ handleCheckboxChange, selectedCheckboxes })}
            data={taskData?.data?.taskmanagements}
          />
        </Grid>
      </Grid>
      {openDrawer && (
        <TaskEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setSelectedCheckboxes={setSelectedCheckboxes}
          selectedCheckboxes={selectedCheckboxes}
        />
      )}
    </Box>
  );
};

export default Tasks;
