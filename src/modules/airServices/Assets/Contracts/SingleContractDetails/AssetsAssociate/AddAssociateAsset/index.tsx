import { Box, Button, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { useAddAssociateAsset } from './useAddAssociateAsset';
import { LoadingButton } from '@mui/lab';

export const AddAssociateAsset = () => {
  const {
    handleAllocateClick,
    handleCancelBtn,
    tableColumns,
    theme,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    searchBy,
    setSearchBy,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    meta,
    assetsListData,
    postLoading,
    disableAllocate,
  } = useAddAssociateAsset();
  return (
    <>
      <Typography variant="h3">Associated Assets</Typography>
      <br />
      <Box
        border={`0.063rem solid ${theme?.palette?.custom?.off_white_three}`}
        borderRadius={2}
      >
        <Box p={'0.75rem 1.5rem'}>
          <Search
            placeholder="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
          />
        </Box>
        <TanstackTable
          data={assetsListData}
          columns={tableColumns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          isPagination
          count={meta?.pages}
          pageLimit={pageLimit}
          currentPage={page}
          totalRecords={meta?.total}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </Box>
      <br />
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'flex-end'}
        gap={1}
      >
        <Button variant="outlined" color="secondary" onClick={handleCancelBtn}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          disabled={disableAllocate}
          onClick={handleAllocateClick}
          loading={postLoading}
        >
          Allocate
        </LoadingButton>
      </Box>
    </>
  );
};
