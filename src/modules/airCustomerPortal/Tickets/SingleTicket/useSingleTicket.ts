import {
  CUSTOMER_SURVEY_TICKET_STATUS_BASED,
  TICKET_STATUS,
} from '@/constants/strings';
import {
  useGetCustomerPortalTicketsByIdQuery,
  useLazyCheckSingleDefaultSurveySubmittedForRequesterQuery,
  useLazyGetSingleDefaultSurveyForCustomerTicketsQuery,
} from '@/services/airCustomerPortal/Tickets';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSingleTicket = () => {
  const [status] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const router = useRouter();
  const ticketId = router?.query?.id;

  const { data, isLoading, isFetching, isError } =
    useGetCustomerPortalTicketsByIdQuery(ticketId, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const singleTicketData = data?.data?.find((item: any) => item);

  const [
    lazyGetSingleDefaultSurveyForCustomerTicketsTrigger,
    lazyGetSingleDefaultSurveyForCustomerTicketsStatus,
  ] = useLazyGetSingleDefaultSurveyForCustomerTicketsQuery();

  const [
    lazyCheckSingleDefaultSurveySubmittedForRequesterTrigger,
    lazyCheckSingleDefaultSurveySubmittedForRequesterStatus,
  ] = useLazyCheckSingleDefaultSurveySubmittedForRequesterQuery();

  const getSingleDefaultSurveyForCustomerTickets = async () => {
    const apiDataParameter = {
      queryParams: {
        satisfactionSurveyType:
          singleTicketData?.status === TICKET_STATUS?.CLOSED
            ? CUSTOMER_SURVEY_TICKET_STATUS_BASED?.AFTER_TICKET_CLOSED
            : CUSTOMER_SURVEY_TICKET_STATUS_BASED?.AFTER_TICKET_RESOLVED,
      },
    };

    try {
      const response =
        await lazyGetSingleDefaultSurveyForCustomerTicketsTrigger(
          apiDataParameter,
        )?.unwrap();
      if (!!response?.data?.data?._id) {
        await checkSingleDefaultSurveySubmittedForRequester?.(
          response?.data?.data?._id,
        );
      }
    } catch (error) {}
  };

  const checkSingleDefaultSurveySubmittedForRequester = async (id: string) => {
    const apiDataParameter = {
      queryParams: {
        surveyId: id,
      },
    };

    try {
      await lazyCheckSingleDefaultSurveySubmittedForRequesterTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    if (
      [TICKET_STATUS?.CLOSED, TICKET_STATUS?.RESOLVED]?.includes(
        singleTicketData?.status,
      )
    )
      getSingleDefaultSurveyForCustomerTickets?.();
  }, [singleTicketData?.status]);

  return {
    status,
    openShareModal,
    setOpenShareModal,
    ticketId,
    singleTicketData,
    isLoading,
    isFetching,
    isError,
    lazyGetSingleDefaultSurveyForCustomerTicketsStatus,
    getSingleDefaultSurveyForCustomerTickets,
    lazyCheckSingleDefaultSurveySubmittedForRequesterStatus,
  };
};
