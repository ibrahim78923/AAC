import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { FilterIcon, RestoreIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useReportLists } from './useReportLists';
import { data } from './ReportLists.data';

export const ReportLists = (props: any) => {
  const { onRestoreClick } = props;
  const {
    userListColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetProductUserListForLoyaltyStatus,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    actionButtonDropdown,
    setSelectedReportLists,
    selectedReportLists,
  }: any = useReportLists(props);
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
        flexWrap={'wrap'}
      >
        <Box>
          <Search label="Search Here" setSearchBy={setSearch} />
        </Box>
        <Box display={'flex'} gap={2}>
          <SingleDropdownButton
            dropdownOptions={actionButtonDropdown}
            disabled={!!!selectedReportLists?.length}
          />
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<RestoreIcon />}
            onClick={() => onRestoreClick?.()}
          >
            Restore
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterIcon />}
            onClick={() => {
              setSelectedReportLists?.([]);
              setIsPortalOpen?.({
                isOpen: true,
                isFilter: true,
              });
            }}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <br />
      <TanstackTable
        columns={userListColumns}
        // data={lazyGetProductUserListForLoyaltyStatus?.data?.list}
        data={data}
        isLoading={lazyGetProductUserListForLoyaltyStatus?.isLoading}
        currentPage={
          lazyGetProductUserListForLoyaltyStatus?.data?.data?.meta?.page
        }
        count={lazyGetProductUserListForLoyaltyStatus?.data?.data?.meta?.pages}
        pageLimit={
          lazyGetProductUserListForLoyaltyStatus?.data?.data?.meta?.limit
        }
        totalRecords={
          lazyGetProductUserListForLoyaltyStatus?.data?.data?.meta?.total
        }
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={lazyGetProductUserListForLoyaltyStatus?.isFetching}
        isError={lazyGetProductUserListForLoyaltyStatus?.isError}
        // isSuccess={lazyGetProductUserListForLoyaltyStatus?.isSuccess}
        isSuccess
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
