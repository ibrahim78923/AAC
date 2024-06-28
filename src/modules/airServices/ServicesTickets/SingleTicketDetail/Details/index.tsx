import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { EditTicketDetails } from './EditTicketDetails';

export const Details = () => {
  return (
    <PermissionsGuard
      permissions={Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TAB}
    >
      <EditTicketDetails />
    </PermissionsGuard>
  );
};
