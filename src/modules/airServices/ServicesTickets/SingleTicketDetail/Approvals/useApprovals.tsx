import { TICKET_APPROVALS } from '@/constants/strings';
import {
  useAddSingleServicesTicketsApprovalMutation,
  useGetSingleServicesTicketsAllTypeApprovalsListQuery,
  useUpdateSingleServicesTicketsApprovalMutation,
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

  const [patchApprovalTicketsTrigger] =
    useUpdateSingleServicesTicketsApprovalMutation();

  const [postApprovalTicketsRemindersTrigger] =
    useAddSingleServicesTicketsApprovalMutation();

  const getApprovalsTicketsParameter = {
    queryParams: {
      id: ticketId,
      approvalStatus: TICKET_APPROVALS?.ALL,
    },
  };
  const { data, isLoading, isFetching } =
    useGetSingleServicesTicketsAllTypeApprovalsListQuery(
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
    if (approval?.state === TICKET_APPROVALS?.REMINDER) {
      await sendReminderForTicketApproval?.();
      return;
    }
    const patchParameterData = {
      queryParams: {
        reason: '',
        id: approval?._id,
        ticketId: ticketId,
        approvalStatus: approval?.state,
      },
    };
    try {
      await patchApprovalTicketsTrigger(patchParameterData)?.unwrap();
      successSnackbar?.('Request cancelled successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const sendReminderForTicketApproval = async () => {
    try {
      await postApprovalTicketsRemindersTrigger({})?.unwrap();
      successSnackbar('Reminder Send Successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
    updateRequestApprovalStatus,
  };
};
