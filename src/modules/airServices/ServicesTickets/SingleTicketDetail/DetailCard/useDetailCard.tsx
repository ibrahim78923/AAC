import { useGetSingleAttachmentQuery } from '@/services/airServices/tickets/attachments';
import { useGetTicketsDetailsByIdQuery } from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';

export const useDetailsCard = () => {
  const router = useRouter();
  const { ticketId } = router?.query;

  const getSingleAttachmentParameter = {
    pathParams: {
      id: ticketId,
    },
  };
  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetTicketsDetailsByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const { data: attachFile }: any = useGetSingleAttachmentQuery(
    getSingleAttachmentParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );
  return {
    data,
    isLoading,
    isFetching,
    isError,
    attachFile,
  };
};
