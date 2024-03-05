import { Box, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import TaskEditorDrawer from './TaskEditorDrawer';
import ActionDropdown from './ActionDropdown';
import useTasks from './useTasks';
import { assigneeDataArray, columns } from './Tasks.data';
import { FormProvider } from '@/components/ReactHookForm';
import { ScheduleModals } from '@/components/ScheduleModals';
import { AlertModals } from '@/components/AlertModals';

const Tasks = ({ contactId }: any) => {
  const {
    contactsList,
    anchorEl,
    isActionMenuOpen,
    handleOpenActionMenu,
    handleCloseActionMenu,
    dataGetContactTasks,
    openDrawerEditTask,
    handleOpenDrawerEditTask,
    handleCloseDrawerEditTask,
    methodsEditTask,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
    methodsAssignee,
    openModalAssignee,
    handleOpenModalAssignee,
    handleCloseModalAssignee,
    handleSubmitReassign,
    loadingReAssignTask,
    openTaskDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleSubmitDeleteTasks,
    loadingDelete,
  } = useTasks(contactId);

  const tasksTableColumns = columns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  const assigneeForm = assigneeDataArray(contactsList);

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
            <Typography variant="h4">Tasks</Typography>
            <Box sx={{ gap: 1, display: 'flex' }}>
              <ActionDropdown
                anchorEl={anchorEl}
                isActionMenuOpen={isActionMenuOpen}
                handleOpenActionMenu={handleOpenActionMenu}
                handleCloseActionMenu={handleCloseActionMenu}
                isActionsDisabled={isActionsDisabled}
                isMenuItemDisabled={rowId}
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
            data={dataGetContactTasks?.data?.tasks}
          />
        </Grid>
      </Grid>

      <TaskEditorDrawer
        openDrawer={openDrawerEditTask}
        onClose={handleCloseDrawerEditTask}
        methods={methodsEditTask}
        contactsList={contactsList || []}
      />

      <ScheduleModals
        submitButonText="Update"
        type={'assign'}
        open={openModalAssignee}
        handleClose={handleCloseModalAssignee}
        handleSubmit={handleSubmitReassign}
        isFooter={true}
        loading={loadingReAssignTask}
      >
        <FormProvider methods={methodsAssignee}>
          <Grid container>
            {assigneeForm?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </ScheduleModals>

      <AlertModals
        type={'delete'}
        open={openTaskDeleteModal}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleSubmitDeleteTasks}
        message="You're about to delete a record. Deleted records can't be restored after 90 days."
        loading={loadingDelete}
      />
    </Box>
  );
};

export default Tasks;
