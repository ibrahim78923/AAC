import { useForm } from 'react-hook-form';

import {
  addCallTagsFormDefaultValues,
  addCallTagsFormFieldsDynamic,
} from './AddCallTags.data';
import { successSnackbar } from '@/utils/api';

export const useAddCallTags = (props: any) => {
  const { setIsDrawerOpen } = props;

  const methods = useForm({
    defaultValues: addCallTagsFormDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    setIsDrawerOpen?.(false);
    successSnackbar('Call Tag Added Successfully');
  };

  const cancelAddCallTagsForm = async () => {
    setIsDrawerOpen?.(false);
  };

  const addCallTagsFormFields = addCallTagsFormFieldsDynamic;
  return {
    methods,
    handleSubmit,
    onSubmit,
    cancelAddCallTagsForm,
    addCallTagsFormFields,
    reset,
  };
};
