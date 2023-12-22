import React from 'react';

import { Box, Button, Menu, MenuItem } from '@mui/material';

import Search from '@/components/Search';

import { DownIcon } from '@/assets/icons';

import TanstackTable from '@/components/Table/TanstackTable';

import { columns } from './Schedule.data';
import useCallingMain from '../useCallingMain';
import ScheduleEditorDrawer from '../ScheduleCallDrawer';
import { AlertModals } from '@/components/AlertModals';
import useScheduleCalls from './useScheduleCalls';

const ScheduleCalls = () => {
  const {
    callingSearch,
    setCallingSearch,
    openDrawer,
    setOpenDrawer,
    anchorElAction,
    actionMenuOpenAction,
    handleClickAction,
    handleCloseAction,
    setIsDeleteModalOpen,
    isDeleteModalOpen,
  } = useCallingMain();

  const getColumns = columns();

  const { Calls, setPage, setPageLimit, isLoading } = useScheduleCalls();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '24px',
          pb: '10px',
        }}
      >
        <Search
          label={'Search here'}
          searchBy={callingSearch}
          setSearchBy={setCallingSearch}
          size="small"
        />

        <Button
          id="basic-button"
          aria-controls={actionMenuOpenAction ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={actionMenuOpenAction ? 'true' : undefined}
          onClick={handleClickAction}
          variant="outlined"
          color="inherit"
          sx={{
            '@media(max-width: 500px)': {
              width: '100%',
            },
          }}
        >
          Actions &nbsp; <DownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorElAction}
          open={actionMenuOpenAction}
          onClose={handleCloseAction}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => {
              setOpenDrawer('Edit'), handleCloseAction;
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsDeleteModalOpen(true), handleCloseAction;
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>

      <TanstackTable
        columns={getColumns}
        data={Calls?.schedulecalls}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
        isLoading={isLoading}
        currentPage={Calls?.meta?.pages}
        count={Calls?.meta?.total}
        pageLimit={Calls?.meta?.limit}
        totalRecords={Calls?.meta?.total}
        isSuccess={true}
        onPageChange={(page: any) => setPage(page)}
      />
      <ScheduleEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleSubmit={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default ScheduleCalls;
