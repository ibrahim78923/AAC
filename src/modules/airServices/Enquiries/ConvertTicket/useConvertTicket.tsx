import { MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import {
  usePatchEnquiriesMutation,
  usePostTicketMutation,
} from '@/services/airServices/enquiries';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useConvertTicket({ isModalOpen, onClose }: any) {
  const [postTicketTrigger, postTicketStatus] = usePostTicketMutation();
  const [patchEnquiriesTrigger, patchEnquiriesStatus] =
    usePatchEnquiriesMutation();

  const data = isModalOpen?.data?.[0];

  const handlePatch = async () => {
    const patchEnquiriesParameter = {
      queryParams: data?._id,
      body: { ticketCreated: true },
    };

    try {
      await patchEnquiriesTrigger(patchEnquiriesParameter)?.unwrap();
    } catch (e: any) {}
  };

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
      await handlePatch?.();
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  return { handleCreateRequester, postTicketStatus, patchEnquiriesStatus };
}
