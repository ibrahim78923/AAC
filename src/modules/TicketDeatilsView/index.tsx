import DetailsProperties from './DetailsProperties';
import DetailTabs from './DetailTab';
import ToofPage from './TopOfPage';
import DetailViewCard from './ViewCardDetail';

export default function TicketDetaile() {
  return (
    <>
      <ToofPage />
      <DetailViewCard />
      <DetailTabs />
      <DetailsProperties />
    </>
  );
}
