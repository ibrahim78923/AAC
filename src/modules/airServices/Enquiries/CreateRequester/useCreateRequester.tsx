import { usePostServicesRequesterMutation } from '@/services/airServices/enquiries';
import { ARRAY_INDEX, ROLE } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IChildModalState } from '../Enquiries.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export default function useCreateRequester({
  isModalOpen,
  onClose,
}: IChildModalState) {
  const [postRequesterTrigger, postRequesterStatus] =
    usePostServicesRequesterMutation();

  const data = isModalOpen?.data?.[ARRAY_INDEX?.ZERO];

  const handleCreateRequester = async () => {
    const updatedData = {
      firstName: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      role: ROLE?.ORG_REQUESTER,
      timezone: '(GMT+04:00) Perth',
    };

    try {
      await postRequesterTrigger(updatedData)?.unwrap();
      successSnackbar('Requester Created Successfully!');
      onClose?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      onClose?.();
    }
  };
  return { handleCreateRequester, postRequesterStatus };
}
