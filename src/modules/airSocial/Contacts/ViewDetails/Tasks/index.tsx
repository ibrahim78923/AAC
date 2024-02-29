import { Box, Grid, Typography } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { TasksTableData } from '@/mock/modules/airSales/Deals/ViewDetails';

import TaskEditorDrawer from './TaskEditorDrawer';
import ActionDropdown from './ActionDropdown';
import useTasks from './useTasks';
import { columns } from './Tasks.data';

const Tasks = ({ contactId }: any) => {
  const { openDrawer, setOpenDrawer } = useTasks(contactId);
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
              <ActionDropdown setOpenDrawer={setOpenDrawer} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable columns={columns} data={TasksTableData} />
        </Grid>
      </Grid>

      <TaskEditorDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </Box>
  );
};

export default Tasks;
