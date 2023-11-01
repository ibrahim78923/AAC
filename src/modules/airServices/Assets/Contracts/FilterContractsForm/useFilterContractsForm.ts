import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  filterContractsFormValidationSchema,
  defaultValues,
} from './FilterContractsForm.data';

export function useFilterContractsForm() {
  const methods = useForm({
    resolver: yupResolver(filterContractsFormValidationSchema),
    defaultValues,
  });

  return {
    methods,
    filterContractsFormValidationSchema,
    defaultValues,
  };
}
