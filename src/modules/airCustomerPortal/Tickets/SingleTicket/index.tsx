import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { SingleTicketDetail } from './SingleTicketDetail';
import { SingleTicketForm } from './SingleTicketForm';
import { SingleTicketHeader } from './SingleTicketHeader';
import { useSingleTicket } from './useSingleTicket';
import ApiErrorState from '@/components/ApiErrorState';
import { ShareSingleTicket } from './ShareSingleTicket';

export const SingleTicket = () => {
  const {
    openShareModal,
    setOpenShareModal,
    ticketId,
    singleTicketData,
    isLoading,
    isFetching,
    isError,
  } = useSingleTicket();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;

  return (
    <>
      <SingleTicketHeader
        id={ticketId}
        ticketNumber={singleTicketData?.ticketIdNumber}
        setOpenShareModal={setOpenShareModal}
      />
      <br />
      <SingleTicketDetail
        status={singleTicketData?.status}
        singleTicketDetailContent={singleTicketData?.description}
      />

      <SingleTicketForm singleTicketData={singleTicketData} />

      {openShareModal && (
        <ShareSingleTicket
          id={ticketId}
          openShareModal={openShareModal}
          setOpenShareModal={setOpenShareModal}
        />
      )}
    </>
  );
};
