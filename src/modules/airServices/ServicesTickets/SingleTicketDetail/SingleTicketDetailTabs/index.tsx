import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleTicketDetailTabsData } from './SingleTicketDetailTabs.data';
import { Tasks } from '../Tasks';
// import { Activities } from '../../Activities';
import { Meetings } from '../Meetings';
import { Approvals } from '../Approvals';
import RelatedTickets from '../RelatedTickets';
import Conversations from '../Conversations';
import { AssociateAssets } from '../AssociateAssets';
import { Details } from '../Details';

export const SingleTicketDetailTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleTicketDetailTabsData}>
      <Details />
      <Tasks />
      <RelatedTickets />
      <AssociateAssets />
      <Approvals />
      <Meetings />
      {/* <Activities /> */}
      <Conversations />
    </HorizontalTabs>
  );
};
