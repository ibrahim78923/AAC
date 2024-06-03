import { Box, Button } from '@mui/material';
import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import ImportModal from '../ImportModal';
import { Filter } from '../Filter';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { ExportButton } from '@/components/ExportButton';

export const Header = (props: any) => {
  const {
    search,
    setSearch,
    setIsOpenFilterDrawer,
    isOpenFilterDrawer,
    setFilterValues,
    setPage,
    filterValues,
    handleCsvExport,
    handleExcelExport,
  } = props;
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS?.SEARCH_RECORD,
          ]}
        >
          <Search
            label="Search Here"
            searchBy={search}
            setSearchBy={setSearch}
          />
        </PermissionsGuard>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <ImportModal />
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS?.DOWNLOAD_RECORD,
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
              AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS?.FILTER_RECORD,
            ]}
          >
            <Button
              variant="outlined"
              startIcon={<FilterSharedIcon />}
              color="secondary"
              onClick={() => setIsOpenFilterDrawer(true)}
            >
              Filter
            </Button>
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
      <br />
    </>
  );
};
