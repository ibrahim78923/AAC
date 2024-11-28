import { useGetSingleAttachmentQuery } from '@/services/airServices/tickets/attachments';
import { useGetServicesSingleTicketDetailHeaderCardByIdQuery } from '@/services/airServices/tickets/single-ticket-details/details';
import { useRouter } from 'next/router';

export const useDetailCard = () => {
  const router = useRouter();
  const { ticketId } = router?.query;

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesSingleTicketDetailHeaderCardByIdQuery(
      getSingleTicketParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!ticketId,
      },
    );

  const getSingleAttachmentParameter = {
    pathParams: {
      id: ticketId,
    },
  };

  const { data: attachFile }: any = useGetSingleAttachmentQuery(
    getSingleAttachmentParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

  return {
    attachFile,
    data,
    router,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
