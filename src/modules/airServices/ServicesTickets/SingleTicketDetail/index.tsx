import { DetailCard } from './components/DetailCard';
import Header from './components/Header';
import { SingleTicketDetailTabs } from './components/SingleTicketDetailTabs';

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
