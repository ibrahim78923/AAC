import { useForm } from 'react-hook-form';
import {
  defaultValuesRejectedModal,
  validationSchemaRejectedModal,
} from './RejectedModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useLazyGetAgentRequesterQuery } from '@/services/airServices/settings/user-management/agents';

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
  const parameters = {
    id: '56cb91bdc3464f14678934ca',
    companyId: '651e6368a3a6baf2f193efb3',
  };
  const [patchRejectRequestTrigger] = useLazyGetAgentRequesterQuery();
  const onSubmit = async () => {
    try {
      const res: any = await patchRejectRequestTrigger(parameters);
      enqueueSnackbar(res?.data?.message && 'Rejected Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setOpenRejectedModal(false);
      rejectedRequestMethods?.reset();
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message ?? 'Error, Please try again', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    handleCloseModal,
    onSubmit,
    rejectedRequestMethods,
  };
};
