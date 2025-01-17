import { SingleTicketDetail } from './SingleTicketDetail';
import { SingleTicketHeader } from './SingleTicketHeader';
import { useSingleTicket } from './useSingleTicket';
import { SingleTicketConversation } from '../SingleTicketConversation';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { Theme } from '@mui/material';

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
    portalStyles,
  } = useSingleTicket();

  return (
    <ApiRequestFlow
      hasError={isError}
      showSkeleton={isFetching || isLoading}
      refreshApi={refetch}
      refreshButtonProps={{
        sx: (theme: Theme) => ({
          bgcolor:
            portalStyles?.btnPrimary ||
            customizePortalDefaultValues(theme)?.btnPrimary,
          color: 'common.white',
          '&:hover': {
            bgcolor:
              portalStyles?.btnPrimary ||
              customizePortalDefaultValues(theme)?.btnPrimary,
            color: 'common.white',
          },
        }),
      }}
    >
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
    </ApiRequestFlow>
  );
};
