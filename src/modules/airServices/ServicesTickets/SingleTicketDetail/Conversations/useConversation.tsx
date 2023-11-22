// UseConversation.tsx
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
  conversationModalsDefaultValues,
  conversationNoteArray,
  conversationReplyArray,
  getValidationSchema,
  menuOptionsAddConversation,
} from './Conversation.data';

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
  const [selectedValues, setSelectedValues] = useState<any>({});
  const theme = useTheme();

  const addConversationModal: any = useForm({
    resolver: yupResolver(getValidationSchema(selectedItem)),
    defaultValues: conversationModalsDefaultValues[selectedItem] || {},
  });

  const open = Boolean(addConversation);

  const handleClickButtonMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAddConversation(event?.currentTarget);
  };

  const { handleSubmit, setValue, getValues } = addConversationModal;

  const onSubmit = async () => {
    try {
      const successMessage = `${selectedItem} Add Successfully!`;
      setSelectedValues((prevValues) => ({
        ...prevValues,
        [uuidv4()]: getValues(),
      }));

      enqueueSnackbar(successMessage, {
        variant: 'success',
      });

      addConversationModal.reset();
      setShow(false);
    } catch (error) {}
  };

  const handleCloseButtonMenu = (e: any) => {
    const newSelectedItem = e?.target?.value;
    setSelectedItem(newSelectedItem);
    setShow(true);
    setAddConversation(null);
    setTitle(newSelectedItem);
  };

  const getArrayByTitle = (title) => {
    switch (title) {
      case 'Note':
        return conversationNoteArray;
      case 'Reply':
        return conversationReplyArray;
      case 'Forward':
        return conversationForwardArray;
      default:
        return [];
    }
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case 'Note':
      case 'Reply':
      case 'Forward':
        return (
          <ConversationAddComponent
            show={show}
            setShow={setShow}
            addConversationModal={addConversationModal}
            onSubmit={handleSubmit(onSubmit)}
            dataArray={getArrayByTitle(selectedItem)}
          />
        );
      case 'Discuss':
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
  };
};
