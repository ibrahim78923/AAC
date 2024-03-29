import TanstackTable from '@/components/Table/TanstackTable';
import { UserHeader } from './UserHeader';
import { Box } from '@mui/material';
import { useUser } from './useUser';
import UpsertUser from './UpsertUser';
import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const User = () => {
  const {
    selectedUserList,
    setSelectedUserList,
    userListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    usersData,
    setSearch,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    metaData,
    methods,
    handleSubmit,
    submit,
  } = useUser();
  return (
    <Box>
      <UserHeader
        selectedUserList={selectedUserList}
        setSelectedUserList={setSelectedUserList}
        setSearch={setSearch}
        methods={methods}
      />
      <Box mt={'0.75rem'}>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.USER_LIST,
          ]}
        >
          <TanstackTable
            data={usersData}
            columns={userListColumn}
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
            pageLimit={metaData?.limit}
          />
        </PermissionsGuard>
        <UpsertUser
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          title={'User View'}
          okText={'Save'}
          methods={methods}
          handleSubmit={handleSubmit}
          submit={submit}
        />
      </Box>
    </Box>
  );
};
