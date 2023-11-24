import ImportIcon from '@/assets/icons/shared/import-icon';
import { ExportButton } from '@/components/ExportButton';
import Search from '@/components/Search';
import { AIR_SERVICES } from '@/constants';
import { Box, Button, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { vendorData } from './Vendor.data';
import { useVendor } from './useVendor';
export const Vendor = () => {
  const { router, searchValue, SetSearchValue, VendorListsColumns } =
    useVendor();
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <ArrowBackIcon
            onClick={() => router?.push(AIR_SERVICES?.ASSETS_MANAGEMENT)}
          />

          <Typography variant="h3">Vendor</Typography>
        </Box>
      </Box>
      <>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={1.5}
          marginTop={6}
        >
          <Box>
            <Search
              label="search"
              width="100%"
              searchBy={searchValue}
              setSearchBy={SetSearchValue}
              value={''}
            />
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={1.5}
          >
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<ImportIcon />}
            >
              Import
            </Button>

            <ExportButton />
            <Button variant="contained">New Vendor</Button>
          </Box>
        </Box>
        <br />
        <TanstackTable
          data={vendorData}
          columns={VendorListsColumns}
          isPagination
        />
      </>
    </>
  );
};
