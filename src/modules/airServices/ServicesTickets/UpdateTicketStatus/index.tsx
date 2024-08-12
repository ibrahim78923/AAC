import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { CloneReportIcon } from '@/assets/icons';
import { useUpdateTicketStatus } from './useUpdateTicketStatus';

export const UpdateTicketStatus = (props: any) => {
  const { isPortalOpen } = props;
  const { putSingleTicketStatusStatus, closeModal, updateTicketStatus } =
    useUpdateTicketStatus(props);

  return (
    <AlertModals
      typeImage={<CloneReportIcon />}
      type={ALERT_MODALS_TYPE?.INFO}
      message="Do you want to update the ticket status?"
      open={isPortalOpen?.isOpen}
      handleClose={() => closeModal?.()}
      handleSubmitBtn={() => updateTicketStatus?.()}
      loading={putSingleTicketStatusStatus?.isLoading}
      disableCancelBtn={putSingleTicketStatusStatus?.isLoading}
    />
  );
};
