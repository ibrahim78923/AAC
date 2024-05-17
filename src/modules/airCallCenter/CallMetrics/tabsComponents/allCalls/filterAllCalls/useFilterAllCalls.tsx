import { useForm } from 'react-hook-form';

import {
  allcallsFilterFormDefaultValues,
  allcallsFilterFormFieldsDynamic,
} from './filterAllcalls.data';
import { successSnackbar } from '@/utils/api';

export const useFilterAllCalls = (props: any) => {
  const { setIsDrawerOpen } = props;

  const methods = useForm({
    defaultValues: allcallsFilterFormDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    setIsDrawerOpen?.(false);
    successSnackbar('Filter Applied Successfully');
  };

  const cancelContractFilterForm = async () => {
    setIsDrawerOpen?.(false);
  };

  const allCallsFilterFormFields = allcallsFilterFormFieldsDynamic();
  return {
    methods,
    handleSubmit,
    onSubmit,
    cancelContractFilterForm,
    allCallsFilterFormFields,
    reset,
  };
};
