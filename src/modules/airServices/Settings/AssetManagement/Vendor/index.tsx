import Search from '@/components/Search';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { useVendor } from './useVendor';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import AddNewVendor from './AddNewVendor';
import { EXPORT_TYPE } from '@/constants/strings';
import { VENDOR_LISTS_ACTION_CONSTANTS } from './Vendor.data';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const Vendor = () => {
  const {
    router,
    vendorListsColumns,
    isADrawerOpen,
    setIsADrawerOpen,
    vendorData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    setSearch,
    getNewVendorDataExport,
    vendorListActionComponent,
    hasVendorAction,
    setVendorListAction,
  } = useVendor();

  return (
    <>
      <PageTitledHeader
        title={'Vendor'}
        addTitle={'Add New Vendor'}
        hasImport
        handleImport={() =>
          setVendorListAction?.(VENDOR_LISTS_ACTION_CONSTANTS?.IMPORT)
        }
        hasExport
        exportPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.SEARCH_IMPORT_EXPORT_VENDORS,
        ]}
        importPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.SEARCH_IMPORT_EXPORT_VENDORS,
        ]}
        handleExcelExport={() => getNewVendorDataExport?.(EXPORT_TYPE?.XLS)}
        handleCsvExport={() => getNewVendorDataExport?.(EXPORT_TYPE?.CSV)}
        canMovedBack
        createPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_NEW_VENDOR,
        ]}
        moveBack={() => {
          router?.push({
            pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
          });
        }}
        handleAction={() => {
          setIsADrawerOpen(true);
        }}
      />

      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
        marginTop={6}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.SEARCH_IMPORT_EXPORT_VENDORS,
          ]}
        >
          <Search label="Search Here" setSearchBy={setSearch} />
        </PermissionsGuard>
      </Box>

      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_VENDORS_LIST,
        ]}
      >
        <TanstackTable
          data={vendorData?.data?.vendors}
          columns={vendorListsColumns}
          isPagination
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          isSuccess={isSuccess}
          setPageLimit={setPageLimit}
          setPage={setPage}
          currentPage={vendorData?.data?.meta?.page}
          count={vendorData?.data?.meta?.pages}
          pageLimit={vendorData?.data?.meta?.limit}
          totalRecords={vendorData?.data?.meta?.total}
          onPageChange={(page: any) => setPage(page)}
        />
      </PermissionsGuard>
      <Box>
        {hasVendorAction &&
          vendorListActionComponent?.[
            router?.query?.VendorListAction as string
          ]}
      </Box>
      <Box>
        <AddNewVendor
          isADrawerOpen={isADrawerOpen}
          setIsADrawerOpen={setIsADrawerOpen}
        />
      </Box>
    </>
  );
};
