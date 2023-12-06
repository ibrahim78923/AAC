import DetailViewTimeEntries from './TicketDetailsView/DetailViewTimeEntries';
import DetailsViewPropertiesSection from './TicketDetailsView/DetailsViewPropertiesSection';

export const Details = () => {
  return (
    <>
      <DetailsViewPropertiesSection />
      <br />
      <DetailViewTimeEntries />
    </>
  );
};
