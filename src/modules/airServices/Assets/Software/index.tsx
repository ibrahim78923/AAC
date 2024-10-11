import { Box, Button } from '@mui/material';
import { columns } from './Software.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { FilterSharedIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader/index';
import SoftwareFilter from './SoftwareFilter';
import { SoftwareAssignCategory } from './SoftwareAssignCategory';
import { UpsertSoftware } from './UpsertSoftware';
import { useSoftware } from './useSoftware';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const Software = () => {
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
    handleSearch,
    setPage,
    setPageLimit,
    paginationData,
    setFilterValues,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    filterValues,
    theme,
    refetch,
  } = useSoftware();

  return (
    <>
      <PageTitledHeader
        title={'Software'}
        addTitle={'New Software'}
        createPermissionKey={[
          AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.NEW_SOFTWARE,
        ]}
        handleAction={() => {
          setSoftwareData?.([]);
          setIsAddDrawerOpen(true);
        }}
      />
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={1.5}
          px={2}
        >
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.SEARCH_AND_FILTER,
            ]}
          >
            <Search label="Search Here" setSearchBy={handleSearch} />
          </PermissionsGuard>
          <Box
            display={'flex'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={1.5}
          >
            <Button
              color="secondary"
              variant="outlined"
              disabled={!!!softwareData?.length}
              onClick={() => setOpenAssignModal?.(true)}
              className="small"
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
                className="small"
              >
                Filter
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
        <br />
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
            pageLimit={paginationData?.limit}
            currentPage={paginationData?.page}
            onPageChange={(page: number) => setPage(page)}
            setPageLimit={setPageLimit}
            setPage={setPage}
            errorProps={{ canRefresh: true, refresh: refetch }}
          />
        </PermissionsGuard>
      </Box>
      {isOpenFilterDrawer && (
        <SoftwareFilter
          isOpenDrawer={isOpenFilterDrawer}
          setIsOpenFilterDrawer={setIsOpenFilterDrawer}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
          setPage={setPage}
        />
      )}
      {openAssignModal && (
        <SoftwareAssignCategory
          openAssignModal={openAssignModal}
          setOpenAssignModal={setOpenAssignModal}
          selectedSoftware={softwareData}
          setSoftwareData={setSoftwareData}
        />
      )}
      {isAddDrawerOpen && (
        <UpsertSoftware
          isAddDrawerOpen={isAddDrawerOpen}
          setIsAddDrawerOpen={setIsAddDrawerOpen}
        />
      )}
    </>
  );
};

export default Software;
