import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import DetailsViewPropertiesSection from './TicketDetailsView/DetailsViewPropertiesSection';
import { Permissions } from '@/constants/permissions';

export const Details = () => {
  return (
    <PermissionsGuard
      permissions={Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TAB}
    >
      <DetailsViewPropertiesSection />
    </PermissionsGuard>
  );
};
