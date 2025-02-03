import TanstackTable from '@/components/Table/TanstackTable';
import { useUsersList } from './useUsersLists';
import { SOFTWARE_USER_PORTAL_ACTIONS_TYPES } from '../Users.data';
import UsersRemove from '../UsersRemove';
import { UsersFilter } from '../UsersFilter';

export const UsersList = (props: any) => {
  const {
    page,
    setPage,
    isPortalOpen,
    setIsPortalOpen,
    usersData,
    setUsersData,
  } = props;
  const {
    userDetails,
    limit,
    setLimit,
    isFetching,
    isLoading,
    metaData,
    isError,
    isSuccess,
    handleGetUser,
    userListColumn,
    setFilterValues,
    filterValues,
  } = useUsersList(props);

  return (
    <>
      <TanstackTable
        columns={userListColumn}
        data={userDetails}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        isSuccess={isSuccess}
        currentPage={page}
        count={metaData?.pages}
        pageLimit={limit}
        totalRecords={metaData?.total}
        isPagination
        setPage={setPage}
        setPageLimit={setLimit}
        onPageChange={(page: number) => setPage(page)}
        errorProps={{ canRefresh: true, refresh: handleGetUser }}
      />
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action === SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.REMOVE && (
          <UsersRemove
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            setUsersData={setUsersData}
            usersData={usersData}
            page={page}
            setPage={setPage}
            handleGetUser={handleGetUser}
            totalRecords={userDetails?.length}
          />
        )}
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action === SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.FILTER && (
          <UsersFilter
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            setFilterValues={setFilterValues}
            filterValues={filterValues}
            setUsersData={setUsersData}
            usersData={usersData}
          />
        )}
    </>
  );
};
