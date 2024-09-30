import { setIsPortalClose } from '@/redux/slices/airServices/tickets-approvals/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useSendSingleServicesTicketsApprovalReminderMutation } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useSendApprovalReminder = () => {
  const [
    postApprovalTicketsRemindersTrigger,
    postApprovalTicketsRemindersStatus,
  ] = useSendSingleServicesTicketsApprovalReminderMutation();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketApprovals?.isPortalOpen,
  );

  const sendReminderOfTicketApproval = async () => {
    try {
      await postApprovalTicketsRemindersTrigger({})?.unwrap();
      successSnackbar('Reminder Send Successfully');
      closePortal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closePortal = () => {
    dispatch(setIsPortalClose());
  };

  return {
    sendReminderOfTicketApproval,
    closePortal,
    postApprovalTicketsRemindersStatus,
    isPortalOpen,
  };
};
