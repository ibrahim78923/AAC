import { Box } from '@mui/material';
import React from 'react';

import Search from '@/components/Search';

import TanstackTable from '@/components/Table/TanstackTable';
import { callsInConversationData } from './callsinConversation.data';
import { useCallsInConversation } from './useCallsInConversation';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CALL_CENTER_CALL_METRICS_PERMISSION } from '@/constants/permission-keys';

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
      <PermissionsGuard
        permissions={[
          AIR_CALL_CENTER_CALL_METRICS_PERMISSION?.CALL_IN_CONVERSATION,
        ]}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          mb={4}
        >
          <PermissionsGuard
            permissions={[
              AIR_CALL_CENTER_CALL_METRICS_PERMISSION?.CALL_IN_CONVERSATION_SEARCH_AND_FILTER,
            ]}
          >
            <Search label="Search Here" setSearchBy={setSearchTerm} />
          </PermissionsGuard>
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
      </PermissionsGuard>
    </>
  );
};

export default callsInConversation;
