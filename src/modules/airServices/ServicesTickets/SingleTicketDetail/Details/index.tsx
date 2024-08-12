import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { EditTicketDetails } from './EditTicketDetails';
import { TimeEntries } from './TimeEntries';

export const Details = (props: any) => {
  return (
    <PermissionsGuard
      permissions={Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TAB}
    >
      <EditTicketDetails {...props} />
      <PermissionsGuard
        permissions={
          Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TIME_ENTRIES
        }
      >
        <br />
        <TimeEntries {...props} />
      </PermissionsGuard>
    </PermissionsGuard>
  );
};
