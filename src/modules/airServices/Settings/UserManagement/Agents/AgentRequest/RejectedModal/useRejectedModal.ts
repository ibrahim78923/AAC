import { useForm } from 'react-hook-form';
import {
  defaultValuesRejectedModal,
  validationSchemaRejectedModal,
} from './RejectedModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePatchRejectRequestMutation } from '@/services/airServices/settings/user-management/agents';

export const useRejectedModal = (props: any) => {
  const {
    setOpenRejectedModal,
    selectedAgentRequest,
    setSelectedAgentRequest,
  } = props;

  const rejectedRequestMethods: any = useForm({
    resolver: yupResolver(validationSchemaRejectedModal),
    defaultValues: defaultValuesRejectedModal,
  });

  const [patchRejectRequestTrigger, patchRejectRequestStatus] =
    usePatchRejectRequestMutation();

  const onSubmit = async (formData: any) => {
    const rejectRequestParameter = {
      id: selectedAgentRequest,
      reason: formData?.rejected,
    };

    try {
      await patchRejectRequestTrigger(rejectRequestParameter)?.unwrap();
      successSnackbar('Rejected Successfully');
      handleCloseModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleCloseModal = () => {
    setOpenRejectedModal(false);
    setSelectedAgentRequest?.('');
  };

  return {
    handleCloseModal,
    onSubmit,
    rejectedRequestMethods,
    patchRejectRequestStatus,
  };
};
