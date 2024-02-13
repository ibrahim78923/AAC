import { Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { ActionButtonIcon, CirclePlusIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import { useTasksHeader } from './useTasksHeader';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const TasksHeader = (props: any) => {
  const { activeCheck } = props;
  const {
    actionPop,
    openAction,
    handleActionClick,
    handleActionClose,
    actionExportPop,
    openActionExport,
    handleActionExportClick,
    handleActionExportClose,
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    openEditDrawer,
    openAddDrawer,
    csvExportHandler,
    excelExportHandler,
    isLoading,
  } = useTasksHeader(props);
  return (
    <Grid
      container
      spacing={{ sm: 0, xs: 2 }}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid
        item
        sm={6}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-start', xs: 'center' },
        }}
      >
        <Typography variant="h5">Task</Typography>
      </Grid>
      <Grid
        sm={6}
        xs={12}
        item
        display="flex"
        gap="20px"
        justifyContent={{ sm: 'flex-end', xs: 'center' }}
      >
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<ActionButtonIcon />}
          disableElevation
          disabled={!!!activeCheck?.length}
          onClick={handleActionClick}
        >
          Action
        </Button>
        <Menu
          open={openAction}
          anchorEl={actionPop}
          onClose={handleActionClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={openEditDrawer}>Edit</MenuItem>
          <MenuItem onClick={() => setDeleteModal(true)}>Delete</MenuItem>
          <MenuItem onClick={handleActionExportClick}>
            Export Task
            <Menu
              open={openActionExport}
              anchorEl={actionExportPop}
              onClose={handleActionExportClose}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={csvExportHandler}>CSV</MenuItem>
              <MenuItem onClick={excelExportHandler}>Excel</MenuItem>
            </Menu>
          </MenuItem>
        </Menu>
        <Button
          variant="contained"
          onClick={openAddDrawer}
          startIcon={<CirclePlusIcon />}
        >
          Add New Task
        </Button>
      </Grid>
      <AlertModals
        type={ALERT_MODALS_TYPE?.DELETE}
        message="Are you sure you want to delete this task?"
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        handleSubmitBtn={submitDeleteModel}
        loading={isLoading}
      />
    </Grid>
  );
};
