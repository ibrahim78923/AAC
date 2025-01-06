import {
  defaultValuesRejectedModal,
  validationSchemaRejectedModal,
} from './RejectedModal.data';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { usePatchRejectRequestMutation } from '@/services/airServices/settings/user-management/agents';
import { IAgentsProps } from '../../Agents.interface';
import { useFormLib } from '@/hooks/useFormLib';

export const useRejectedModal = (props: IAgentsProps) => {
  const {
    setOpenRejectedModal,
    selectedAgentRequest,
    setSelectedAgentRequest,
  } = props;

  const rejectedRequestMethodProps = {
    validationSchema: validationSchemaRejectedModal,
    defaultValues: defaultValuesRejectedModal,
  };

  const { methods, handleSubmit } = useFormLib(rejectedRequestMethodProps);

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
    methods,
    patchRejectRequestStatus,
    handleSubmit,
  };
};
