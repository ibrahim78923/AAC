import { useForm } from 'react-hook-form';

import {
  addServiceLevelFormDefaultValues,
  addServiceLevelFormFieldsDynamic,
} from './AddServiceLevel.data';
import { successSnackbar } from '@/utils/api';

export const useAddServiceLevel = (props: any) => {
  const { setIsDrawerOpen } = props;

  const methods = useForm({
    defaultValues: addServiceLevelFormDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    setIsDrawerOpen?.(false);
    successSnackbar('Service Level Added Successfully');
  };

  const cancelAddServiceLevelForm = async () => {
    setIsDrawerOpen?.(false);
  };

  const addServiceLevelFormFields = addServiceLevelFormFieldsDynamic;
  return {
    methods,
    handleSubmit,
    onSubmit,
    cancelAddServiceLevelForm,
    addServiceLevelFormFields,
    reset,
  };
};
