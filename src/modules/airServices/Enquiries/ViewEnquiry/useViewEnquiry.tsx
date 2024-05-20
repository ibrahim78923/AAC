import { usePostNewEmailMutation } from '@/services/airServices/tickets/single-ticket-details/new-email';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useViewEnquiry({ isModalOpen, onClose }: any) {
  const [trigger, status] = usePostNewEmailMutation();

  const methods: any = useForm({
    resolver: yupResolver(
      Yup?.object()?.shape({
        reply: Yup?.string()?.trim()?.required('Reply is Required'),
      }),
    ),
    defaultValues: {
      reply: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', isModalOpen?.data?.[0]?.email);
    emailFormData?.append('subject', isModalOpen?.data?.[0]?.query);
    emailFormData?.append('html', data?.reply);

    try {
      await trigger(emailFormData)?.unwrap();
      successSnackbar('Reply Sent Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  return { methods, handleSubmit, onSubmit, status };
}
