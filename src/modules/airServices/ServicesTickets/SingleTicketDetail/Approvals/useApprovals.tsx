import { TICKET_APPROVALS } from '@/constants/strings';
import {
  useGetApprovalsTicketsQuery,
  usePatchApprovalTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/approvals';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useApprovals = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<any>({});
  const router = useRouter();
  const { ticketId } = router?.query;
  const [patchApprovalTicketsTrigger, patchApprovalTicketsStatus] =
    usePatchApprovalTicketsMutation();

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

  const updateRequestApprovalStatus = async (approval: any) => {
    const patchParameterData = {
      queryParams: {
        reason: '',
        id: approval?._id,
        ticketId: ticketId,
        approvalStatus: approval?.state,
      },
    };
    const toastMessage =
      approval?.state === TICKET_APPROVALS?.CANCEL
        ? 'Request Approved successfully'
        : 'Request Rejected successfully';
    try {
      await patchApprovalTicketsTrigger(patchParameterData)?.unwrap();
      successSnackbar?.(toastMessage);
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
    patchApprovalTicketsStatus,
  };
};
