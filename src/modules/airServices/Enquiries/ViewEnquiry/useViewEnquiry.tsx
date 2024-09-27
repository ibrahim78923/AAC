import { usePostNewEmailMutation } from '@/services/airServices/tickets/single-ticket-details/new-email';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IChildModalState } from '../Enquiries.interface';
import { ARRAY_INDEX } from '@/constants/strings';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { CHARACTERS_LIMIT } from '@/constants/validation';

export default function useViewEnquiry({
  isModalOpen,
  onClose,
}: IChildModalState) {
  const [trigger, status] = usePostNewEmailMutation();

  const methods = useForm({
    resolver: yupResolver(
      Yup?.object()?.shape({
        reply: Yup?.string()
          ?.trim()
          ?.max(
            CHARACTERS_LIMIT?.SERVICES_ENQUIRIES_VIEW_REPLY_MAX_CHARACTERS,
            `Maximum Characters Limit is ${CHARACTERS_LIMIT?.SERVICES_ENQUIRIES_VIEW_REPLY_MAX_CHARACTERS} `,
          )
          ?.required('Reply is Required'),
      }),
    ),
    defaultValues: {
      reply: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const emailFormData = new FormData();
    emailFormData?.append(
      'recipients',
      isModalOpen?.data?.[ARRAY_INDEX?.ZERO]?.email,
    );
    emailFormData?.append(
      'subject',
      isModalOpen?.data?.[ARRAY_INDEX?.ZERO]?.query,
    );
    emailFormData?.append('html', `<p>${data?.reply}</p>`);

    try {
      await trigger(emailFormData)?.unwrap();
      successSnackbar('Reply Sent Successfully!');
      onClose?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      onClose?.();
    }
  };

  return { methods, handleSubmit, onSubmit, status };
}
