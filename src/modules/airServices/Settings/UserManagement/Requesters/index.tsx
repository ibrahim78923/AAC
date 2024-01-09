import { Box, Typography } from '@mui/material';
import { RequestersHeader } from './RequestersHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { ArrowBackIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { useRequesters } from './useRequesters';

export const Requesters = () => {
  const {
    selectedRequestersList,
    setSelectedRequestersList,
    requestersListColumn,
    router,
    tableListData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    metaData,
    pageLimit,
  } = useRequesters();
  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={2}>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            router?.push({ pathname: AIR_SERVICES?.USER_MANAGEMENT })
          }
        >
          <ArrowBackIcon />
        </Box>
        <Box mb={1}>
          <Typography variant="h3">Requesters</Typography>
        </Box>
      </Box>
      <Box mt={2}>
        <RequestersHeader
          selectedRequestersList={selectedRequestersList}
          setSelectedRequestersList={setSelectedRequestersList}
        />
        <Box mt={3} mb={1}>
          <TanstackTable
            data={tableListData}
            columns={requestersListColumn}
            isPagination={true}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            isSuccess={isSuccess}
            setPageLimit={setPageLimit}
            setPage={setPage}
            count={metaData?.pages}
            totalRecords={metaData?.total}
            onPageChange={(page: any) => setPage(page)}
            currentPage={metaData?.page}
            pageLimit={pageLimit}
          />
        </Box>
      </Box>
    </>
  );
};
