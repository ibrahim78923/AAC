import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import ConversationDiscuss from './ConversationDiscuss';
import ConversationAddComponent from './ConversationAddComponent';
import {
  conversationAddArticleData,
  conversationForwardArray,
  conversationNoteArray,
  conversationReplyArray,
  conversationValidationSchema,
  menuOptionsAddConversation,
} from './Conversation.data';
import {
  NOTISTACK_VARIANTS,
  TICKETS_CONVERSATION_TYPE,
} from '@/constants/strings';

export const UseConversation = () => {
  const [isConversation] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const [addConversation, setAddConversation] = useState<null | HTMLElement>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState(
    menuOptionsAddConversation[0]?.value,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [filteredContent, setFilteredContent] = useState(
    conversationAddArticleData,
  );
  const [editConversationItem, setEditConversationItem] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any>({});
  const theme = useTheme();

  const addConversationModal: any = useForm({
    resolver: yupResolver(conversationValidationSchema(selectedItem)),
    defaultValues: {},
  });

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

  const onSubmit = async () => {
    try {
      const successMessage = `${selectedItem} Added Successfully!`;
      const values = await getValues();
      setSelectedValues((prevValues: any) => {
        return {
          ...prevValues,
          [uuidv4()]: values,
        };
      });

      enqueueSnackbar(successMessage, {
        variant: NOTISTACK_VARIANTS.SUCCESS,
      });
      reset();
      setShow(false);
    } catch (error) {}
  };

  const handleCloseButtonMenu = (e: any = '') => {
    e && setSelectedItem(e);
    setShow(true);
    setAddConversation(null);
    setTitle(e);
    e && setValue(e?.toLocaleLowerCase?.(), e);
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
    const filteredData = conversationAddArticleData?.filter(
      (item) => item?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
    );
    setFilteredContent(filteredData);
  }, [searchTerm]);

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
    searchTerm,
    filteredContent,
    setSearchTerm,
    conversationAddArticleData,
    setValue,
    selectedValues,
    editConversationItem,
    handleEdit,
  };
};
