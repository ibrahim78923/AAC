import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { permissionValidation, permissionValue } from './Permissions.data';

export const usePermissions = () => {
  const permissionsMethod = useForm({
    resolver: yupResolver(permissionValidation),
    defaultValues: permissionValue,
  });

  const { handleSubmit } = permissionsMethod;

  const onSubmit = async () => {};

  return {
    permissionsMethod,
    handleSubmit,
    onSubmit,
  };
};
