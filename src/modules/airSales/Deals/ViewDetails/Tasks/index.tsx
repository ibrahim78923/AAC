import { Box, Grid, Typography, Button } from '@mui/material';

import TaskEditorDrawer from './TaskEditorDrawer';
import ActionDropdown from './ActionDropdown';
import TanstackTable from '@/components/Table/TanstackTable';

import useTasks from './useTasks';

import { columns } from './Tasks.data';

import { PlusIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { useAppSelector } from '@/redux/store';
import { useGetDealsTaskDetailsQuery } from '@/services/airSales/deals/view-details/tasks';

const Tasks = (props: any) => {
  const { selectedRecId } = props;

  const {
    openDrawer,
    setOpenDrawer,
    selectedCheckboxes,
    taskData,
    setPage,
    setPageLimit,
    status,
    setSelectedCheckboxes,
  } = useTasks(selectedRecId);

  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task_deals?.selectedDealsTaskIds,
  );
  const { data: taskDataDefault } = useGetDealsTaskDetailsQuery({
    id: selectedTaskIds?.length === 1 && selectedTaskIds[0],
  });
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
              selectedRecId={selectedRecId}
            />
            <PermissionsGuard
              permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_ADD_TASK]}
            >
              <Button
                variant="contained"
                sx={{ minWidth: '0px', gap: 0.5 }}
                onClick={() => setOpenDrawer('Add')}
                className="small"
              >
                <PlusIcon /> Add New Task
              </Button>
            </PermissionsGuard>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ data: taskData?.data?.taskmanagements })}
            data={taskData?.data?.taskmanagements}
            // isLoading={true}
            isLoading={status === 'pending'}
            isPagination
            count={taskData?.data?.meta?.pages}
            totalRecords={taskData?.data?.meta?.total}
            onPageChange={handlePageChange}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </Grid>
      </Grid>
      {openDrawer && (
        <TaskEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setSelectedCheckboxes={setSelectedCheckboxes}
          selectedCheckboxes={selectedCheckboxes}
          selectedRecId={selectedRecId}
          taskData={taskDataDefault}
        />
      )}
    </Box>
  );
};

export default Tasks;
