import { useForm } from 'react-hook-form';
import {
  upsertConversationFormDefaultValues,
  upsertConversationFormFieldsDynamic,
  upsertConversationFormValidationSchema,
} from './UpsertConversation.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useEditTicketConversationNoteMutation,
  usePostConversationMutation,
} from '@/services/airServices/tickets/single-ticket-details/conversation';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import {
  MODULE_TYPE,
  TICKET_CONVERSATIONS_CONTENT_TYPE,
  TICKET_CONVERSATIONS_RESPONSE_TYPE,
} from '@/constants/strings';
import { ArticlesList } from '../ArticlesList';
import { useState } from 'react';
import { CannedResponsesList } from '../CannedResponsesList';
import { AIR_SERVICES } from '@/constants';
import { useTheme } from '@mui/material';
import { findAttributeValues } from '@/utils/file';
import { usePostAttachmentsMutation } from '@/services/airServices/tickets/attachments';

export const useUpsertConversation = (props: any) => {
  const [selectedResponseType, setSelectedResponseType] = useState<any>({});
  const { setIsDrawerOpen, selectedConversationType } = props;
  const theme = useTheme();
  const router = useRouter();
  const { user }: any = useAuth();
  const { ticketId } = router?.query;

  const [postConversationTrigger, postConversationStatus] =
    usePostConversationMutation();
  const [editTicketConversationNoteTrigger, editTicketConversationNoteStatus] =
    useEditTicketConversationNoteMutation();
  const [postAttachmentsTrigger, postAttachmentsStatus] =
    usePostAttachmentsMutation();
  const methods = useForm<any>({
    defaultValues: upsertConversationFormDefaultValues?.({
      conversationType: selectedConversationType?.conversationType,
      from: user?.email,
      ...selectedConversationType,
    }),
    resolver: yupResolver(upsertConversationFormValidationSchema),
  });

  const { handleSubmit, reset, setValue, getValues } = methods;

  const submitUpsertConversation = async (formData: any) => {
    const articleIds = findAttributeValues(
      formData?.html,
      'a[href*="articleId"]',
      'href',
      'articleId',
    );
    const conversationFormData = new FormData();
    conversationFormData?.append(
      'recipients',
      [formData?.recipients]?.toString(),
    );

    conversationFormData?.append(
      'subject',
      selectedConversationType?.conversationType,
    );
    conversationFormData?.append(
      'type',
      selectedConversationType?.conversationType,
    );
    conversationFormData?.append('html', formData?.html);
    conversationFormData?.append('recordId', ticketId as string);
    !!articleIds?.length &&
      conversationFormData?.append('articlesIds', articleIds?.toString());
    formData?.attachments !== null &&
      conversationFormData?.append('attachments', formData?.attachments);

    if (!!selectedConversationType?._id) {
      editConversation?.({ ...formData, articleIds });
      return;
    }

    const apiDataParameter = {
      body: conversationFormData,
    };

    try {
      const response =
        await postConversationTrigger(apiDataParameter)?.unwrap();
      reset?.();
      closeConversationDrawer?.();
      successSnackbar(response?.message);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const editConversation = async (formData: any) => {
    const body = {
      id: selectedConversationType?._id,
      html: formData?.html,
      recordId: ticketId,
      recipients: [formData?.recipients],
      type: selectedConversationType?.conversationType,
      subject: selectedConversationType?.conversationType,
      ...(!!formData?.articleIds?.length
        ? { articlesIds: formData?.articleIds }
        : {}),
    };
    const apiDataParameter = {
      body,
    };

    try {
      await editTicketConversationNoteTrigger(apiDataParameter)?.unwrap();
      closeConversationDrawer?.();
      await submitAttachment?.(formData);
      reset?.();
      successSnackbar('Conversation updated successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const closeConversationDrawer = () => {
    setIsDrawerOpen?.();
    reset?.();
  };

  const setArticleResponse = (article: any, articleType: any) => {
    const htmlContent =
      articleType === TICKET_CONVERSATIONS_CONTENT_TYPE?.CONTENT
        ? article?.details
        : `<a style="color:${theme?.palette?.primary?.main}" 
        href="${AIR_SERVICES?.KNOWLEDGE_BASE_VIEW_ARTICLE}?articleId=${article?._id}">
        Article Link
      </a> <br/>`;

    setValue?.('html', `${getValues?.('html')} ${htmlContent}`);
    setSelectedResponseType({});
  };

  const setCannedResponse = (cannedResponse: any) => {
    setValue?.('html', `${getValues?.('html')} ${cannedResponse?.description}`);
    setSelectedResponseType({});
  };

  const openResponseTypeModal = () => {
    if (
      selectedResponseType?.type === TICKET_CONVERSATIONS_RESPONSE_TYPE?.ARTICLE
    ) {
      return (
        <ArticlesList
          isModalOpen={selectedResponseType}
          setIsModalOpen={setSelectedResponseType}
          setArticleResponse={(item: any, articleType: any) =>
            setArticleResponse?.(item, articleType)
          }
        />
      );
    }
    if (
      selectedResponseType?.type ===
      TICKET_CONVERSATIONS_RESPONSE_TYPE?.CANNED_RESPONSES
    ) {
      return (
        <CannedResponsesList
          isModalOpen={selectedResponseType}
          setIsModalOpen={setSelectedResponseType}
          setCannedResponse={(item: any) => setCannedResponse?.(item)}
        />
      );
    }
    return null;
  };

  const submitAttachment = async (data: any) => {
    const attachmentFormData = new FormData();

    attachmentFormData?.append('fileUrl', data?.attachments);
    attachmentFormData?.append(
      'recordId',
      selectedConversationType?._id as string,
    );
    attachmentFormData?.append('module', MODULE_TYPE?.ASSETS);

    const postAttachmentParameter = {
      body: attachmentFormData,
    };

    try {
      await postAttachmentsTrigger(postAttachmentParameter)?.unwrap();
      successSnackbar('Attachment Added Successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const upsertConversationFormFields = upsertConversationFormFieldsDynamic?.(
    selectedConversationType,
    setSelectedResponseType,
  );
  return {
    submitUpsertConversation,
    handleSubmit,
    postConversationStatus,
    closeConversationDrawer,
    methods,
    upsertConversationFormFields,
    selectedResponseType,
    setSelectedResponseType,
    openResponseTypeModal,
    editTicketConversationNoteStatus,
    postAttachmentsStatus,
  };
};
