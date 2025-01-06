import {
  NOTE,
  upsertConversationFormDefaultValues,
  upsertConversationFormFieldsDynamic,
  upsertConversationFormValidationSchema,
} from './UpsertConversation.data';
import {
  useAddServicesTicketsSingleConversationMutation,
  useUpdateServicesTicketSingleConversationNoteMutation,
} from '@/services/airServices/tickets/single-ticket-details/conversation';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import {
  MODULE_TYPE,
  TICKET_CONVERSATIONS_CONTENT_TYPE,
} from '@/constants/strings';
import { ArticlesList } from '../ArticlesList';
import { CannedResponsesList } from '../CannedResponsesList';
import { useTheme } from '@mui/material';
import { findAttributeValues } from '@/utils/file';
import { usePostAttachmentsMutation } from '@/services/airServices/tickets/attachments';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalClose,
  setIsResponsePortalClose,
} from '@/redux/slices/airServices/ticket-conversation/slice';
import {
  TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT,
  TICKET_CONVERSATION_RESPONSE_PORTAL_ACTIONS_CONSTANT,
} from '../Conversations.data';
import { useGetTicketConversationList } from '../../../TicketsServicesHooks/useGetTicketConversationList';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AIR_SERVICES } from '@/constants/routes';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertConversation = () => {
  const { getTicketConversationListData } = useGetTicketConversationList?.();

  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketConversation?.isPortalOpen,
  );

  const isResponsePortalOpen = useAppSelector(
    (state) => state?.servicesTicketConversation?.isResponsePortalOpen,
  );

  const theme = useTheme();
  const router = useRouter();
  const { user }: any = useAuth();
  const { ticketId } = router?.query;

  const portalAction = isPortalOpen?.action;

  const [postConversationTrigger, postConversationStatus] =
    useAddServicesTicketsSingleConversationMutation();

  const [editTicketConversationNoteTrigger, editTicketConversationNoteStatus] =
    useUpdateServicesTicketSingleConversationNoteMutation();

  const [postAttachmentsTrigger, postAttachmentsStatus] =
    usePostAttachmentsMutation();

  const formLibProps = {
    validationSchema: upsertConversationFormValidationSchema,
    defaultValues: upsertConversationFormDefaultValues?.({
      conversationType: portalAction?.includes(NOTE) ? NOTE : portalAction,
      from: user?.email,
      action: portalAction,
      ...isPortalOpen?.data,
    }),
  };

  const { handleSubmit, reset, setValue, getValues, methods } =
    useFormLib(formLibProps);

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

    conversationFormData?.append('subject', formData?.type?.toUpperCase());
    conversationFormData?.append('type', formData?.type?.toUpperCase());
    conversationFormData?.append('html', formData?.html);
    conversationFormData?.append('recordId', ticketId as string);
    !!articleIds?.length &&
      conversationFormData?.append('articlesIds', articleIds?.toString());
    formData?.attachments !== null &&
      conversationFormData?.append('attachments', formData?.attachments);

    if (
      portalAction === TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.EDIT_NOTE
    ) {
      editConversation?.({ ...formData, articleIds });
      return;
    }

    const apiDataParameter = {
      body: conversationFormData,
    };

    try {
      const response =
        await postConversationTrigger(apiDataParameter)?.unwrap();
      successSnackbar(response?.message);
      closePortal?.();
      await getTicketConversationListData?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const editConversation = async (formData: any) => {
    const body = {
      id: isPortalOpen?.data?._id,
      html: formData?.html,
      recordId: ticketId,
      recipients: [formData?.recipients],
      type: formData?.type?.toUpperCase(),
      subject: formData?.type?.toUpperCase(),
      ...(!!formData?.articleIds?.length
        ? { articlesIds: formData?.articleIds }
        : {}),
    };

    const apiDataParameter = {
      body,
    };

    try {
      await editTicketConversationNoteTrigger(apiDataParameter)?.unwrap();
      if (formData?.attachments !== null) await submitAttachment?.(formData);
      successSnackbar('Conversation updated successfully');
      closePortal?.();
      await getTicketConversationListData?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closePortal = () => {
    reset?.();
    dispatch(setIsPortalClose());
  };

  const setArticleResponse = (article: any, articleType: any) => {
    const htmlContent =
      articleType === TICKET_CONVERSATIONS_CONTENT_TYPE?.CONTENT
        ? article?.details
        : `<a style="color:${theme?.palette?.primary?.main}" 
        href="${window?.location?.origin}${AIR_SERVICES?.KNOWLEDGE_BASE_VIEW_ARTICLE}?articleId=${article?._id}">
        Article Link
      </a> <br/>`;

    setValue?.('html', `${getValues?.('html')} ${htmlContent}`);
    dispatch(setIsResponsePortalClose());
  };

  const setCannedResponse = (cannedResponse: any) => {
    setValue?.('html', `${getValues?.('html')} ${cannedResponse?.message}`);
    dispatch(setIsResponsePortalClose());
  };

  const ticketsConversationResponsePortalActionComponent = {
    [TICKET_CONVERSATION_RESPONSE_PORTAL_ACTIONS_CONSTANT?.ARTICLE_REPONSE]: (
      <ArticlesList
        setArticleResponse={(item: any, articleType: any) =>
          setArticleResponse?.(item, articleType)
        }
      />
    ),
    [TICKET_CONVERSATION_RESPONSE_PORTAL_ACTIONS_CONSTANT?.CANNED_RESPONSE]: (
      <CannedResponsesList
        setCannedResponse={(item: any) => setCannedResponse?.(item)}
      />
    ),
  };

  const submitAttachment = async (data: any) => {
    const attachmentFormData = new FormData();

    attachmentFormData?.append('fileUrl', data?.attachments);
    attachmentFormData?.append('recordId', isPortalOpen?.data?._id as string);
    attachmentFormData?.append('module', MODULE_TYPE?.TICKET);

    const postAttachmentParameter = {
      body: attachmentFormData,
    };

    try {
      await postAttachmentsTrigger(postAttachmentParameter)?.unwrap();
    } catch (error: any) {}
  };

  const upsertConversationFormFields =
    upsertConversationFormFieldsDynamic?.(portalAction);

  const apiCallInProgress =
    postConversationStatus?.isLoading ||
    editTicketConversationNoteStatus?.isLoading ||
    postAttachmentsStatus?.isLoading;

  return {
    submitUpsertConversation,
    handleSubmit,
    closePortal,
    methods,
    upsertConversationFormFields,
    isPortalOpen,
    apiCallInProgress,
    isResponsePortalOpen,
    ticketsConversationResponsePortalActionComponent,
  };
};
