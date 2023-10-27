import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  contractDrawerFormValidationSchema,
  contractDrawerFormDefaultValues,
} from './ContractDrawerForm.data';

export function useContractsDrawerForm() {
  const methodsContractDrawerForm = useForm({
    resolver: yupResolver(contractDrawerFormValidationSchema),
    defaultValues: contractDrawerFormDefaultValues,
  });

  return {
    methodsContractDrawerForm,
    contractDrawerFormValidationSchema,
    contractDrawerFormDefaultValues,
  };
}
