import { Box } from '@mui/material';
import React from 'react';

import Search from '@/components/Search';

import TanstackTable from '@/components/Table/TanstackTable';
import { callsInConversationData } from './callsinConversation.data';
import { useCallsInConversation } from './useCallsInConversation';

const callsInConversation = () => {
  const {
    setSearchTerm,

    getColumns,
    page,
    setPage,
    pageLimit,
    setPageLimit,
  } = useCallsInConversation();

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        mb={4}
      >
        <Search label="Search Here" setSearchBy={setSearchTerm} />
      </Box>
      <TanstackTable
        columns={getColumns}
        data={callsInConversationData}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
        // isLoading={isLoading}
        currentPage={page}
        // count={Calls?.meta?.total}
        pageLimit={pageLimit}
        // totalRecords={Calls?.meta?.total}
        // isSuccess={true}
        // onPageChange={(page: any) => setPage(page)}
      />
    </>
  );
};

export default callsInConversation;
