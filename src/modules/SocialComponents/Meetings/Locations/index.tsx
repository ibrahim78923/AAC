import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import { Box } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { useLocations } from './useLocations';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const Locations = () => {
  const {
    locationsListColumns,
    lazyGetCommonMeetingsLocationsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    renderPortalComponent,
    isPortalOpen,
    setIsPortalOpen,
  } = useLocations();
  return (
    <>
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid`}
        borderColor="custom.off_white_three"
      >
        <br />
        <Box px={2}>
          <PageTitledHeader
            title={'Meeting Locations'}
            addTitle={'Add Location'}
            createPermissionKey={[
              SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING,
            ]}
            handleAction={() =>
              setIsPortalOpen({
                isOpen: true,
                isUpsert: true,

                type: GENERIC_UPSERT_FORM_CONSTANT?.ADD,
              })
            }
            hasStartIcon={false}
          />
          <Box>
            <Search label="Search Here" setSearchBy={setSearch} />
          </Box>
        </Box>
        <br />
        <TanstackTable
          columns={locationsListColumns}
          data={
            lazyGetCommonMeetingsLocationsListStatus?.data?.data
              ?.meetinglocations ?? []
          }
          isLoading={lazyGetCommonMeetingsLocationsListStatus?.isLoading}
          currentPage={
            lazyGetCommonMeetingsLocationsListStatus?.data?.data?.meta?.page
          }
          count={
            lazyGetCommonMeetingsLocationsListStatus?.data?.data?.meta?.pages
          }
          pageLimit={
            lazyGetCommonMeetingsLocationsListStatus?.data?.data?.meta?.limit
          }
          totalRecords={
            lazyGetCommonMeetingsLocationsListStatus?.data?.data?.meta?.total
          }
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetCommonMeetingsLocationsListStatus?.isFetching}
          isError={lazyGetCommonMeetingsLocationsListStatus?.isError}
          isSuccess={lazyGetCommonMeetingsLocationsListStatus?.isSuccess}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </Box>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
