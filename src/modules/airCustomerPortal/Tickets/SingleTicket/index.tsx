import {
  singleTicketFormDataArray,
  singleTicketFormDefaultValues,
  singleTicketFormValidationSchema,
  singleTicketDetailContent,
} from '../Tickets.data';
import { SingleTicketDetail } from './SingleTicketDetail';
import { SingleTicketForm } from './SingleTicketForm';
import { SingleTicketHeader } from './SingleTicketHeader';
import { SingleTicketPopup } from './SingleTicketPopup';
import { useSingleTicket } from './useSingleTicket';

export const SingleTicket = () => {
  const { status, openPopup, setOpenPopup, onSubmit, ticketId } =
    useSingleTicket();

  return (
    <>
      <SingleTicketHeader
        id={ticketId}
        setOpenPopup={setOpenPopup}
        onSubmit={onSubmit}
      />
      <SingleTicketDetail
        id={ticketId}
        status={status}
        singleTicketDetailContent={singleTicketDetailContent}
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
