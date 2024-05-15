import { usePostRequesterMutation } from '@/services/airServices/enquiries';
import { ROLE } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useCreateRequester({ isModalOpen, onClose }: any) {
  const [postRequesterTrigger, postRequesterStatus] =
    usePostRequesterMutation();

  const data = isModalOpen?.data?.[0];

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
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };
  return { handleCreateRequester, postRequesterStatus };
}
