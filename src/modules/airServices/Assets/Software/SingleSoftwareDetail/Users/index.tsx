import React, { useState } from 'react';
import UsersTable from './UsersTable';
import { Box, Button, Divider } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import { UsersAdd } from './UsersAdd';
import { UsersFilter } from './UsersFilter';
import { userDropdown } from './Users.data';
import Search from '@/components/Search';
import { enqueueSnackbar } from 'notistack';
import ConversationModel from '@/components/Model/CoversationModel';
import UserAllocate from './UsersAllocate';
import UserDeallocate from './UsersDeallocate';
import UserRemove from './UsersRemove';
import { ExportButton } from '@/components/ExportButton';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';

export const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedActionTitle, setSelectedActionTitle] = useState(null);

  const userActionClickHandler = (title: string) => {
    setSelectedActionTitle(title);
    setActionModalOpen(true);
  };

  const userActionDropdownCloseHandler = () => {
    setActionModalOpen(false);
  };

  const excelExportHandler = () => {
    enqueueSnackbar('Excel File Download Successfully', {
      variant: 'success',
    });
  };

  const csvExportHandler = () => {
    enqueueSnackbar('CSV File Download Successfully', {
      variant: 'success',
    });
  };
  const actionClickHandler = (selectedActionTitle) => {
    switch (selectedActionTitle) {
      case 'Allocate':
        enqueueSnackbar('Contract Allocated Successfully', {
          variant: 'success',
        });
        break;
      case 'Deallocate':
        enqueueSnackbar('Contract Deallocated Successfullyy', {
          variant: 'success',
        });
        break;
      case 'Remove':
        enqueueSnackbar('User Removed Successfully', {
          variant: 'success',
        });
        break;
      default:
        '';
    }

    userActionDropdownCloseHandler();
  };

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box>
          <Search label="Search" searchBy="" setSearchBy="" />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <SingleDropdownButton
            dropdownOptions={userDropdown(
              setActionModalOpen,
              userActionClickHandler,
            )}
            disabled={usersData?.length === 0}
          />

          <UsersAdd />
          <ExportButton
            handleCsvExport={csvExportHandler}
            handleExcelExport={excelExportHandler}
          />
          <UsersFilter />
        </Box>
      </Box>
      {actionModalOpen && (
        <ConversationModel
          handleClose={userActionDropdownCloseHandler}
          open={actionModalOpen}
          selectedItem={
            selectedActionTitle === 'Allocate'
              ? 'Add Device'
              : selectedActionTitle === 'Deallocate'
              ? 'Deallocate Contract'
              : selectedActionTitle === 'Remove'
              ? 'Remove Contract'
              : 'Add Device'
          }
        >
          {selectedActionTitle === 'Allocate' && <UserAllocate />}
          {selectedActionTitle === 'Deallocate' && <UserDeallocate />}
          {selectedActionTitle === 'Remove' && <UserRemove />}
          {selectedActionTitle === 'Allocate' && (
            <Box sx={{ mt: 2 }}>
              <Divider />
            </Box>
          )}
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
            gap={2}
            marginTop={2}
          >
            <Button onClick={userActionDropdownCloseHandler} variant="outlined">
              No
            </Button>
            <Button
              variant="contained"
              onClick={() => actionClickHandler(selectedActionTitle)}
            >
              Yes
            </Button>
          </Box>
        </ConversationModel>
      )}

      <br />
      <UsersTable usersData={usersData} setUsersData={setUsersData} />
      <br />
      <CustomPagination
        count={1}
        rowsPerPageOptions={[1, 2]}
        entriePages={10}
      />
    </>
  );
};
