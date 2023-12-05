import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { permissionValidation, permissionValue } from './Permissions.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const usePermissions = () => {
  const permissionsMethod = useForm({
    resolver: yupResolver(permissionValidation),
    values: permissionValue,
  });
  const submitForm = async () => {
    enqueueSnackbar('Permissions Saved Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  const { handleSubmit, reset } = permissionsMethod;
  const handleSubmitPermissions = handleSubmit(submitForm);
  const { palette } = useTheme();
  return {
    permissionsMethod,
    handleSubmitPermissions,
    reset,
    palette,
  };
};
