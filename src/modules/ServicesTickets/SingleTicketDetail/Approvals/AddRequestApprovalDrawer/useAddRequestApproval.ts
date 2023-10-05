import {
  DrawerFormDefaultValues,
  DrawerFormValidationSchema,
} from '../AddRequestApprovalDrawer/DrawerForm/DrawerForm.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export function useAddRequestApprovalDrawer() {
  const methodsDrawerFormForm = useForm({
    resolver: yupResolver(DrawerFormValidationSchema),
    defaultValues: DrawerFormDefaultValues,
  });

  const onSubmit = () => {};
  return {
    methodsDrawerFormForm,
    DrawerFormValidationSchema,
    DrawerFormDefaultValues,
    onSubmit,
  };
}
