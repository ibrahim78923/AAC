import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export default function SoftwareFields() {
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_NEW_SOFTER_FIELDS,
      ]}
    >
      SoftwareFields
    </PermissionsGuard>
  );
}
