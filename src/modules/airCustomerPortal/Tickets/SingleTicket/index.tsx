import {
  singleTicketFormDataArray,
  singleTicketFormDefaultValues,
  singleTicketFormValidationSchema,
} from '../Tickets.data';
import { SingleTicketDetail } from './SingleTicketDetail';
import { SingleTicketForm } from './SingleTicketForm';
import { SingleTicketHeader } from './SingleTicketHeader';
import { SingleTicketPopup } from './SingleTicketPopup';
import { useSingleTicket } from './useSingleTicket';

export const SingleTicket = () => {
  const { openPopup, setOpenPopup, ticketId, singleTicketData } =
    useSingleTicket();

  return (
    <>
      <SingleTicketHeader
        id={ticketId}
        ticketNumber={singleTicketData?.ticketIdNumber}
        setOpenPopup={setOpenPopup}
      />
      <SingleTicketDetail
        id={ticketId}
        status={singleTicketData?.status}
        singleTicketDetailContent={singleTicketData?.description}
      />
      <SingleTicketForm
        id={ticketId}
        singleTicketFormDataArray={singleTicketFormDataArray}
        singleTicketFormValidationSchema={singleTicketFormValidationSchema}
        singleTicketFormDefaultValues={singleTicketFormDefaultValues}
      />
      <SingleTicketPopup
        id={ticketId}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      />
    </>
  );
};
