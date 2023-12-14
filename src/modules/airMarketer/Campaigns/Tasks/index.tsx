import { Box, Button, Grid, Menu, MenuItem, Tooltip } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';

import { columns } from './Tasks.data';
import useTasks from './useTasks';
import EditTask from './EditTask';

import { tableData } from '@/mock/modules/airMarketer/Campaigns/Tasks';

import {
  AlertModalDeleteIcon,
  DownIcon,
  FilterrIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import Search from '@/components/Search';

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
      <Box sx={{ paddingTop: '10px' }}>
        <Grid container>
          <Grid item md={12} lg={5}>
            <Search label="Search Here" width="260px" />
          </Grid>

          <Grid
            item
            lg={7}
            md={12}
            sm={12}
            sx={{ display: { lg: 'flex' }, justifyContent: { lg: 'end' } }}
          >
            <Box sx={{ display: { lg: 'flex' }, marginTop: '8px' }}>
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
              <Button
                startIcon={<FilterrIcon />}
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '95px',
                  height: '36px',
                  marginLeft: '8px',
                }}
              >
                Filter
              </Button>
              <Tooltip title={'Refresh Filter'}>
                <Button
                  sx={{ marginLeft: '8px' }}
                  variant="outlined"
                  color="inherit"
                  className="small"
                >
                  <RefreshTasksIcon />
                </Button>
              </Tooltip>
              <Button
                startIcon={<FilterrIcon />}
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '130px',
                  height: '36px',
                  marginLeft: '8px',
                }}
              >
                See All Views
              </Button>
            </Box>
          </Grid>
        </Grid>
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
          type="Delete SMS Broadcast"
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
