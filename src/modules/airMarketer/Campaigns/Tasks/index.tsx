import { Box, Button, ButtonGroup, Menu, MenuItem, Stack } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';

import { columns } from './Tasks.data';
import useTasks from './useTasks';
import EditTask from './EditTask';

import { tableData } from '@/mock/modules/airMarketer/Campaigns/Tasks';

import {
  AlertModalDeleteIcon,
  ArrowDownDarkIcon,
  DownIcon,
  GridViewIcon,
  ListViewIcon,
} from '@/assets/icons';
import Search from '@/components/Search';

import TaskViewCard from './TaskCardView';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_CAMPAIGNS_PERMISSIONS } from '@/constants/permission-keys';

const Tasks = () => {
  const {
    anchorEl,
    theme,
    actionMenuOpen,
    handleActionsMenuClose,
    handleActionsMenuClick,
    isOpenEditTaskDrawer,
    setIsOpenEditTaskDrawer,
    isOpenDeleteDrawer,
    handleDeleteModal,
    setIsOpenDeleteDrawer,
    // setTaskCreate,
    handleChangeStatus,
    isOpenChangeStatus,
    setIsOpenChangeStatus,
    handleListViewClick,
    isListView,
    searchValue,
    setSearchValue,
  } = useTasks();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ md: 'row', xs: 'column' }}
        flexWrap="wrap"
        gap={1}
        mb={2}
      >
        <PermissionsGuard
          permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.TASK_SEARCH_FILTER]}
        >
          <Search
            label="Search Here"
            size="small"
            searchBy={searchValue}
            setSearchBy={setSearchValue}
          />
        </PermissionsGuard>

        <Stack
          display={{ md: 'flex' }}
          direction={{ sm: 'row' }}
          flexWrap="wrap"
          gap={1}
        >
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
                width: { sm: '112px', xs: '100%' },
                height: '36px',
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
              <PermissionsGuard
                permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.EDIT_TASK]}
              >
                <MenuItem
                  onClick={() =>
                    setIsOpenEditTaskDrawer({ isToggle: true, type: 'edit' })
                  }
                >
                  Edit
                </MenuItem>
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.CHANGE_STATUS,
                ]}
              >
                <MenuItem onClick={handleChangeStatus}>Change Status</MenuItem>
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.DELETE]}
              >
                <MenuItem onClick={handleDeleteModal}>Delete</MenuItem>
              </PermissionsGuard>
            </Menu>
          </Box>
          <PermissionsGuard
            permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.CREATE_TASK]}
          >
            <Button
              onClick={() => {
                setIsOpenEditTaskDrawer({ isToggle: true, type: 'create' });
                // setTaskCreate('Create Task');
              }}
              startIcon={<ArrowDownDarkIcon />}
              className="small"
              sx={{
                border: `1px solid ${theme?.palette?.custom?.dark}`,
                color: theme?.palette?.custom?.main,
                width: { sm: '130px', xs: '100%' },
                height: '36px',
              }}
            >
              Create Task
            </Button>
          </PermissionsGuard>
          <ButtonGroup
            variant="outlined"
            color="inherit"
            aria-label="outlined button group"
          >
            <PermissionsGuard
              permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.LIST_VIEW]}
            >
              <Button
                className="small"
                onClick={() => handleListViewClick('listView')}
              >
                <ListViewIcon />
              </Button>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.BOARD_VIEW]}
            >
              <Button
                onClick={() => handleListViewClick('gridView')}
                className="small"
              >
                <GridViewIcon />
              </Button>
            </PermissionsGuard>
          </ButtonGroup>
        </Stack>
      </Box>
      {isListView === 'listView' ? (
        <TanstackTable columns={columns} data={tableData} isPagination />
      ) : (
        <TaskViewCard />
      )}

      {isOpenEditTaskDrawer?.isToggle && (
        <EditTask
          isOpenDrawer={isOpenEditTaskDrawer?.isToggle}
          isType={isOpenEditTaskDrawer?.type}
          setIsOpenEditTaskDrawer={setIsOpenEditTaskDrawer}
          onClose={() => {
            setIsOpenEditTaskDrawer({ isToggle: false, type: '' });
          }}
        />
      )}
      {isOpenDeleteDrawer && (
        <AlertModals
          message="You're about to delete a record. Are you sure?"
          type="Delete"
          typeImage={<AlertModalDeleteIcon />}
          open={isOpenDeleteDrawer}
          handleClose={() => setIsOpenDeleteDrawer(false)}
          handleSubmit={() => setIsOpenDeleteDrawer(false)}
        />
      )}
      {isOpenChangeStatus && (
        <AlertModals
          message={
            <>
              <Stack
                justifyContent={'center'}
                display="flex"
                direction="row"
                gap={2}
              >
                <Button variant="contained">Inprogress</Button>
                <Button variant="outlined" color="inherit">
                  Pending
                </Button>
                <Button variant="outlined" color="inherit">
                  Completed
                </Button>
              </Stack>
            </>
          }
          type="Change Status"
          open={isOpenChangeStatus}
          handleClose={() => setIsOpenChangeStatus(false)}
          footer={false}
        />
      )}
    </>
  );
};

export default Tasks;
