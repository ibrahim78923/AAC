import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { permissionValidation, permissionValue } from './Permissions.data';

export const usePermissions = () => {
  const permissionsMethod = useForm({
    resolver: yupResolver(permissionValidation),
    defaultValues: permissionValue,
  });

  const { palette } = useTheme();

  return {
    permissionsMethod,
    palette,
  };
};
