import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import * as Yup from 'yup';
import { usePostReplyForCustomerTicketConversationMutation } from '@/services/airCustomerPortal/Tickets';
import { ARRAY_INDEX } from '@/constants/strings';
import { ReplySingleTicketConversationPropsI } from '../useSingleTicketConversation.interface';
import { REGEX } from '@/constants/validation';
import { useFormLib } from '@/hooks/useFormLib';
import { useMemo } from 'react';
import { getCustomerPortalStyling } from '@/utils';
import { TICKET_CONVERSATIONS_TYPE } from '@/constants/services';

export const useReplySingleTicketConversation = (
  props: ReplySingleTicketConversationPropsI,
) => {
  const { singleTicketData, setIsReplyOpen, isReplyOpen } = props;

  const portalStyles = useMemo(() => getCustomerPortalStyling(), []);

  const { methods, handleSubmit, reset } = useFormLib({
    defaultValues: { yourReply: '', attachFile: null },
    validationSchema: Yup?.object()?.shape({
      yourReply: Yup?.string()
        ?.trim()
        ?.required('Reply is required')
        ?.test('is-not-empty', 'Reply is required', (value) => {
          const strippedContent = value
            ?.replace(REGEX?.GLOBAL_HTML_TAG, '')
            ?.trim();
          return strippedContent !== '';
        }),
      attachFile: Yup?.mixed()?.nullable(),
    }),
  });

  const [
    postReplyForCustomerTicketConversationTrigger,
    postReplyForCustomerTicketConversationStatus,
  ] = usePostReplyForCustomerTicketConversationMutation();

  const onSubmit = async (data: { attachFile: any; yourReply: string }) => {
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
    portalStyles,
  };
};
