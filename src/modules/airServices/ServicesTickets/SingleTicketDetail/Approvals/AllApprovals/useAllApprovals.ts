import { useGetTicketApprovals } from '@/modules/airServices/ServicesTickets/TicketsServicesHooks/useGetTicketApprovals';
import { setIsPortalOpen } from '@/redux/slices/airServices/tickets-approvals/slice';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';

export const useAllApprovals = () => {
  const dispatch = useAppDispatch();
  const {
    getTicketApprovalsListData,
    lazyGetSingleServicesTicketsAllTypeApprovalsListStatus,
    approvalStatus,
  } = useGetTicketApprovals?.();

  useEffect(() => {
    getTicketApprovalsListData();
  }, [approvalStatus]);

  const setAction = (actionType: string, data?: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
        data,
      }),
    );
  };

  const showLoader =
    lazyGetSingleServicesTicketsAllTypeApprovalsListStatus?.isFetching ||
    lazyGetSingleServicesTicketsAllTypeApprovalsListStatus?.isLoading;

  const hasError =
    lazyGetSingleServicesTicketsAllTypeApprovalsListStatus?.isError;
  const data =
    lazyGetSingleServicesTicketsAllTypeApprovalsListStatus?.data?.data;

  const setApproval = (approval: any) => {
    setAction?.(approval?.action, approval);
  };

  return {
    lazyGetSingleServicesTicketsAllTypeApprovalsListStatus,
    showLoader,
    hasError,
    data,
    getTicketApprovalsListData,
    setApproval,
  };
};
