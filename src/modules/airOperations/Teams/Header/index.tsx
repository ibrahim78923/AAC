import Search from '@/components/Search';
import { Box } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS } from '@/constants/permission-keys';
import { useHeader } from './useHeader';
import { operationsTeamActionComponent } from './Header.data';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

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
          <AddNewItemButton onClick={openAddTeamPortal} name="Create Team" />
        </PermissionsGuard>
      </Box>
      {isPortalOpen?.isOpen &&
        operationsTeamActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
