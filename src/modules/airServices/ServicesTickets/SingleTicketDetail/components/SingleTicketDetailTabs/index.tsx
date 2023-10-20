import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleTicketDetailTabsData } from './SingleTicketDetailTabs.data';
import { Tasks } from '../../Tasks';
// import { Assets } from '../../Assets';
import { Details } from '../../Details';
// import { Activities } from '../../Activities';
import { Meetings } from '../../Meetings';
import { Approvals } from '../../Approvals';
import RelatedTickets from '../../RelatedTickets';
import Conversations from '../../Conversations';
// import { Associations } from '../../Associations';
// import { Assets } from '../../Assets';

// import { Associations } from '../../Associations';
import { AssociateAssets } from '../../AssociateAssets';

export const SingleTicketDetailTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleTicketDetailTabsData}>
      <Details />
      <Tasks />
      <RelatedTickets />
      <AssociateAssets />
      {/* <Associations /> */}
      {/* <Associations /> */}
      <Approvals />
      <Meetings />
      {/* <Activities /> */}
      <Conversations />
    </HorizontalTabs>
  );
};
