import { Box } from '@mui/material';
import Search from '@/components/Search';
import { Filter } from '../Filter';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { ExportButton } from '@/components/Buttons/ExportButton';
import { HeaderI } from './Header.interface';
import { CustomButton } from '@/components/Buttons/CustomButton';

export const Header = (props: HeaderI) => {
  const {
    handleSearch,
    setIsOpenFilterDrawer,
    isOpenFilterDrawer,
    setFilterValues,
    setPage,
    filterValues,
    handleCsvExport,
    handleExcelExport,
  } = props;
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      mb={2}
    >
      <PermissionsGuard
        permissions={[
          AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS?.SEARCH_RECORD,
        ]}
      >
        <Box mb={1}>
          <Search label="Search Here" setSearchBy={handleSearch} size="small" />
        </Box>
      </PermissionsGuard>
      <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS?.DOWNLOAD_RECORD,
          ]}
        >
          <ExportButton
            handleExcelExport={() => {
              handleExcelExport?.();
            }}
            handleCsvExport={() => {
              handleCsvExport?.();
            }}
          />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS?.FILTER_RECORD,
          ]}
        >
          <CustomButton onClick={() => setIsOpenFilterDrawer(true)}>
            Filter
          </CustomButton>
        </PermissionsGuard>
      </Box>
      {isOpenFilterDrawer && (
        <Filter
          setIsOpenFilterDrawer={setIsOpenFilterDrawer}
          setFilterValues={setFilterValues}
          isOpenFilterDrawer={isOpenFilterDrawer}
          setPage={setPage}
          filterValues={filterValues}
        />
      )}
    </Box>
  );
};
