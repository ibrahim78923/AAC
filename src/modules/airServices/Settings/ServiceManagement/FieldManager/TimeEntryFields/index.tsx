import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export default function TimeEntryFields() {
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_NEW_FIELDS_FOR_TIME_ENTRIES,
      ]}
    >
      TimeEntryFields
    </PermissionsGuard>
  );
}
