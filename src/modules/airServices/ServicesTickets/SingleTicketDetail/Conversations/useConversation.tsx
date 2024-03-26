import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import ConversationDiscuss from './ConversationDiscuss';
import ConversationAddComponent from './ConversationAddComponent';
import {
  conversationAddArticleData,
  conversationForwardArray,
  conversationModalsDefaultValues,
  conversationNoteArray,
  conversationReplyArray,
  conversationValidationSchema,
  menuOptionsAddConversation,
} from './Conversation.data';
import { useSearchParams } from 'next/navigation';
import {
  NOTISTACK_VARIANTS,
  TICKETS_CONVERSATION_TYPE,
} from '@/constants/strings';
import {
  useGetConversationQuery,
  usePostConversationMutation,
} from '@/services/airServices/tickets/single-ticket-details/conversation';
// import { useSearchParams } from 'next/navigation';

export const UseConversation = () => {
  const [isConversation] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const [addConversation, setAddConversation] = useState<null | HTMLElement>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState(
    menuOptionsAddConversation[0]?.value,
  );
  const [title, setTitle] = useState('');
  const [postConversation, { isLoading }] = usePostConversationMutation();

  const [editConversationItem, setEditConversationItem] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any>({});
  const theme = useTheme();
  const searchParams = useSearchParams();
  const addConversationModal: any = useForm({
    resolver: yupResolver(conversationValidationSchema(selectedItem)),
    defaultValues: conversationModalsDefaultValues(null),
  });
  const ticketId = searchParams?.get?.('ticketId');
  const getEmailParams = {
    queryParams: {
      recordId: ticketId,
    },
  };

  const {
    data: emailData,
    // isFetching,
    // isError,
  } = useGetConversationQuery(getEmailParams, {
    refetchOnMountOrArgChange: true,
  });
  // console.log(emailData);

  const open = Boolean(addConversation);

  const handleClickButtonMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAddConversation(event?.currentTarget);
  };
  const handleEdit = () => {
    setEditConversationItem(true);
  };
  const { handleSubmit, setValue, getValues, reset } = addConversationModal;

  // const onSubmit = async () => {
  //   try {
  //     const successMessage = `${selectedItem} Added Successfully!`;
  //     const values = await getValues();
  //     setSelectedValues((prevValues: any) => {
  //       return {
  //         ...prevValues,
  //         [uuidv4()]: values,
  //       };
  //     });

  //     enqueueSnackbar(successMessage, {
  //       variant: NOTISTACK_VARIANTS.SUCCESS,
  //     });
  //     reset();
  //     setShow(false);
  //   } catch (error) {}
  // };

  const handleCloseButtonMenu = (e: any = '') => {
    e && setSelectedItem(e);
    setShow(true);
    setAddConversation(null);
    setTitle(e);
    e && setValue(e?.toLocaleLowerCase?.(), e);
  };

  const submitConversation = async (data: any) => {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('recipients', data.recipients);
    formData.append('ccRecipients', data.ccRecipients);
    formData.append('subject', 'Subject');
    formData.append('text', data.text);
    // const params = {
    //   type: data?.type,
    //   recaipients: data?.recaipients,
    //   ccRecipients: data?.ccRecipients,
    //   subject: 'ghg',
    //   text: data?.text,
    //   attachments: data?.attachments,
    // };
    // console.log('Data submitted to the API: ', data);
    // console.log(formData);

    try {
      const res = await postConversation(formData)?.unwrap();
      enqueueSnackbar(res?.message && 'Add Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      // addConversationModal?.reset();
    } catch (error: any) {
      enqueueSnackbar(error?.error?.message ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const onSubmit = () => {
    addConversationModal.handleSubmit(submitConversation)();
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
            onSubmit={handleSubmit(onSubmit)}
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
    renderSelectedComponent();
  }, [selectedItem]);

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
    onSubmit,
    handleSubmit,
    title,
    renderSelectedComponent,
    theme,
    conversationAddArticleData,
    setValue,
    selectedValues,
    editConversationItem,
    handleEdit,
    isLoading,
    setSelectedValues,
    reset,
    getValues,
    emailData,
  };
};
