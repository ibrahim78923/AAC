import { RestoreReportIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useSendApprovalReminder } from './useSendApprovalReminder';

export const SendApprovalReminder = () => {
  const {
    sendReminderOfTicketApproval,
    closePortal,
    postApprovalTicketsRemindersStatus,
    isPortalOpen,
  } = useSendApprovalReminder();

  return (
    <AlertModals
      typeImage={<RestoreReportIcon />}
      type={ALERT_MODALS_TYPE?.REMINDER}
      message="Are you sure  you want to send the reminder ?"
      open={isPortalOpen?.isOpen as boolean}
      handleClose={closePortal}
      handleSubmitBtn={sendReminderOfTicketApproval}
      loading={postApprovalTicketsRemindersStatus?.isLoading}
      disableCancelBtn={postApprovalTicketsRemindersStatus?.isLoading}
      submitBtnText={'Send'}
      cancelBtnText={'Cancel'}
    />
  );
};
