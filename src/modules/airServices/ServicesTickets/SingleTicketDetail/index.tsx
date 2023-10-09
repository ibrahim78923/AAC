import { DetailCard } from './components/DetailCard';
import { SingleTicketDetailTabs } from './components/SingleTicketDetailTabs';
import ToofPage from './components/TopOfPage';

export const SingleTicketDetail = () => {
  return (
    <>
      <ToofPage />
      <br />
      <DetailCard />
      <br />
      <SingleTicketDetailTabs />
    </>
  );
};
