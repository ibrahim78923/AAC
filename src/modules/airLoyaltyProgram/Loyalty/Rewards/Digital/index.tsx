import { Box } from '@mui/material';
import { UserList, digitalTableData } from './Digital.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const Digital = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { push } = useRouter();
  return (
    <Box>
      <Search
        label="Search Here"
        width={'16.25rem'}
        searchBy={searchValue}
        setSearchBy={setSearchValue}
      />
      <Box mt={'0.75rem'}>
        <TanstackTable
          data={digitalTableData}
          columns={UserList?.(push)}
          isPagination={true}
        />
      </Box>
    </Box>
  );
};
