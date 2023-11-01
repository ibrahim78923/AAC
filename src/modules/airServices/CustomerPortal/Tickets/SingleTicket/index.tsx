import {
  singleTicketFormDataArray,
  singleTicketFormDefaultValues,
  singleTicketFormValidationSchema,
  singleTicketDetailData,
} from '../Tickets.data';
import { SingleTicketDetail } from './SingleTicketDetail';
import { SingleTicketForm } from './SingleTicketForm';
import { SingleTicketHeader } from './SingleTicketHeader';

export const SingleTicket = () => {
  return (
    <>
      <SingleTicketHeader />
      <SingleTicketDetail singleTicketDetailData={singleTicketDetailData} />
      <SingleTicketForm
        singleTicketFormDataArray={singleTicketFormDataArray}
        singleTicketFormValidationSchema={singleTicketFormValidationSchema}
        singleTicketFormDefaultValues={singleTicketFormDefaultValues}
      />
    </>
  );
};
