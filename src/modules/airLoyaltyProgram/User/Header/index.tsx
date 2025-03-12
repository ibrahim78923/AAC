import Search from '@/components/Search';
import { Box } from '@mui/material';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { useHeader } from './useHeader';
import { loyaltyProgramUsersActionComponent } from './Header.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

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
          <SingleDropdownButton
            dropdownOptions={actionsDropdownForLoyaltyProgramUser}
            disabled={!!!selectedUsersLists?.length}
          />
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_USER,
            ]}
          >
            <AddNewItemButton
              size="medium"
              name="Add User"
              onClick={openAddUserPortal}
            />
          </PermissionsGuard>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        loyaltyProgramUsersActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
