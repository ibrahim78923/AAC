import {
  defaultValues,
  drawerFormValidationSchema,
} from '../AddRequestApprovalDrawer/DrawerForm/DrawerForm.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export function useAddRequestApprovalDrawer() {
  const methodsDrawerForm = useForm({
    resolver: yupResolver(drawerFormValidationSchema),
    defaultValues,
  });

  const onSubmit = () => {};
  return {
    methodsDrawerForm,
    drawerFormValidationSchema,
    defaultValues,
    onSubmit,
  };
}
