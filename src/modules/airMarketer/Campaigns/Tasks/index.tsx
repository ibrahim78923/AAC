import { Box, Button, Menu, MenuItem, Stack } from '@mui/material';

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
  FilterLinesIcon,
  FilterrIcon,
} from '@/assets/icons';
import Search from '@/components/Search';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';

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
    setTaskCreate,
    handleChangeStatus,
    isOpenChangeStatus,
    setIsOpenChangeStatus,
  } = useTasks();
  const router = useRouter();
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
        <Search label="Search Here" size="small" />

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
              <MenuItem onClick={handleTaskDrawer}>Edit</MenuItem>
              <MenuItem onClick={handleChangeStatus}>Change Status</MenuItem>
              <MenuItem onClick={handleDeleteModal}>Delete</MenuItem>
            </Menu>
          </Box>
          <Button
            onClick={() => {
              handleTaskDrawer(), setTaskCreate('Create Task');
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
          <Button
            onClick={() => router.push(`${AIR_MARKETER?.TASK_CARD}`)}
            variant="outlined"
            color="inherit"
            className="small"
          >
            <FilterLinesIcon />
          </Button>
          <Button variant="outlined" color="inherit" className="small">
            <FilterrIcon />
          </Button>
        </Stack>
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
                  Complete
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
