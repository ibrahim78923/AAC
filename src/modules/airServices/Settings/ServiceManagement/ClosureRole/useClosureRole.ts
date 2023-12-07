import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  closureRoleValidationSchema,
  closureRoleDefaultValues,
} from './ClosureRole.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useClosureRole = () => {
  const closureRoleMethods = useForm({
    resolver: yupResolver(closureRoleValidationSchema),
    defaultValues: closureRoleDefaultValues,
  });

  const isSubmit = async () => {
    enqueueSnackbar('Saved Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };
  const { handleSubmit, reset } = closureRoleMethods;
  const handleSubmitClosureRole = handleSubmit(isSubmit);

  return {
    closureRoleMethods,
    handleSubmitClosureRole,
    reset,
  };
};
