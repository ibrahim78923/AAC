import {
  singleTicketFormDataArray,
  singleTicketFormDefaultValues,
  singleTicketFormValidationSchema,
  singleTicketDetailData,
} from '../Tickets.data';
import { SingleTicketDetail } from './SingleTicketDetail';
import { SingleTicketForm } from './SingleTicketForm';
import { SingleTicketHeader } from './SingleTicketHeader';
import { useSingleTicket } from './useSingleTicket';

export const SingleTicket = () => {
  const { status, setStatus } = useSingleTicket();
  return (
    <>
      <SingleTicketHeader setStatus={setStatus} />
      <SingleTicketDetail
        singleTicketDetailData={singleTicketDetailData}
        status={status}
      />
      <SingleTicketForm
        singleTicketFormDataArray={singleTicketFormDataArray}
        singleTicketFormValidationSchema={singleTicketFormValidationSchema}
        singleTicketFormDefaultValues={singleTicketFormDefaultValues}
      />
    </>
  );
};
