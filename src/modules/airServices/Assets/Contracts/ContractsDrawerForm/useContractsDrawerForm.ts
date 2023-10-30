import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  contractsDrawerFormValidationSchema,
  defaultValues,
} from './filterContractsForm.data';

export function useContractsDrawerForm() {
  const methodsDrawerFormForm = useForm({
    resolver: yupResolver(contractsDrawerFormValidationSchema),
    defaultValues,
  });

  return {
    methodsDrawerFormForm,
    contractsDrawerFormValidationSchema,
    defaultValues,
  };
}
