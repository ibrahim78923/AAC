import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box } from '@mui/material';
import { useHeader } from './useHeader';
import { loyaltyProgramRoleAndRightsActionComponent } from './Header.data';
import { AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const Header = () => {
  const {
    roleAndRightsActionDropdown,
    openAddRoleAndRightsPortal,
    handleSetSearch,
    selectedRoleAndRightsLists,
    isPortalOpen,
  } = useHeader();

  return (
    <>
      <Box px={2}>
        <PageTitledHeader
          title="Roles and Rights"
          addTitle="Add new Role"
          handleAction={openAddRoleAndRightsPortal}
          createPermissionKey={[
            AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS?.ADD_ROLE,
          ]}
        />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={2}
          flexWrap={'wrap'}
        >
          {' '}
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS?.SEARCH_DETAILS,
            ]}
          >
            <Box>
              <Search label="Search Here" setSearchBy={handleSetSearch} />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS?.EDIT_OR_DELETE_ROLE,
            ]}
          >
            <SingleDropdownButton
              dropdownOptions={roleAndRightsActionDropdown}
              disabled={!!!selectedRoleAndRightsLists?.length}
            />
          </PermissionsGuard>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        loyaltyProgramRoleAndRightsActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
