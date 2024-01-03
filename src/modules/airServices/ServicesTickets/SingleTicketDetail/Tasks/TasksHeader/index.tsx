import { Button, Grid, MenuItem, Popover, Typography } from '@mui/material';
import { ActionButtonIcon, CirclePlusIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import { useTasksHeader } from './useTasksHeader';

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
        <Popover
          open={openAction}
          anchorEl={actionPop}
          onClose={handleActionClose}
          sx={{ mt: '8px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={openEditDrawer}>Edit</MenuItem>
          <MenuItem onClick={() => setDeleteModal(true)}>Delete</MenuItem>
          <MenuItem>
            <a onClick={handleActionExportClick}>Export Task</a>
            <Popover
              open={openActionExport}
              anchorEl={actionExportPop}
              onClose={handleActionExportClose}
              sx={{ ml: '-12px' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => {}}>CSV</MenuItem>
              <MenuItem onClick={() => {}}>Excel</MenuItem>
            </Popover>
          </MenuItem>
        </Popover>
        <Button
          variant="contained"
          onClick={openAddDrawer}
          startIcon={<CirclePlusIcon />}
        >
          Add New Task
        </Button>
      </Grid>
      <AlertModals
        type="delete"
        message="Are you sure you want to delete this task?"
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        handleSubmit={submitDeleteModel}
      />
    </Grid>
  );
};
