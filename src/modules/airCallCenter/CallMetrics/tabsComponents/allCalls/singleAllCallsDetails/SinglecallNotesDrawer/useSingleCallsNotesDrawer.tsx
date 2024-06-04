import { useForm } from 'react-hook-form';

import { successSnackbar } from '@/utils/api';
import {
  viewCallNotesFormDefaultValues,
  viewCallNotesFormFieldsDynamic,
} from './useSingleCallsNotesDrawer.data';

export const useSingleCallsNotesDrawer = (props: any) => {
  const { isViewDrawerOpen, setIsViewDrawerOpen } = props;

  const methods = useForm({
    defaultValues: viewCallNotesFormDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    setIsViewDrawerOpen?.(false);
    successSnackbar('Call Notes Added Successfully');
  };

  const cancelCallNotes = async () => {
    setIsViewDrawerOpen?.(false);
  };

  const viewCallNotesFormFields = viewCallNotesFormFieldsDynamic();
  return {
    methods,
    handleSubmit,
    onSubmit,
    cancelCallNotes,
    viewCallNotesFormFields,
    reset,
    isViewDrawerOpen,
    setIsViewDrawerOpen,
  };
};
