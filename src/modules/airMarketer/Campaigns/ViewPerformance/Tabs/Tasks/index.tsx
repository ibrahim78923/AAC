import { Box, Button, Menu, MenuItem } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';

import { columns } from './Tasks.data';
import useTasks from './useTasks';
import EditTask from './EditTask';

import { AlertModalDeleteIcon, DownIcon } from '@/assets/icons';
import { tableData } from '@/mock/modules/airMarketer/Campaigns/Tasks';

const Tasks = () => {
  const {
    anchorEl,
    theme,
    actionMenuOpen,
    handleActionsMenuClose,
    handleActionsMenuClick,
    isOpenEditTaskDrawer,
    setIsOpenEditTaskDrawer,
    handleTaskDrawer,
    isOpenDeleteDrawer,
    handleDeleteModal,
    setIsOpenDeleteDrawer,
  } = useTasks();
  return (
    <>
      <Box>
        <Button
          id="basic-button"
          aria-controls={'basic-menu'}
          aria-haspopup="true"
          aria-expanded={'true'}
          className="small"
          variant="outlined"
          color="inherit"
          onClick={handleActionsMenuClick}
          sx={{
            color: theme?.palette?.grey[500],

            //
            border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
            '@media (max-width:581px)': {
              width: '100%',
            },
          }}
        >
          Actions &nbsp; <DownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={actionMenuOpen}
          onClose={handleActionsMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleTaskDrawer}>Edit</MenuItem>

          <MenuItem onClick={handleDeleteModal}>Delete</MenuItem>
        </Menu>
      </Box>
      <TanstackTable columns={columns} data={tableData} isPagination />

      {isOpenEditTaskDrawer && (
        <EditTask
          isOpenDrawer={isOpenEditTaskDrawer}
          onClose={() => setIsOpenEditTaskDrawer(false)}
        />
      )}
      {isOpenDeleteDrawer && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete"
          typeImage={<AlertModalDeleteIcon />}
          open={isOpenDeleteDrawer}
          handleClose={() => setIsOpenDeleteDrawer(false)}
          handleSubmit={() => setIsOpenDeleteDrawer(false)}
        />
      )}
    </>
  );
};

export default Tasks;
