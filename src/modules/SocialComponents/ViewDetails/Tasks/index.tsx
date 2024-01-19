import { Box, Grid, Typography, Button } from '@mui/material';

import TaskEditorDrawer from './TaskEditorDrawer';
import ActionDropdown from './ActionDropdown';
import TanstackTable from '@/components/Table/TanstackTable';

import useTasks from './useTasks';

import { columns } from './Tasks.data';

import { PlusIcon } from '@/assets/icons';

const Tasks = ({ companyId }: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    taskData,
    selectedCheckboxes,
    setSelectedCheckboxes,
    handleCheckboxChange,
    isLoading,
  } = useTasks();
  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4"> Tasks</Typography>
            <Box sx={{ gap: 1, display: 'flex' }}>
              <ActionDropdown
                setOpenDrawer={setOpenDrawer}
                selectedCheckboxes={selectedCheckboxes}
                setSelectedCheckboxes={setSelectedCheckboxes}
              />
              <Button
                variant="contained"
                sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                onClick={() => setOpenDrawer('Add')}
              >
                <PlusIcon /> Add New Task
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ handleCheckboxChange, selectedCheckboxes })}
            data={taskData?.data?.taskmanagements}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
      {openDrawer && (
        <TaskEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          selectedCheckboxes={selectedCheckboxes}
          setSelectedCheckboxes={setSelectedCheckboxes}
          companyId={companyId}
        />
      )}
    </Box>
  );
};

export default Tasks;
