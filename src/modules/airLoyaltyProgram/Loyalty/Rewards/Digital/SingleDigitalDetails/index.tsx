import { Box } from '@mui/material';
import {
  singleDigitalDetailsColumns,
  singleDigitalDetailsData,
} from './SingleDigitalDetails.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useState } from 'react';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useRouter } from 'next/router';
import { AIR_LOYALTY_PROGRAM } from '@/constants';

export const SingleDigitalDetails = () => {
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
            data={singleDigitalDetailsData}
            columns={singleDigitalDetailsColumns}
            isPagination={true}
          />
        </Box>
      </Box>
    </>
  );
};
