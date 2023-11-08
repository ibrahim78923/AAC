import { DetailCard } from './DetailCard';
import Header from './Header';
import { SingleTicketDetailTabs } from './SingleTicketDetailTabs';

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
