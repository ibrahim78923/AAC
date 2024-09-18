import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { useUser } from './useUser';
import TanstackTable from '@/components/Table/TanstackTable';
import { AddWhiteBgIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';

export const User = () => {
  const {
    userListColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetProductUserListForOperationStatus,
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
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.SEARCH_RECORD,
          ]}
        >
          <Box>
            <Search label="Search Here" setSearchBy={setSearch} />
          </Box>
        </PermissionsGuard>
        <Box display={'flex'} gap={2} alignItems={'center'} flexWrap={'wrap'}>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.DELETE_USER,
              AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.EDIT_USER,
              AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.VIEW_USER_DETAIL,
            ]}
          >
            <SingleDropdownButton
              dropdownOptions={actionButtonDropdown}
              disabled={!!!selectedUserList?.length}
            />
          </PermissionsGuard>
          <Button
            className="small"
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            onClick={() => {
              setSelectedUserList?.([]);
              setIsPortalOpen?.({
                isOpen: true,
                isUpsert: true,
                isAdd: true,
              });
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>
      <br />
      <TanstackTable
        columns={userListColumns}
        data={
          lazyGetProductUserListForOperationStatus?.data?.data
            ?.usercompanyaccounts
        }
        isLoading={lazyGetProductUserListForOperationStatus?.isLoading}
        currentPage={
          lazyGetProductUserListForOperationStatus?.data?.data?.meta?.page
        }
        count={
          lazyGetProductUserListForOperationStatus?.data?.data?.meta?.pages
        }
        pageLimit={
          lazyGetProductUserListForOperationStatus?.data?.data?.meta?.limit
        }
        totalRecords={
          lazyGetProductUserListForOperationStatus?.data?.data?.meta?.total
        }
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={lazyGetProductUserListForOperationStatus?.isFetching}
        isError={lazyGetProductUserListForOperationStatus?.isError}
        isSuccess={lazyGetProductUserListForOperationStatus?.isSuccess}
        onPageChange={(page: number) => setPage(page)}
        isPagination
      />
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
