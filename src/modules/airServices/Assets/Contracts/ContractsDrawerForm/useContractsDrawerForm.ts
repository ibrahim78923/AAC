import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  contractDrawerFormValidationSchema,
  contractDrawerFormDeaultValues,
} from './ContractDrawerForm/ContractDrawerForm.data';

export function useContractsDrawerForm() {
  const methodsContractDrawerForm = useForm({
    resolver: yupResolver(contractDrawerFormValidationSchema),
    contractDrawerFormDeaultValues,
  });

  return {
    methodsContractDrawerForm,
    contractDrawerFormValidationSchema,
    contractDrawerFormDeaultValues,
  };
}
