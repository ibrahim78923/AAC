import { useForm } from 'react-hook-form';
import {
  defaultValuesRejectedModal,
  validationSchemaRejectedModal,
} from './RejectedModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePatchRejectRequestMutation } from '@/services/airServices/settings/user-management/agents';

export const useRejectedModal = (props: any) => {
  const { setOpenRejectedModal, openRejectedModal } = props;
  const rejectedRequestMethods: any = useForm({
    resolver: yupResolver(validationSchemaRejectedModal),
    defaultValues: defaultValuesRejectedModal,
  });

  const handleCloseModal = () => {
    setOpenRejectedModal(false);
    rejectedRequestMethods?.reset();
  };

  const [patchRejectRequestTrigger, patchRejectRequestStatus] =
    usePatchRejectRequestMutation();
  const onSubmit = async (formData: any) => {
    const rejectRequestParameter = {
      id: openRejectedModal?.id,
      reason: formData?.rejected,
    };
    try {
      await patchRejectRequestTrigger(rejectRequestParameter)?.unwrap();
      successSnackbar('Rejected Successfully');
      setOpenRejectedModal(false);
      rejectedRequestMethods?.reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    handleCloseModal,
    onSubmit,
    rejectedRequestMethods,
    patchRejectRequestStatus,
  };
};
