import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const AgentFields = () => {
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_NEW_FIELDS_FOR_ADDING_USERS,
      ]}
    >
      Agent Fields
    </PermissionsGuard>
  );
};
