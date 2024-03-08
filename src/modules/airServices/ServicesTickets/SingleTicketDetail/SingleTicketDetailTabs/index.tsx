import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleTicketDetailTabsData } from './SingleTicketDetailTabs.data';
import { Tasks } from '../Tasks';
import { Meetings } from '../Meetings';
import { Approvals } from '../Approvals';
import RelatedTickets from '../RelatedTickets';
import { AssociateAssets } from '../AssociateAssets';
import { Details } from '../Details';
import { Activities } from '../Activities';
import { Conversations } from '../Conversations';
import { useState } from 'react';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

export const SingleTicketDetailTabs = () => {
  const [totalRelatedTickets, setTotalRelatedTickets] = useState();
  const [totalAssets, setTotalAssets] = useState();

  return (
    <HorizontalTabs
      tabsDataArray={singleTicketDetailTabsData?.(
        totalRelatedTickets,
        totalAssets,
      )}
    >
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
        <RelatedTickets setTotalRelatedTickets={setTotalRelatedTickets} />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={
          Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_ASSETS_ASSOCIATE
        }
      >
        <AssociateAssets setTotalAssets={setTotalAssets} />
      </PermissionsGuard>
      <Approvals />
      <PermissionsGuard
        permissions={Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_MEETINGS}
      >
        <Meetings />
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
