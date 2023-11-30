import Search from '@/components/Search';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { vendorData } from './Vendor.data';
import { useVendor } from './useVendor';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import ImportAssets from './ImportAssets';
import AddNewVendor from './AddNewVendor';

export const Vendor = () => {
  const {
    router,
    searchValue,
    setSearchValue,
    VendorListsColumns,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
  } = useVendor();
  return (
    <>
      <PageTitledHeader
        title={'Vendor'}
        addTitle={'Add New Vendor'}
        hasImport
        handleImport={() => setIsDrawerOpen(true)}
        hasExport
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
        <Search
          label="search"
          width="100%"
          onChange={(e: any) => setSearchValue(e?.target?.value)}
          value={searchValue}
        />
      </Box>

      <br />
      <TanstackTable
        data={vendorData}
        columns={VendorListsColumns}
        isPagination
      />
      <Box>
        <ImportAssets
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
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
