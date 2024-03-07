import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { DetailCard } from './DetailCard';
import Header from './Header';
import { SingleTicketDetailTabs } from './SingleTicketDetailTabs';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';

export const SingleTicketDetail = () => {
  return (
    <>
      <Header />
      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_REQUESTER_DETAILS,
        ]}
      >
        <DetailCard />
      </PermissionsGuard>
      <br />
      <SingleTicketDetailTabs />
    </>
  );
};
