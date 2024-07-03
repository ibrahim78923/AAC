import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const RequesterFields = () => {
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_NEW_FIELDS_FOR_ADDING_USERS,
      ]}
    >
      Requester Fields
    </PermissionsGuard>
  );
};
