import Search from '@/components/Search';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { useVendor } from './useVendor';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import AddNewVendor from './AddNewVendor';
import { EXPORT_TYPE } from '@/constants/strings';
import { VENDOR_LISTS_ACTION_CONSTANTS } from './Vendor.data';

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
        handleExcelExport={() => getNewVendorDataExport?.(EXPORT_TYPE?.XLS)}
        handleCsvExport={() => getNewVendorDataExport?.(EXPORT_TYPE?.CSV)}
        canMovedBack
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
        <Search label="search" setSearchBy={setSearch} />
      </Box>

      <br />
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
