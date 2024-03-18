import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addEmailDefaultValues,
  addEmailValidationSchema,
} from './NewEmailDrawer.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostNewEmailMutation } from '@/services/airServices/tickets/single-ticket-details/new-email';

export const useNewEmailDrawer = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const [trigger] = usePostNewEmailMutation();

  const methods: any = useForm({
    resolver: yupResolver(addEmailValidationSchema),
    defaultValues: addEmailDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onClose = () => {
    reset(addEmailDefaultValues);
    setIsDrawerOpen?.(false);
  };

  const onSubmit = async (data: any) => {
    const updatedData = {
      ...data,
      type: 'NEW_EMAIL',
    };
    try {
      await trigger(updatedData)?.unwrap();
      successSnackbar('Email Sent Successfully!');
      reset(addEmailDefaultValues);
      setIsDrawerOpen?.(false);
    } catch (error) {
      errorSnackbar();
      reset(addEmailDefaultValues);
      setIsDrawerOpen?.(false);
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    isDrawerOpen,
    setIsDrawerOpen,
    onClose,
  };
};
