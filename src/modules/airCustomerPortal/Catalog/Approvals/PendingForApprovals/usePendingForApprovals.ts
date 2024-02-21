import { TICKET_APPROVALS } from '@/constants/strings';
import { useGetPendingForApprovalsTicketsQuery } from '@/services/airCustomerPortal';
import { useState } from 'react';

export const usePendingForApprovals = () => {
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

  const { data, isLoading, isFetching, isError } =
    useGetPendingForApprovalsTicketsQuery(
      getPendingForApprovalsTicketsParameter,
      {
        refetchOnMountOrArgChange: true,
      },
    );

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
  };
};
