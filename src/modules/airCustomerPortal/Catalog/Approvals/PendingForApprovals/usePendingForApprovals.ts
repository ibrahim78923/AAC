import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { TICKET_APPROVALS } from '@/constants/strings';
import { useGetPendingForApprovalsTicketsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const usePendingForApprovals = () => {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<any>({});
  const setApproval = (approval: any) => {
    setSelectedApproval(approval);
    setIsConfirmModalOpen(true);
  };
  const getPendingForApprovalsTicketsParameter = {
    queryParams: {
      approvalStatus: TICKET_APPROVALS?.RECEIVED,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetPendingForApprovalsTicketsQuery(
      getPendingForApprovalsTicketsParameter,
      {
        refetchOnMountOrArgChange: true,
      },
    );
  const openApprovalDetail = (data: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.APPROVALS_DETAIL,
      query: {
        approvalId: data?._id,
        ticketId: data?.ticketId,
      },
    });
  };
  return {
    data,
    isLoading,
    isFetching,
    isError,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    openApprovalDetail,
    refetch,
  };
};
