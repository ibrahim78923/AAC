import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import {
  usePatchServicesEnquiriesMutation,
  usePostServicesEnquiriesTicketMutation,
} from '@/services/airServices/enquiries';
import { IChildModalState } from '../Enquiries.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { getActiveAccountSession } from '@/utils';
import { useMemo } from 'react';
import useAuth from '@/hooks/useAuth';
import { TICKET_TYPE } from '@/constants/services';

export const useConvertTicket = ({
  isModalOpen,
  onClose,
}: IChildModalState) => {
  const [postTicketTrigger, postTicketStatus] =
    usePostServicesEnquiriesTicketMutation();
  const [patchEnquiriesTrigger, patchEnquiriesStatus] =
    usePatchServicesEnquiriesMutation();

  const data = isModalOpen?.data?.[ARRAY_INDEX?.ZERO];

  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id ?? {};
  const auth: any = useAuth();
  const organizationId = auth?.user?.organization?._id;

  const handlePatch = async () => {
    const patchEnquiriesParameter = {
      queryParams: data?._id,
      body: { ticketCreated: true },
    };

    try {
      await patchEnquiriesTrigger(patchEnquiriesParameter)?.unwrap();
    } catch (e) {}
  };

  const handleCreateRequester = async () => {
    const formData = new FormData();
    formData?.append('status', data?.status?.toUpperCase());
    formData?.append('subject', data?.query);
    formData?.append('moduleType', MODULE_TYPE?.TICKETS);
    formData?.append('ticketType', TICKET_TYPE?.EQ);
    formData?.append('name', data?.name);
    formData?.append('requesterEmail', data?.email);
    formData?.append('companyId', companyId);
    formData?.append('organization', organizationId);

    try {
      await postTicketTrigger(formData)?.unwrap();
      successSnackbar('Ticket Created Successfully!');
      await handlePatch?.();
      onClose?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      onClose?.();
    }
  };

  return { handleCreateRequester, postTicketStatus, patchEnquiriesStatus };
};
export default useConvertTicket;
