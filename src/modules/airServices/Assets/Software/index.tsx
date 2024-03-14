import { Box, Button } from '@mui/material';
import { columns } from './Software.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { FilterSharedIcon } from '@/assets/icons';
import { PageTitledHeader } from '../../../../components/PageTitledHeader/index';
import SoftwareFilter from './SoftwareFilter';
import { SoftwareAssignCategory } from './SoftwareAssignCategory';
import { UpsertSoftware } from './UpsertSoftware';
import { useSoftware } from './useSoftware';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

function Software() {
  const {
    router,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    assetsSoftwares,
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    softwareData,
    setSoftwareData,
    openAssignModal,
    setOpenAssignModal,
    searchValue,
    setSearchValue,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    handlePageChange,
    paginationData,
    setFilterValues,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    filterValues,
    methods,
    submitHandler,
    upsertLoading,
    onClose,
    userQuery,
  } = useSoftware();

  return (
    <>
      <PageTitledHeader
        title={'Software'}
        addTitle={'New Software'}
        createPermissionKey={[
          AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.NEW_SOFTWARE,
        ]}
        handleAction={() => setIsAddDrawerOpen(true)}
      />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Box>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.SEARCH_AND_FILTER,
            ]}
          >
            <Search
              label="Search Here"
              width="100%"
              searchBy={searchValue}
              setSearchBy={setSearchValue}
            />
          </PermissionsGuard>
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <Button
            color="secondary"
            variant="outlined"
            disabled={!!!softwareData?.length}
            onClick={() => {
              setOpenAssignModal(true);
            }}
          >
            Assign Category
          </Button>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.SEARCH_AND_FILTER,
            ]}
          >
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<FilterSharedIcon />}
              onClick={() => setIsOpenFilterDrawer(true)}
            >
              Filter
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
      <Box>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.SOFTWARE_LIST_VIEW,
          ]}
        >
          <TanstackTable
            isError={isError}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isFetching={isFetching}
            data={assetsSoftwares}
            columns={columns(
              softwareData,
              setSoftwareData,
              assetsSoftwares,
              router,
            )}
            isPagination
            count={paginationData?.pages}
            totalRecords={paginationData?.total}
            pageLimit={pageLimit}
            currentPage={page}
            rowsPerPageOptions={[10, 20]}
            onPageChange={handlePageChange}
            setPageLimit={setPageLimit}
            setPage={setPage}
          />
        </PermissionsGuard>
      </Box>

      {isOpenFilterDrawer && (
        <SoftwareFilter
          isOpenDrawer={isOpenFilterDrawer}
          setIsOpenFilterDrawer={setIsOpenFilterDrawer}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
        />
      )}

      <SoftwareAssignCategory
        openAssignModal={openAssignModal}
        setOpenAssignModal={setOpenAssignModal}
        selectedSoftware={softwareData}
      />
      {isAddDrawerOpen && (
        <UpsertSoftware
          isDrawerOpen={isAddDrawerOpen}
          onClose={onClose}
          methods={methods}
          submitHandler={submitHandler}
          isLoading={upsertLoading}
          userQuery={userQuery}
          title="New Software"
          okText="Save"
        />
      )}
    </>
  );
}

export default Software;
