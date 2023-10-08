import ToofPage from '@/modules/TicketDeatilsView/TopOfPage';
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
