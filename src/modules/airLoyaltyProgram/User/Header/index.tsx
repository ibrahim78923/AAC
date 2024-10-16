import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useHeader } from './useHeader';
import { loyaltyProgramUsersActionComponent } from './Header.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const Header = () => {
  const {
    actionsDropdownForLoyaltyProgramUser,
    openAddUserPortal,
    handleSetSearch,
    selectedUsersLists,
    isPortalOpen,
  } = useHeader();

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
            AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.SEARCH_DETAILS,
          ]}
        >
          <Box>
            <Search label="Search Here" setSearchBy={handleSetSearch} />
          </Box>
        </PermissionsGuard>
        <Box display={'flex'} gap={2} alignItems={'center'} flexWrap={'wrap'}>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_OR_DELETE_USER,
            ]}
          >
            <SingleDropdownButton
              dropdownOptions={actionsDropdownForLoyaltyProgramUser}
              disabled={!!!selectedUsersLists?.length}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_USER,
            ]}
          >
            <Button
              className="small"
              variant="contained"
              startIcon={<AddWhiteBgIcon />}
              onClick={openAddUserPortal}
            >
              Add User
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        loyaltyProgramUsersActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
