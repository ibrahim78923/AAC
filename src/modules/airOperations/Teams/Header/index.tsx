import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS } from '@/constants/permission-keys';
import { useHeader } from './useHeader';
import { operationsteamActionComponent } from './Header.data';

export const Header = () => {
  const { openAddTeamPortal, handleSetSearch, isPortalOpen } = useHeader();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
        flexWrap={'wrap'}
      >
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.SEARCH_RECORD,
          ]}
        >
          <Box>
            <Search label="Search Here" setSearchBy={handleSetSearch} />
          </Box>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.CREATE_TEAM,
          ]}
        >
          <Button
            className="small"
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            onClick={openAddTeamPortal}
          >
            Create Team
          </Button>
        </PermissionsGuard>
      </Box>
      {isPortalOpen?.isOpen &&
        operationsteamActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
