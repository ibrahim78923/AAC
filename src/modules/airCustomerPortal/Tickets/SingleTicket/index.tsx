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
  const { status, openPopup, setOpenPopup, onSubmit } = useSingleTicket();

  return (
    <>
      <SingleTicketHeader setOpenPopup={setOpenPopup} onSubmit={onSubmit} />
      <SingleTicketDetail
        status={status}
        singleTicketDetailContent={singleTicketDetailContent}
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
