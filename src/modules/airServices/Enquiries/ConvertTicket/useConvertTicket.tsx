import { MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import { usePostTicketMutation } from '@/services/airServices/enquiries';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useConvertTicket({ isModalOpen, onClose }: any) {
  const [postTicketTrigger, postTicketStatus] = usePostTicketMutation();

  const data = isModalOpen?.data?.[0];

  const handleCreateRequester = async () => {
    const formData: any = new FormData();
    formData.append('status', data?.status?.toUpperCase());
    formData.append('subject', data?.query);
    formData.append('moduleType', MODULE_TYPE?.TICKETS);
    formData.append('ticketType', TICKET_TYPE?.EQ);
    formData.append('requesterEmail', data?.email);

    try {
      await postTicketTrigger(formData)?.unwrap();
      successSnackbar('Ticket Created Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  return { handleCreateRequester, postTicketStatus };
}
