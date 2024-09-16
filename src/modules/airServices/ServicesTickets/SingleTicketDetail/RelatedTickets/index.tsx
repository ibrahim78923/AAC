import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Header } from './Header';
import { RelatedTicketsList } from './RelatedTicketLists';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';

export const RelatedTickets = () => {
  return (
    <>
      <Header />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.CHILD_TICKET_LIST_VIEW,
        ]}
      >
        <RelatedTicketsList />
      </PermissionsGuard>
    </>
  );
};
