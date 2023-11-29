import { useForm } from 'react-hook-form';
import {
  defaultValuesRejectedModal,
  validationSchemaRejectedModal,
} from './RejectedModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

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
  const onSubmit = async () => {
    enqueueSnackbar('Rejected Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setOpenRejectedModal(false);
    rejectedRequestMethods?.reset();
  };

  return {
    handleCloseModal,
    onSubmit,
    rejectedRequestMethods,
  };
};
