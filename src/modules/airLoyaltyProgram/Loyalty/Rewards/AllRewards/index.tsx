import { Box } from '@mui/material';
import { UserList, allTableData } from './All.rewards.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useState } from 'react';

export const AllRewards = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <Box>
      <Search
        label="Search Here"
        width={'16.25rem'}
        setSearchBy={setSearchValue}
        searchBy={searchValue}
      />
      <Box mt={'0.75rem'}>
        <TanstackTable
          data={allTableData}
          columns={UserList()}
          isPagination={true}
        />
      </Box>
    </Box>
  );
};
