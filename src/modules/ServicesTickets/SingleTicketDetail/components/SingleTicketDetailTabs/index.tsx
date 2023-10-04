import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleTicketDetailTabsData } from './SingleTicketDetailTabs.data';
import { Tasks } from '../../Tasks';
import { RelatedTickets } from '../../RelatedTickets';
import { Assets } from '../../Assets';
import { Associations } from '../../Associations';
import { Details } from '../../Details';
import { Meetings } from '../../Meetings';
import { Activities } from '../../Activities';
import { Conversations } from '../../Conversations';

export const SingleTicketDetailTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleTicketDetailTabsData}>
      <Details />
      <Tasks />
      <RelatedTickets />
      <Assets />
      <Associations />
      <Meetings />
      <Activities />
      <Conversations />
    </HorizontalTabs>
  );
};
