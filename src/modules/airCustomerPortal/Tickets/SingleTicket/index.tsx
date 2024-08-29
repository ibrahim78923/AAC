import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { SingleTicketDetail } from './SingleTicketDetail';
import { SingleTicketHeader } from './SingleTicketHeader';
import { useSingleTicket } from './useSingleTicket';
import ApiErrorState from '@/components/ApiErrorState';
import { SingleTicketConversation } from '../SingleTicketConversation';

export const SingleTicket = () => {
  const {
    ticketId,
    singleTicketData,
    isLoading,
    isFetching,
    isError,
    lazyGetSingleDefaultSurveyForCustomerTicketsStatus,
    getSingleDefaultSurveyForCustomerTickets,
    lazyCheckSingleDefaultSurveySubmittedForRequesterStatus,
    refetch,
  } = useSingleTicket();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;

  return (
    <>
      <SingleTicketHeader
        id={ticketId}
        ticketNumber={singleTicketData?.ticketIdNumber}
        getSingleDefaultSurveyForCustomerTickets={
          getSingleDefaultSurveyForCustomerTickets
        }
        singleTicketData={singleTicketData}
      />
      <br />

      <SingleTicketDetail
        singleTicketData={singleTicketData}
        lazyGetSingleDefaultSurveyForCustomerTicketsStatus={
          lazyGetSingleDefaultSurveyForCustomerTicketsStatus
        }
        getSingleDefaultSurveyForCustomerTickets={
          getSingleDefaultSurveyForCustomerTickets
        }
        isLoader={
          lazyGetSingleDefaultSurveyForCustomerTicketsStatus?.isLoading ||
          lazyCheckSingleDefaultSurveySubmittedForRequesterStatus?.isLoading ||
          lazyGetSingleDefaultSurveyForCustomerTicketsStatus?.isFetching ||
          lazyCheckSingleDefaultSurveySubmittedForRequesterStatus?.isFetching
        }
        lazyCheckSingleDefaultSurveySubmittedForRequesterStatus={
          lazyCheckSingleDefaultSurveySubmittedForRequesterStatus
        }
      />
      <br />
      <SingleTicketConversation singleTicketData={singleTicketData} />
    </>
  );
};
