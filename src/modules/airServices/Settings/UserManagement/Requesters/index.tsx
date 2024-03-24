import { Box } from '@mui/material';
import { RequestersHeader } from './RequestersHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_SERVICES } from '@/constants';
import { useRequesters } from './useRequesters';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ConvertToAgent } from './ConvertToAgent';
import { DeleteRequester } from './DeleteRequester';
import UpsertRequesters from './UpsertRequesters';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const Requesters = () => {
  const {
    selectedRequestersList,
    setSelectedRequestersList,
    requestersListColumn,
    router,
    setPageLimit,
    setPage,
    lazyGetRequestersStatus,
    requestersDropdownOptions,
    deleteModalOpen,
    setDeleteModalOpen,
    isAgentConvert,
    setIsAgentConvert,
    isDrawerOpen,
    setSearch,
    setIsDrawerOpen,
    getRequestersListData,
    page,
  } = useRequesters();

  return (
    <>
      <PageTitledHeader
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.USER_MANAGEMENT,
          })
        }
        canMovedBack
        title={'Requesters'}
      />
      <Box mt={2}>
        <RequestersHeader
          selectedRequestersList={selectedRequestersList}
          setSelectedRequestersList={setSelectedRequestersList}
          requestersDropdownOptions={requestersDropdownOptions}
          setSearch={setSearch}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <Box mt={3}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.VIEW_REQUESTERS_LIST,
            ]}
          >
            <TanstackTable
              data={lazyGetRequestersStatus?.data?.data?.users}
              columns={requestersListColumn}
              isPagination
              isLoading={lazyGetRequestersStatus?.isLoading}
              isError={lazyGetRequestersStatus?.isError}
              isFetching={lazyGetRequestersStatus?.isFetching}
              isSuccess={lazyGetRequestersStatus?.isSuccess}
              setPageLimit={setPageLimit}
              setPage={setPage}
              count={lazyGetRequestersStatus?.data?.data?.meta?.pages}
              totalRecords={lazyGetRequestersStatus?.data?.data?.meta?.total}
              onPageChange={(page: any) => setPage(page)}
              currentPage={lazyGetRequestersStatus?.data?.data?.meta?.page}
              pageLimit={lazyGetRequestersStatus?.data?.data?.meta?.limit}
            />
          </PermissionsGuard>
        </Box>
      </Box>

      {isDrawerOpen && (
        <UpsertRequesters
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      )}

      {deleteModalOpen && (
        <DeleteRequester
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          selectedRequesterList={selectedRequestersList}
          setSelectedRequesterList={setSelectedRequestersList}
          setPage={setPage}
          page={page}
          getRequestersListData={getRequestersListData}
          totalRecords={lazyGetRequestersStatus?.data?.data?.users?.length}
        />
      )}

      {isAgentConvert && (
        <ConvertToAgent
          isAgentConvert={isAgentConvert}
          setIsAgentConvert={setIsAgentConvert}
          selectedRequesterList={selectedRequestersList}
          setSelectedRequesterList={setSelectedRequestersList}
          setPage={setPage}
          page={page}
          getRequestersListData={getRequestersListData}
          totalRecords={lazyGetRequestersStatus?.data?.data?.users?.length}
        />
      )}
    </>
  );
};
