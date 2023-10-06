import DetailTabs from './DetailViewTab';
import DetialViewTimeEnterires from './DetailViewTimeEnteries';
import DetailsVeiwPropSect from './DetailsViewPropertiesSection';
import ToofPage from './TopOfPage';
import DetailViewCard from './ViewCardDetail';

export default function TicketDetail() {
  return (
    <>
      <ToofPage />
      <DetailViewCard />
      <DetailTabs />
      <DetailsVeiwPropSect />
      <DetialViewTimeEnterires />
    </>
  );
}
