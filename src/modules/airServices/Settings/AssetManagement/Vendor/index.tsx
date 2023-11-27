import Search from '@/components/Search';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { vendorData } from './Vendor.data';
import { useVendor } from './useVendor';
import { PageTitledHeader } from '@/components/PageTitledHeader';
export const Vendor = () => {
  const { searchValue, setSearchValue, VendorListsColumns } = useVendor();
  return (
    <>
      <PageTitledHeader
        title={'Vendor'}
        addTitle={'Add New Vendor'}
        hasImport={true}
        hasExport={true}
        canMovedBack
      />

      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
        marginTop={10}
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
    </>
  );
};
