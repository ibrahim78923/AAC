import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleTicketDetailTabsData } from './SingleTicketDetailTabs.data';
import { Tasks } from '../Tasks';
import { Approvals } from '../Approvals';
import RelatedTickets from '../RelatedTickets';
import { Details } from '../Details';
import { Activities } from '../Activities';
import { Conversations } from '../Conversations';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { Meeting } from '../Meeting';
import { Skeleton } from '@mui/lab';
import { TICKET_TYPE } from '@/constants/strings';
import Association from '../../Association';

export const SingleTicketDetailTabs = (props: any) => {
  const { apiStatus, data } = props;
  if (apiStatus?.isLoading || apiStatus?.isFetching) return <Skeleton />;
  return (
    <HorizontalTabs tabsDataArray={singleTicketDetailTabsData?.(data)}>
      <PermissionsGuard
        permissions={Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TAB}
      >
        <Details />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TASK}
      >
        <Tasks />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={
          Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_CHILD_TICKET
        }
      >
        <RelatedTickets />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={
          Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_ASSETS_ASSOCIATE
        }
      >
        <Association ticketType={data?.data?.[0]?.ticketType} />
      </PermissionsGuard>
      {data?.data?.[0]?.ticketType === TICKET_TYPE?.SR && <Approvals />}
      <PermissionsGuard
        permissions={Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_MEETINGS}
      >
        <Meeting />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_ACTIVITIES_DETAILS,
        ]}
      >
        <Activities />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={
          Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_CONVERSATION
        }
      >
        <Conversations />
      </PermissionsGuard>
    </HorizontalTabs>
  );
};
