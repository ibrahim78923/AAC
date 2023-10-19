import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  drawerFormValidationSchema,
  defaultValues,
} from './DrawerForm/DrawerForm.data';

export function useContractsForm() {
  const methodsDrawerFormForm = useForm({
    resolver: yupResolver(drawerFormValidationSchema),
    defaultValues,
  });

  return {
    methodsDrawerFormForm,
    drawerFormValidationSchema,
    defaultValues,
  };
}
