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
import { useRouter } from 'next/router';

export const SingleTicket = () => {
  const router = useRouter();
  const id = router?.query?.id;

  const { status, openPopup, setOpenPopup, onSubmit } = useSingleTicket();

  return (
    <>
      <SingleTicketHeader
        id={id}
        setOpenPopup={setOpenPopup}
        onSubmit={onSubmit}
      />
      <SingleTicketDetail
        id={id}
        status={status}
        singleTicketDetailContent={singleTicketDetailContent}
      />
      <SingleTicketForm
        id={id}
        singleTicketFormDataArray={singleTicketFormDataArray}
        singleTicketFormValidationSchema={singleTicketFormValidationSchema}
        singleTicketFormDefaultValues={singleTicketFormDefaultValues}
      />
      <SingleTicketPopup
        id={id}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      />
    </>
  );
};
