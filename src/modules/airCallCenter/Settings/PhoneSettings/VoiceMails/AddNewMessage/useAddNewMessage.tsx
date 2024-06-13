import { useForm } from 'react-hook-form';

import {
  addNewMessageFormDefaultValues,
  addNewMessageFormFieldsDynamic,
} from './AddNewMessage.data';
import { successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useAddNewMessage = (props: any) => {
  const { setIsDrawerOpen } = props;
  const [value, setValue] = useState(0);

  const methods = useForm({
    defaultValues: addNewMessageFormDefaultValues()[value],
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    setIsDrawerOpen?.(false);
    successSnackbar('New Message Added Successfully');
  };

  const cancelAddNewMessageForm = async () => {
    setIsDrawerOpen?.(false);
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addNewMessageFormFields = addNewMessageFormFieldsDynamic[value];
  return {
    methods,
    handleSubmit,
    onSubmit,
    cancelAddNewMessageForm,
    addNewMessageFormFields,
    reset,
    value,
    handleChange,
  };
};
