import { Box, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import TaskEditorDrawer from './TaskEditorDrawer';
import ActionDropdown from './ActionDropdown';
import useTasks from './useTasks';
import { columns } from './Tasks.data';
import { AlertModals } from '@/components/AlertModals';
import AssignModalBox from './AssignModalBox';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS } from '@/constants/permission-keys';

const Tasks = ({ contactId }: any) => {
  const {
    contactsList,
    anchorEl,
    isActionMenuOpen,
    handleOpenActionMenu,
    handleCloseActionMenu,
    dataGetContactTasks,
    loadingGetTasks,
    setPage,
    setPageLimit,
    openDrawerEditTask,
    handleOpenDrawerEditTask,
    handleCloseDrawerEditTask,
    selectedRow,
    setSelectedRow,
    openModalAssignee,
    handleOpenModalAssignee,
    handleCloseModalAssignee,
    openTaskDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleSubmitDeleteTasks,
    loadingDelete,
    selectedRowData,
  } = useTasks(contactId);

  const tasksTableColumns = columns(selectedRow, setSelectedRow);

  return (
    <PermissionsGuard
      permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.VIEW_TASKS]}
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
              <Typography variant="h4">Tasks</Typography>
              <Box sx={{ gap: 1, display: 'flex' }}>
                <ActionDropdown
                  anchorEl={anchorEl}
                  isActionMenuOpen={isActionMenuOpen}
                  handleOpenActionMenu={handleOpenActionMenu}
                  handleCloseActionMenu={handleCloseActionMenu}
                  isActionsDisabled={selectedRow?.length === 0}
                  isMenuItemDisabled={selectedRow?.length > 1}
                  handleOpenDrawer={handleOpenDrawerEditTask}
                  handleOpenModalReassign={handleOpenModalAssignee}
                  handleOpenModalDelete={handleOpenModalDelete}
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TanstackTable
              columns={tasksTableColumns}
              data={dataGetContactTasks?.data?.taskmanagements}
              isLoading={loadingGetTasks}
              currentPage={dataGetContactTasks?.data?.meta?.page}
              count={dataGetContactTasks?.data?.meta?.pages}
              pageLimit={dataGetContactTasks?.data?.meta?.limit}
              totalRecords={dataGetContactTasks?.data?.meta?.total}
              setPage={setPage}
              setPageLimit={setPageLimit}
              onPageChange={(page: any) => setPage(page)}
              isPagination
            />
          </Grid>
        </Grid>

        <TaskEditorDrawer
          openDrawer={openDrawerEditTask}
          onClose={handleCloseDrawerEditTask}
          contactsList={contactsList || []}
          data={selectedRowData}
        />

        <AssignModalBox
          open={openModalAssignee}
          onClose={handleCloseModalAssignee}
          data={selectedRowData}
          setSelectedRow={setSelectedRow}
        />

        <AlertModals
          type={'delete'}
          open={openTaskDeleteModal}
          handleClose={handleCloseModalDelete}
          handleSubmitBtn={handleSubmitDeleteTasks}
          message="You're about to delete a record. Deleted records can't be restored after 90 days."
          loading={loadingDelete}
        />
      </Box>
    </PermissionsGuard>
  );
};

export default Tasks;
