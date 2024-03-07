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
        status={singleTicketData?.status}
        singleTicketDetailContent={singleTicketData?.description}
      />
      <SingleTicketForm singleTicketData={singleTicketData} />
      <SingleTicketPopup
        id={ticketId}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      />
    </>
  );
};
