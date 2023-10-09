import ToofPage from '@/modules/ServicesTickets/SingleTicketDetail/components/TopOfPage';
import { DetailCard } from './components/DetailCard';
import { SingleTicketDetailTabs } from './components/SingleTicketDetailTabs';

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
