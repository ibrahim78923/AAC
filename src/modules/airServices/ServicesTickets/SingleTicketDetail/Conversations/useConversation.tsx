import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import ConversationDiscuss from './ConversationDiscuss';
import ConversationAddComponent from './ConversationAddComponent';
import {
  conversationForwardArray,
  conversationModalsDefaultValues,
  conversationNoteArray,
  conversationReplyArray,
  conversationValidationSchema,
  menuOptionsAddConversation,
} from './Conversation.data';
import {
  NOTISTACK_VARIANTS,
  TICKETS_CONVERSATION_TYPE,
} from '@/constants/strings';
import {
  useGetConversationQuery,
  usePostConversationMutation,
} from '@/services/airServices/tickets/single-ticket-details/conversation';
import { useRouter } from 'next/router';
export const UseConversation = () => {
  const [isConversation] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const [addConversation, setAddConversation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(
    menuOptionsAddConversation[0]?.value,
  );
  const [title, setTitle] = useState('');
  const [postConversation, { isLoading }] = usePostConversationMutation();
  const router = useRouter();

  const [editConversationItem, setEditConversationItem] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any>({});
  const theme = useTheme();
  const addConversationModal: any = useForm({
    resolver: yupResolver(conversationValidationSchema(selectedItem)),
    defaultValues: conversationModalsDefaultValues(null),
  });
  const { ticketId } = router?.query;
  const queryParams = {
    recordId: ticketId,
  };

  const {
    data: emailData,
    isFetching,
    isError,
  } = useGetConversationQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const open = Boolean(addConversation);

  const handleClickButtonMenu = (event: any) => {
    setAddConversation(event?.currentTarget);
  };
  const handleEdit = () => {
    setEditConversationItem(true);
  };
  const { handleSubmit, setValue, getValues, reset } = addConversationModal;

  const handleCloseButtonMenu = (e: any = '') => {
    e && setSelectedItem(e);
    setShow(true);
    setAddConversation(null);
    setTitle(e);
    e && setValue(e?.toLocaleLowerCase?.(), e);
  };

  const submitConversation = async (data: any) => {
    const body = {
      type: 'NOTE',
      recipients: [data?.recaipients],
      ccRecipients: [],
      subject: 'ghg',
      text: data?.text,
      attachments: data?.attachments,
      recordId: ticketId,
      articlesIds: [],
    };
    try {
      const res = await postConversation({ body })?.unwrap();
      enqueueSnackbar(res?.message && 'Add Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      addConversationModal?.reset();
    } catch (error: any) {
      enqueueSnackbar(error?.error?.message ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const getArrayByTitle = (title: any) => {
    switch (title) {
      case TICKETS_CONVERSATION_TYPE?.NOTE:
        return conversationNoteArray;
      case TICKETS_CONVERSATION_TYPE?.REPLY:
        return conversationReplyArray;
      case TICKETS_CONVERSATION_TYPE?.FORWARD:
        return conversationForwardArray;
      default:
        return [];
    }
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case TICKETS_CONVERSATION_TYPE?.NOTE:
      case TICKETS_CONVERSATION_TYPE?.REPLY:
      case TICKETS_CONVERSATION_TYPE?.FORWARD:
        return (
          <ConversationAddComponent
            show={show}
            setShow={setShow}
            addConversationModal={addConversationModal}
            onSubmit={submitConversation}
            dataArray={getArrayByTitle?.(selectedItem)}
          />
        );
      case TICKETS_CONVERSATION_TYPE.DISCUSS:
        return (
          <ConversationDiscuss resetSelectedItem={() => setSelectedItem('')} />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    reset(conversationModalsDefaultValues(selectedItem));
  }, [selectedItem, reset]);

  return {
    isConversation,
    open,
    show,
    setShow,
    handleClickButtonMenu,
    addConversation,
    handleCloseButtonMenu,
    setSelectedItem,
    addConversationModal,
    selectedItem,
    // onSubmit,
    handleSubmit,
    title,
    renderSelectedComponent,
    theme,
    setValue,
    selectedValues,
    editConversationItem,
    handleEdit,
    isLoading,
    setSelectedValues,
    reset,
    getValues,
    emailData,
    isFetching,
    isError,
  };
};
