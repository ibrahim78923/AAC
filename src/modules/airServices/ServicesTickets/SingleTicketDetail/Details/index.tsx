import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { EditTicketDetails } from './EditTicketDetails';
import { TimeEntries } from './TimeEntries';
import { SingleTicketDetailChildComponentPropsI } from '../SingleTicketDetails.interface';

const Details = (props: SingleTicketDetailChildComponentPropsI) => {
  return (
    <PermissionsGuard
      permissions={Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TAB}
    >
      <EditTicketDetails />
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

export default Details;
