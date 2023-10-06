import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleTicketDetailTabsData } from './SingleTicketDetailTabs.data';
import { Tasks } from '../../Tasks';
import RelatedTickets from '@/modules/ServicesTickets/SingleTicketDetail/RelatedTickets';
import { Assets } from '../../Assets';
import { Approvals } from '../../Approvals';
import { Details } from '../../Details';
import { Activities } from '../../Activities';
import { Conversations } from '../../Conversations';
import { Meetings } from '../../Meetings';

export const SingleTicketDetailTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleTicketDetailTabsData}>
      <Details />
      <Tasks />
      <RelatedTickets />
      <Assets />
      <Approvals />
      <Meetings />
      <Activities />
      <Conversations />
    </HorizontalTabs>
  );
};
