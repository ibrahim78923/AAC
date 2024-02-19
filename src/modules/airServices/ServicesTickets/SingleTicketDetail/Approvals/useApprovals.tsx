import { useGetApprovalsTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useApprovals = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState({});
  const router = useRouter();
  const { ticketId } = router?.query;

  const getApprovalsTicketsParameter = {
    queryParams: {
      id: ticketId,
      approvalStatus: 'ALL',
    },
  };
  const { data, isLoading, isFetching, isError } = useGetApprovalsTicketsQuery(
    getApprovalsTicketsParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );
  const setApproval = (approval: any) => {
    setSelectedApproval(approval);
    setIsConfirmModalOpen(true);
  };

  const updateRequestApprovalStatus = (approval: any) => {
    try {
      successSnackbar(approval?.state);
    } catch (error) {
      errorSnackbar();
    }
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    data,
    isLoading,
    isFetching,
    isError,
    updateRequestApprovalStatus,
  };
};
