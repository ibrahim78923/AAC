import { useForm } from 'react-hook-form';
import {
  chatEditorFormDefaultValues,
  chatEditorFormValidationSchema,
} from './ChatEditor.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePostDiscussionsOfTicketConversationMutation,
  useUpdateDiscussionsOfTicketConversationMutation,
} from '@/services/airServices/tickets/single-ticket-details/conversation/discussion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useChatEditor = (props: any) => {
  const { selectedMessage, setSelectedMessage } = props;

  const router = useRouter();
  const { ticketId } = router?.query;

  const method = useForm({
    defaultValues: chatEditorFormDefaultValues?.(),
    resolver: yupResolver(chatEditorFormValidationSchema),
  });

  const [
    postDiscussionsOfTicketConversationTrigger,
    postDiscussionsOfTicketConversationStatus,
  ] = usePostDiscussionsOfTicketConversationMutation();

  const [
    updateDiscussionsOfTicketConversationTrigger,
    updateDiscussionsOfTicketConversationStatus,
  ] = useUpdateDiscussionsOfTicketConversationMutation();

  const { handleSubmit, reset } = method;

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
    method,
    submitMessage,
    postDiscussionsOfTicketConversationStatus,
    updateDiscussionsOfTicketConversationStatus,
  };
};
