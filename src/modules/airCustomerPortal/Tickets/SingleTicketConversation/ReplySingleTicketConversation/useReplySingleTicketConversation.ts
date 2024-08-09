import { useForm } from 'react-hook-form';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { usePostReplyForCustomerTicketConversationMutation } from '@/services/airCustomerPortal/Tickets';
import { ARRAY_INDEX, TICKET_CONVERSATIONS_TYPE } from '@/constants/strings';

export const useReplySingleTicketConversation = (props: any) => {
  const { singleTicketData, setIsReplyOpen, isReplyOpen } = props;

  const methods: any = useForm({
    defaultValues: { yourReply: '', attachFile: null },
    resolver: yupResolver(
      Yup?.object()?.shape({
        yourReply: Yup?.string()
          ?.trim()
          ?.required('Reply is required')
          ?.test('is-not-empty', 'Reply is required', (value) => {
            const strippedContent = value?.replace(/<[^>]*>/g, '')?.trim();
            return strippedContent !== '';
          }),
        attachFile: Yup?.mixed()?.nullable(),
      }),
    ),
  });

  const [
    postReplyForCustomerTicketConversationTrigger,
    postReplyForCustomerTicketConversationStatus,
  ] = usePostReplyForCustomerTicketConversationMutation();
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const emailFormData = new FormData();
    emailFormData?.append(
      'recipients',
      isReplyOpen?.data?.recipients?.[ARRAY_INDEX?.ZERO],
    );
    emailFormData?.append('html', data?.yourReply);
    emailFormData?.append('subject', singleTicketData?.subject);
    emailFormData?.append('type', TICKET_CONVERSATIONS_TYPE?.REPLY);
    emailFormData?.append('recordId', isReplyOpen?.data?.recordId);
    data?.attachFile !== null &&
      emailFormData?.append('attachments', data?.attachFile);

    const apiDataParameter = {
      body: emailFormData,
    };

    try {
      await postReplyForCustomerTicketConversationTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar('Your reply has been sent!');
      closeReply?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeReply = () => {
    reset();
    setIsReplyOpen?.({});
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    postReplyForCustomerTicketConversationStatus,
    closeReply,
  };
};
