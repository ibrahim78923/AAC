import { SingleTicketDetailTabs } from './SingleTicketDetailTabs';
import { DetailCard } from './DetailCard';
import Header from './Header';

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
