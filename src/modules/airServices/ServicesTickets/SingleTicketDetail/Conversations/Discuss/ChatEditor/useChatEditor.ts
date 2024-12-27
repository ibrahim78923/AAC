import {
  chatEditorFormDefaultValues,
  chatEditorFormValidationSchema,
} from './ChatEditor.data';
import {
  usePostDiscussionsOfTicketConversationMutation,
  useUpdateDiscussionsOfTicketConversationMutation,
} from '@/services/airServices/tickets/single-ticket-details/conversation/discussion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useChatEditor = (props: any) => {
  const { selectedMessage, setSelectedMessage } = props;

  const router = useRouter();
  const { ticketId } = router?.query;

  const formLibProps = {
    validationSchema: chatEditorFormValidationSchema,
    defaultValues: chatEditorFormDefaultValues?.(),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const [
    postDiscussionsOfTicketConversationTrigger,
    postDiscussionsOfTicketConversationStatus,
  ] = usePostDiscussionsOfTicketConversationMutation();

  const [
    updateDiscussionsOfTicketConversationTrigger,
    updateDiscussionsOfTicketConversationStatus,
  ] = useUpdateDiscussionsOfTicketConversationMutation();

  useEffect(() => {
    reset(() => chatEditorFormDefaultValues?.(selectedMessage));
  }, [reset, selectedMessage?._id, selectedMessage?.isEdit]);

  const submitMessage = async (data: any) => {
    const body = {
      ticketId,
      text: data?.text,
      ...(selectedMessage?.isReply
        ? {
            reply: data?.text,
            text: !!selectedMessage?.reply
              ? selectedMessage?.reply
              : selectedMessage?.text,
          }
        : {}),
    };
    const postApiDataParameter = {
      body: body,
    };
    if (!!selectedMessage?._id && selectedMessage?.isEdit) {
      updateMessage?.(body);
      return;
    }
    try {
      const response =
        await postDiscussionsOfTicketConversationTrigger(
          postApiDataParameter,
        )?.unwrap();
      successSnackbar(response?.message);
      reset();
      setSelectedMessage?.({});
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const updateMessage = async (data: any) => {
    const body = {
      discussionId: selectedMessage?._id,
      ticketId,
      text: data?.text,
      ...(!!selectedMessage?.reply
        ? {
            reply: data?.text,
            text: selectedMessage?.text,
          }
        : {}),
    };

    const postApiDataParameter = {
      body: body,
    };
    try {
      const response =
        await updateDiscussionsOfTicketConversationTrigger(
          postApiDataParameter,
        )?.unwrap();
      successSnackbar(response?.message);
      reset?.();
      setSelectedMessage?.({});
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    handleSubmit,
    reset,
    methods,
    submitMessage,
    postDiscussionsOfTicketConversationStatus,
    updateDiscussionsOfTicketConversationStatus,
  };
};
