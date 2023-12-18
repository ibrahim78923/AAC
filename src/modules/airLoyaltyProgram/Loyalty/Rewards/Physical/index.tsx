import { Box } from '@mui/material';
import { UserList, physicalTableData } from './Physical.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const Physical = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { push } = useRouter();
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
          data={physicalTableData}
          columns={UserList(push)}
          isPagination={true}
        />
      </Box>
    </Box>
  );
};
