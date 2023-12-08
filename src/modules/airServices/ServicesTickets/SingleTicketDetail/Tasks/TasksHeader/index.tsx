import { Button, Grid, MenuItem, Popover, Typography } from '@mui/material';
import { ActionButtonIcon, CirclePlusIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import { styles } from './TasksHeader.styles';
import { useTasksHeader } from './useTasksHeader';
import { TasksHeaderI } from './TasksHeader.interface';

export const TasksHeader = ({
  setIsAddDrawerOpen,
  setIsEditDrawerOpen,
  activeCheck,
}: TasksHeaderI) => {
  const {
    actionPop,
    setActionPop,
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
    theme,
  } = useTasksHeader();
  return (
    <Grid container spacing={{ sm: 0, xs: 2 }} sx={styles?.headContainer}>
      <Grid
        item
        sm={6}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-start', xs: 'center' },
        }}
      >
        <Typography variant="h5" sx={styles?.headText(theme)}>
          Task
        </Typography>
      </Grid>
      <Grid sm={6} xs={12} item sx={styles?.btnContainer}>
        <Button
          sx={styles?.actionBtn(theme)}
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
          <MenuItem
            onClick={() => {
              setIsEditDrawerOpen(true), setActionPop(null);
            }}
          >
            Edit
          </MenuItem>
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
          sx={styles?.addTaskBtn(theme)}
          onClick={() => setIsAddDrawerOpen(true)}
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
