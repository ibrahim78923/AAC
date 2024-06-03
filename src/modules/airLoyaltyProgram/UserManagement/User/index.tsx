import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { useUser } from './useUser';
import TanstackTable from '@/components/Table/TanstackTable';
import { AddWhiteBgIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';

export const User = () => {
  const {
    userListColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetProductUserListForLoyaltyStatus,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    setSelectedUserList,
    actionButtonDropdown,
    selectedUserList,
  } = useUser();
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
          <Button
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            onClick={() => {
              setSelectedUserList?.([]);
              setIsPortalOpen?.({ isOpen: true, isUpsert: true, isAdd: true });
            }}
          >
            Add
          </Button>
          <SingleDropdownButton
            dropdownOptions={actionButtonDropdown}
            disabled={!!!selectedUserList?.length}
          />
        </Box>
      </Box>
      <br />
      <TanstackTable
        columns={userListColumns}
        data={
          lazyGetProductUserListForLoyaltyStatus?.data?.data
            ?.usercompanyaccounts
        }
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
        isSuccess={lazyGetProductUserListForLoyaltyStatus?.isSuccess}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
