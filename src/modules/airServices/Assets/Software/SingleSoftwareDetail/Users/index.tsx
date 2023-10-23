import React, { useState } from 'react';
import UsersTable from './components/UsersTable';
import { Box } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import { UsersAdd } from './components/UsersAdd';
import { UsersFilter } from './components/UsersFilter';
import { userDropdown } from './Users.data';
import Search from '@/components/Search';
import { enqueueSnackbar } from 'notistack';
import { ExportButton } from '@/modules/airServices/common/Buttons/ExportButton';
import { SingleDropdownButton } from '@/modules/airServices/common/Buttons/SingleDropdownButton';
import ConversationModel from '@/components/Model/CoversationModel';

export const Users = () => {
  const [usersData, setUsersData] = useState([]);
  // const [userSelectOption, setUserSelectOption] = useState(null);
  const [actionModalOpen, setActionModalOpen] = useState(false);

  //   const userActionDropdownClickHandler = (option) => {
  //   console.log('userActionDropdownClickHandler called');
  //   setUserSelectOption(option.title);
  //   setActionModalOpen(true);
  //   console.log('click');
  // };

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
  const handleAddModalOpen = () => {};

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
            dropdownOptions={userDropdown(setActionModalOpen)}
            disabled={usersData?.length === 0}
          />
          <UsersAdd onClick={handleAddModalOpen} />
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
        >
          sadfggf
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
