import {
  singleTicketFormDataArray,
  singleTicketFormDefaultValues,
  singleTicketFormValidationSchema,
  singleTicketDetailData,
} from '../Tickets.data';
import { SingleTicketDetail } from './SingleTicketDetail';
import { SingleTicketForm } from './SingleTicketForm';
import { SingleTicketHeader } from './SingleTicketHeader';
import { SingleTicketPopup } from './SingleTicketPopup';
import { useSingleTicket } from './useSingleTicket';

export const SingleTicket = () => {
  const { status, setStatus, openPopup, setOpenPopup } = useSingleTicket();
  return (
    <>
      <SingleTicketHeader setStatus={setStatus} setOpenPopup={setOpenPopup} />
      <SingleTicketDetail
        singleTicketDetailData={singleTicketDetailData}
        status={status}
      />
      <SingleTicketForm
        singleTicketFormDataArray={singleTicketFormDataArray}
        singleTicketFormValidationSchema={singleTicketFormValidationSchema}
        singleTicketFormDefaultValues={singleTicketFormDefaultValues}
      />
      <SingleTicketPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
};
