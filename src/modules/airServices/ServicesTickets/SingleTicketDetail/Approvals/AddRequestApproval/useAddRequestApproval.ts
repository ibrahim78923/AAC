import {
  defaultValues,
  addRequestApprovalValidationSchema,
} from './AddRequestApproval.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export const useAddRequestApproval = (props: any) => {
  const { setIsDrawerOpen } = props;

  const methods = useForm({
    resolver: yupResolver(addRequestApprovalValidationSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async () => {
    enqueueSnackbar('Request for approval sent successfully', {
      variant: 'success',
    });
    onClose?.();
  };

  const onClose = () => {
    reset();
    setIsDrawerOpen(false);
  };

  return {
    methods,
    addRequestApprovalValidationSchema,
    defaultValues,
    enqueueSnackbar,
    handleSubmit,
    onClose,
    onSubmit,
  };
};
