import { useForm } from 'react-hook-form';
import {
  defaultValuesRejectedModal,
  validationSchemaRejectedModal,
} from './RejectedModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePatchRejectRequestMutation } from '@/services/airServices/settings/user-management/agents';

export const useRejectedModal = (props: any) => {
  const { setOpenRejectedModal } = props;
  const rejectedRequestMethods: any = useForm({
    resolver: yupResolver(validationSchemaRejectedModal),
    defaultValues: defaultValuesRejectedModal,
  });
  const handleCloseModal = () => {
    setOpenRejectedModal(false);
    rejectedRequestMethods?.reset();
  };
  const companyId = '651e6368a3a6baf2f193efb3';
  const [patchRejectRequestTrigger] = usePatchRejectRequestMutation();
  const onSubmit = async () => {
    try {
      await patchRejectRequestTrigger({
        // id: _id,
        companyId,
      });
      successSnackbar('Rejected Successfully');
      setOpenRejectedModal(false);
      rejectedRequestMethods?.reset();
    } catch (err: any) {
      errorSnackbar();
    }
  };

  return {
    handleCloseModal,
    onSubmit,
    rejectedRequestMethods,
  };
};
