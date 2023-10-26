import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleTicketDetailTabsData } from './SingleTicketDetailTabs.data';
import { Details } from '../Details';
import { Tasks } from '../Tasks';
import RelatedTickets from '../RelatedTickets';
import { AssociateAssets } from '../AssociateAssets';
import { Approvals } from '../Approvals';
import Meetings from '../Meetings';
import Conversations from '../Conversations';

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
