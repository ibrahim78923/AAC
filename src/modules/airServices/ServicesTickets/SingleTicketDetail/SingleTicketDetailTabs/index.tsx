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
      <Details />
      <Tasks />
      <RelatedTickets setTotalRelatedTickets={setTotalRelatedTickets} />
      <AssociateAssets setTotalAssets={setTotalAssets} />
      <Approvals />
      <Meetings />
      <Activities />
      <Conversations />
    </HorizontalTabs>
  );
};
