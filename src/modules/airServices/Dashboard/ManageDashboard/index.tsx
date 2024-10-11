import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useManageDashboard } from './useManageDashboard';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const { CREATE_DASHBOARD, VIEW_DASHBOARD } =
  AIR_SERVICES_DASHBOARD_PERMISSIONS ?? {};

export const ManageDashboard = () => {
  const {
    setPage,
    setPageLimit,
    lazyGetDashboardStatus,
    renderPortalComponent,
    isPortalOpen,
    manageDashboardsDataColumns,
    getDashboardListData,
    page,
    moveToDashboard,
    moveToCreateDashboard,
    openFilterPortal,
    handleSearch,
  } = useManageDashboard();

  return (
    <>
      <PageTitledHeader
        title={'Manage Dashboards'}
        canMovedBack
        moveBack={moveToDashboard}
        addTitle={'Create Dashboard'}
        createPermissionKey={[CREATE_DASHBOARD]}
        handleAction={moveToCreateDashboard}
      />
      <PermissionsGuard permissions={[VIEW_DASHBOARD]}>
        <Box
          border={'1px solid'}
          borderColor={'custom.off_white_three'}
          borderRadius={2}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={2}
            flexWrap={'wrap'}
            p={2}
          >
            <Search label="Search Here" setSearchBy={handleSearch} />
            <Button
              className="small"
              variant="outlined"
              color="secondary"
              startIcon={<FilterSharedIcon />}
              onClick={openFilterPortal}
            >
              Filter
            </Button>
          </Box>
          <TanstackTable
            columns={manageDashboardsDataColumns}
            data={lazyGetDashboardStatus?.data?.dynamicdashboards}
            isLoading={lazyGetDashboardStatus?.isLoading}
            currentPage={lazyGetDashboardStatus?.data?.meta?.page}
            count={lazyGetDashboardStatus?.data?.meta?.pages}
            pageLimit={lazyGetDashboardStatus?.data?.meta?.limit}
            totalRecords={lazyGetDashboardStatus?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            isFetching={lazyGetDashboardStatus?.isFetching}
            isError={lazyGetDashboardStatus?.isError}
            isSuccess={lazyGetDashboardStatus?.isSuccess}
            onPageChange={(page: any) => setPage(page)}
            isPagination
            errorProps={{
              canRefresh: true,
              refresh: () => getDashboardListData?.(page),
            }}
            noDataTableText="No Dashboards Found"
          />
        </Box>
      </PermissionsGuard>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
