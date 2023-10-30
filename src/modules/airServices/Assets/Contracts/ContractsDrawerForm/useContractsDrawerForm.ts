import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  ContractsDrawerFormValidationSchema,
  ContractsDrawerFormDefaultValues,
} from './ContractsDrawerForm.data';

export function useContractsDrawerForm() {
  const methodsDrawerFormForm = useForm({
    resolver: yupResolver(ContractsDrawerFormValidationSchema),
    ContractsDrawerFormDefaultValues,
  });

  return {
    methodsDrawerFormForm,
    ContractsDrawerFormValidationSchema,
    ContractsDrawerFormDefaultValues,
  };
}
