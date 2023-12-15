import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useState } from 'react';
import {
  singlePhysicalDetailsColumns,
  singlePhysicalDetailsData,
} from './SinglePhysicalDetails.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { useRouter } from 'next/router';

export const SinglePhysicalDetails = () => {
  const { push } = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <>
      <PageTitledHeader
        title="Rewards"
        addTitle="Add"
        canMovedBack
        moveBack={() => {
          push(AIR_LOYALTY_PROGRAM?.REWARDS);
        }}
      />
      <Box>
        <Search
          label="Search Here"
          width={'16.25rem'}
          searchBy={searchValue}
          setSearchBy={setSearchValue}
        />
        <Box mt={'0.75rem'}>
          <TanstackTable
            data={singlePhysicalDetailsData}
            columns={singlePhysicalDetailsColumns}
            isPagination={true}
          />
        </Box>
      </Box>
    </>
  );
};
