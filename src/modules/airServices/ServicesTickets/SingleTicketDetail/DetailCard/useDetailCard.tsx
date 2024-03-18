import { useGetSingleAttachmentQuery } from '@/services/airServices/tickets/attachments';
import { useGetTicketsByIdQuery } from '@/services/airServices/tickets';
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

  const { data, isLoading, isFetching, isError } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

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
