import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleTicketDetailTabsData } from './SingleTicketDetailTabs.data';
import { Tasks } from '../../Tasks';
import RelatedTickets from '@/modules/ServicesTickets/SingleTicketDetail/RelatedTickets';
import { Assets } from '../../Assets';
import { Associations } from '../../Associations';
import { Details } from '../../Details';
import { Activities } from '../../Activities';
import { Conversations } from '../../Conversations';
import { Meetings } from '../../Meetings';
import { Approvals } from '../../Approvals';

export const SingleTicketDetailTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleTicketDetailTabsData}>
      <Details />
      <Tasks />
      <RelatedTickets />
      <Associations />
      <Assets />
      <Approvals />
      <Meetings />
      <Activities />
      <Conversations />
    </HorizontalTabs>
  );
};
