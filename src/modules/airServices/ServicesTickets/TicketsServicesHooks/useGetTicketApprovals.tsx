import { useAppSelector } from '@/redux/store';
import { useLazyGetSingleServicesTicketsAllTypeApprovalsListQuery } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { useRouter } from 'next/router';

export const useGetTicketApprovals = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  const approvalStatus = useAppSelector(
    (state) => state?.servicesTicketApprovals?.approvalStatus,
  );

  const [
    lazyGetSingleServicesTicketsAllTypeApprovalsListTrigger,
    lazyGetSingleServicesTicketsAllTypeApprovalsListStatus,
  ] = useLazyGetSingleServicesTicketsAllTypeApprovalsListQuery();

  const getTicketApprovalsListData = async () => {
    const getApprovalsTicketsParameter = {
      queryParams: {
        id: ticketId,
        approvalStatus,
      },
    };

    try {
      await lazyGetSingleServicesTicketsAllTypeApprovalsListTrigger(
        getApprovalsTicketsParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  return {
    getTicketApprovalsListData,
    lazyGetSingleServicesTicketsAllTypeApprovalsListStatus,
    approvalStatus,
  };
};
