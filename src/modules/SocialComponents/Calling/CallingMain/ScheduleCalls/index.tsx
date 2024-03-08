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
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_CALLING_PERMISSIONS } from '@/constants/permission-keys';

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

  const {
    Calls,
    setPage,
    setPageLimit,
    isLoading,
    handleCheckboxChange,
    selectedCheckboxes,
    deleteCallsHandler,
    setSelectedCheckboxes,
  } = useScheduleCalls({ callingSearch, setIsDeleteModalOpen });
  const getColumns = columns({ handleCheckboxChange, selectedCheckboxes });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '10px',
          justifyContent: 'space-between',
          px: '24px',
          pb: '10px',
        }}
      >
        <PermissionsGuard
          permissions={[SOCIAL_COMPONENTS_CALLING_PERMISSIONS?.SEARCH_RECORD]}
        >
          <Search
            label={'Search here'}
            searchBy={callingSearch}
            setSearchBy={setCallingSearch}
          />
        </PermissionsGuard>
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
          disabled={selectedCheckboxes?.length === 0}
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
          <PermissionsGuard
            permissions={[SOCIAL_COMPONENTS_CALLING_PERMISSIONS?.EDIT_CALL]}
          >
            <MenuItem
              onClick={() => {
                setOpenDrawer('Edit'), handleCloseAction;
              }}
              disabled={selectedCheckboxes?.length > 1}
            >
              Edit
            </MenuItem>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              SOCIAL_COMPONENTS_CALLING_PERMISSIONS?.RESCHEDULE_CALL,
            ]}
          >
            <MenuItem
              onClick={() => {
                setOpenDrawer('Reschedule'), handleCloseAction;
              }}
              disabled={selectedCheckboxes?.length > 1}
            >
              Reschedule
            </MenuItem>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[SOCIAL_COMPONENTS_CALLING_PERMISSIONS?.DELETE_CALL]}
          >
            <MenuItem
              onClick={() => {
                setIsDeleteModalOpen(true), handleCloseAction;
              }}
            >
              Delete
            </MenuItem>
          </PermissionsGuard>
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
      {openDrawer && (
        <ScheduleEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          selectedCheckboxes={selectedCheckboxes}
          setSelectedCheckboxes={setSelectedCheckboxes}
        />
      )}
      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleSubmitBtn={deleteCallsHandler}
      />
    </>
  );
};

export default ScheduleCalls;
