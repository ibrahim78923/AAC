import { useState } from 'react';
import UsersTable from './UsersTable';
import { Box } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import { UsersAdd } from './UsersAdd';
import { UsersFilter } from './UsersFilter';
import { userDropdown } from './Users.data';
import Search from '@/components/Search';
import { ExportButton } from '@/modules/airServices/common/Buttons/ExportButton';
import { SingleDropdownButton } from '@/modules/airServices/common/Buttons/SingleDropdownButton';

export const Users = () => {
  const [usersData, setUsersData] = useState([]);

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
            dropdownOptions={userDropdown}
            disabled={usersData?.length === 0}
          />
          <UsersAdd onClick={handleAddModalOpen} />
          <ExportButton />
          <UsersFilter />
        </Box>
      </Box>
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
