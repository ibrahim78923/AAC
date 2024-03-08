import { Box, Button } from '@mui/material';
import { DownloadLargeIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Filter } from '../Filter';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS } from '@/constants/permission-keys';

export const Header = () => {
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
            AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS?.SEARCH_RECORD,
          ]}
        >
          <Search label="Search Here" searchBy="" setSearchBy={''} />
        </PermissionsGuard>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS?.DOWNLOAD_RECORD,
            ]}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DownloadLargeIcon />}
            >
              Download
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_DATA_MANAGEMENT_EXPORT_LIST_PERMISSIONS?.FILTER_RECORD,
            ]}
          >
            <Filter />
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
    </>
  );
};
