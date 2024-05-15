import { AlertModals } from '@/components/AlertModals';
import useConvertTicket from './useConvertTicket';

export default function ConvertTicket({ isModalOpen, onClose }: any) {
  const { handleCreateRequester, postTicketStatus } = useConvertTicket({
    isModalOpen,
    onClose,
  });

  return (
    <AlertModals
      type="Create Ticket"
      message="Are you sure you want to convert this enquiry into a Ticket?"
      open={isModalOpen?.convertToTicket}
      handleClose={() => onClose?.()}
      handleSubmitBtn={handleCreateRequester}
      loading={postTicketStatus?.isLoading}
      disableCancelBtn={postTicketStatus?.isLoading}
    />
  );
}
