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

export const SingleTicketDetailTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleTicketDetailTabsData}>
      <Details />
      <Tasks />
      <RelatedTickets />
      {/* <Assets /> */}
      <Approvals />
      <Meetings />
      {/* <Activities /> */}
      <Conversations />
    </HorizontalTabs>
  );
};
