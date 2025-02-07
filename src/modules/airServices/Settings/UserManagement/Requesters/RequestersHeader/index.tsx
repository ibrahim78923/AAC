import Search from '@/components/Search';
import { Box } from '@mui/material';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { IRequestersProps } from '../Requesters.interface';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

export const RequestersHeader = (props: IRequestersProps) => {
  const {
    selectedRequestersList,
    setIsDrawerOpen,
    handleSearch,
    requestersDropdownOptions,
  } = props;

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.FILTERS_SEARCH,
          ]}
        >
          <Search label="Search Here" setSearchBy={handleSearch} size="small" />
        </PermissionsGuard>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          <PermissionsGuard
            permissions={
              Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_REQUESTERS_ACTIONS
            }
          >
            <SingleDropdownButton
              dropdownOptions={requestersDropdownOptions}
              disabled={!selectedRequestersList?.length}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_REQUESTER,
            ]}
          >
            <AddNewItemButton
              name="Add Requestors"
              onClick={() => setIsDrawerOpen(true)}
            />
          </PermissionsGuard>
        </Box>
      </Box>
    </Box>
  );
};
