import { DetailCard } from './SingleTicketDetailsComponents/DetailCard';
import Header from './SingleTicketDetailsComponents/Header';
import { SingleTicketDetailTabs } from './SingleTicketDetailsComponents/SingleTicketDetailTabs';

export const SingleTicketDetail = () => {
  return (
    <>
      <Header />
      <br />
      <DetailCard />
      <br />
      <SingleTicketDetailTabs />
    </>
  );
};
