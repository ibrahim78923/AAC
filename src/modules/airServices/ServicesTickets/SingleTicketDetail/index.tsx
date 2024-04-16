import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { DetailCard } from './DetailCard';
import Header from './Header';
import { SingleTicketDetailTabs } from './SingleTicketDetailTabs';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { useSingleTicketDetails } from './useSingleTicketDetails';

export const SingleTicketDetail = () => {
  const { data, isLoading, isFetching, isError } = useSingleTicketDetails?.();
  return (
    <>
      <Header data={data} apiStatus={{ isLoading, isFetching, isError }} />
      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_REQUESTER_DETAILS,
        ]}
      >
        <DetailCard
          data={data}
          apiStatus={{ isLoading, isFetching, isError }}
        />
      </PermissionsGuard>
      <br />
      <SingleTicketDetailTabs
        data={data}
        apiStatus={{ isLoading, isFetching, isError }}
      />
    </>
  );
};
