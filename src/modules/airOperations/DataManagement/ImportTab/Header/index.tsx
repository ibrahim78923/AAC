import { Box } from '@mui/material';
import { DownloadIcon } from '@/assets/icons';
import Search from '@/components/Search';
import ImportModal from '../ImportModal';
import { Filter } from '../Filter';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { HeaderI } from './Header.interface';
import { LoadingButton } from '@mui/lab';
import { CustomButton } from '@/components/Buttons/CustomButton';

export const Header = (props: HeaderI) => {
  const {
    handleSearch,
    setIsOpenFilterDrawer,
    isOpenFilterDrawer,
    setFilterValues,
    setPage,
    filterValues,
    handleDownload,
    loading,
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
          AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS?.SEARCH_RECORD,
        ]}
      >
        <Box mb={1}>
          <Search label="Search Here" setSearchBy={handleSearch} size="small" />
        </Box>
      </PermissionsGuard>
      <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
        <ImportModal />
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS?.DOWNLOAD_RECORD,
          ]}
        >
          <LoadingButton
            variant="outlined"
            startIcon={<DownloadIcon />}
            color="secondary"
            onClick={handleDownload}
            disabled={loading}
            loading={loading}
            className="small"
          >
            Download
          </LoadingButton>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_DATA_MANAGEMENT_IMPORT_LIST_PERMISSIONS?.FILTER_RECORD,
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
