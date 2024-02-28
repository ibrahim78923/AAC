import { Box, Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { styles } from './Users.styles';
import useUsers from './useUsers';
import Search from '@/components/Search';
import { DownIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns, usersMockData } from './Users.data';
import EditUser from './EditUser';

const Users = () => {
  const {
    anchorEl,
    actionMenuOpen,
    handleActionsClick,
    handleClose,
    searchValue,
    setSearchValue,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    openDrawerEditUser,
    methodsEditUser,
    handleOpenDrawerEditUser,
    handleCloseDrawerEditUser,
    handleEditUserSubmit,
  } = useUsers();

  const getColumns = columns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  return (
    <>
      <Box>
        <Box sx={styles?.filterBar}>
          <Box sx={styles?.search}>
            <Search
              setSearchBy={setSearchValue}
              value={searchValue}
              label="Search Here"
              size="small"
              width={'100%'}
            />
          </Box>
          <Box sx={styles?.filterButtons}>
            <Button
              onClick={handleActionsClick}
              sx={styles?.actionBtn}
              className="small"
              disabled={isActionsDisabled}
            >
              Actions &nbsp; <DownIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={actionMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                style: {
                  width: '112px',
                },
              }}
            >
              <MenuItem onClick={handleOpenDrawerEditUser}>Edit</MenuItem>
            </Menu>
          </Box>
        </Box>

        <TanstackTable
          columns={getColumns}
          data={usersMockData}
          // isLoading={loadingJobPosting}
          isPagination
          // count={jopPostingData?.data?.meta?.pages}
          // totalRecords={jopPostingData?.data?.meta?.total}
          onPageChange={handlePageChange}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </Box>

      <EditUser
        isDrawerOpen={openDrawerEditUser}
        onClose={handleCloseDrawerEditUser}
        formMethods={methodsEditUser}
        handleSubmit={handleEditUserSubmit}
        // isLoading={loadingAddFaq}
      />
    </>
  );
};

export default Users;
