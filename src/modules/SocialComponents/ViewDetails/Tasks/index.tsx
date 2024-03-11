import { Box, Grid, Typography, Button } from '@mui/material';

import TaskEditorDrawer from './TaskEditorDrawer';
import ActionDropdown from './ActionDropdown';
import TanstackTable from '@/components/Table/TanstackTable';

import useTasks from './useTasks';

import { columns } from './Tasks.data';

import { PlusIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS } from '@/constants/permission-keys';

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
    <PermissionsGuard
      permissions={[
        SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.VIEW_TASK,
      ]}
    >
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
                <PermissionsGuard
                  permissions={[
                    SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.ADD_TASK,
                  ]}
                >
                  <Button
                    variant="contained"
                    sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                    onClick={() => setOpenDrawer('Add')}
                  >
                    <PlusIcon /> Add New Task
                  </Button>
                </PermissionsGuard>
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
    </PermissionsGuard>
  );
};

export default Tasks;
