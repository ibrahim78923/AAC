import {
  defaultValues,
  addRequestApprovalValidationSchema,
} from './AddRequestApproval.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export function useAddRequestApproval() {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(addRequestApprovalValidationSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  return {
    methods,
    addRequestApprovalValidationSchema,
    defaultValues,
    enqueueSnackbar,
    handleSubmit,
  };
}
