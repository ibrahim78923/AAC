import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addEmailDefaultValues,
  addEmailValidationSchema,
} from './EmailTicket.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostNewEmailMutation } from '@/services/airServices/tickets/single-ticket-details/new-email';

export const useEmailTicket = (props: any) => {
  const { setIsPortalOpen } = props;

  const [trigger, status] = usePostNewEmailMutation();

  const methods: any = useForm({
    resolver: yupResolver(addEmailValidationSchema),
    defaultValues: addEmailDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onClose = () => {
    reset();
    setIsPortalOpen?.({});
  };

  const onSubmit = async (data: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', data?.recipients);
    emailFormData?.append('subject', data?.subject);
    emailFormData?.append('html', data?.html);

    try {
      await trigger(emailFormData)?.unwrap();
      successSnackbar('Email Sent Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    onClose,
    status,
  };
};
