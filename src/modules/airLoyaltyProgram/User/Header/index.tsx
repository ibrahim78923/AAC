import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';
import { useHeader } from './useHeader';
import { loyaltyProgramUsersActionComponent } from './Header.data';

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
            AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.SEARCH_RECORD,
          ]}
        >
          <Box>
            <Search label="Search Here" setSearchBy={handleSetSearch} />
          </Box>
        </PermissionsGuard>
        <Box display={'flex'} gap={2} alignItems={'center'} flexWrap={'wrap'}>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.DELETE_USER,
              AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.EDIT_USER,
              AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.VIEW_USER_DETAIL,
            ]}
          >
            <SingleDropdownButton
              dropdownOptions={actionsDropdownForLoyaltyProgramUser}
              disabled={!!!selectedUsersLists?.length}
            />
          </PermissionsGuard>
          <Button
            className="small"
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            onClick={openAddUserPortal}
          >
            Add User
          </Button>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        loyaltyProgramUsersActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
