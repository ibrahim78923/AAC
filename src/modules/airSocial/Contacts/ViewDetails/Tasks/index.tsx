import { Box, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import TaskEditorDrawer from './TaskEditorDrawer';
import ActionDropdown from './ActionDropdown';
import useTasks from './useTasks';
import { columns } from './Tasks.data';

const Tasks = ({ contactId }: any) => {
  const {
    anchorEl,
    isActionMenuOpen,
    handleOpenActionMenu,
    handleCloseActionMenu,
    dataGetContactTasks,
    drawerTitle,
    openDrawerEditTask,
    handleOpenDrawerEditTask,
    handleCloseDrawerEditTask,
    methodsEditTask,
    handleSubmitUpdateContactTask,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
  } = useTasks(contactId);

  const tasksTableColumns = columns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

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
                anchorEl={anchorEl}
                isActionMenuOpen={isActionMenuOpen}
                handleOpenActionMenu={handleOpenActionMenu}
                handleCloseActionMenu={handleCloseActionMenu}
                isActionsDisabled={isActionsDisabled}
                isMenuItemDisabled={rowId}
                handleOpenDrawer={handleOpenDrawerEditTask}
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
        title={drawerTitle}
        openDrawer={openDrawerEditTask}
        onClose={handleCloseDrawerEditTask}
        methods={methodsEditTask}
        handleSubmit={handleSubmitUpdateContactTask}
      />
    </Box>
  );
};

export default Tasks;
