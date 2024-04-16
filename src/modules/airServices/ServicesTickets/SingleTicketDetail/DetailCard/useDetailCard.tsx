import { useGetSingleAttachmentQuery } from '@/services/airServices/tickets/attachments';
import { useRouter } from 'next/router';

export const useDetailsCard = () => {
  const router = useRouter();
  const { ticketId } = router?.query;

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
  };
};
