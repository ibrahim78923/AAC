import { useState, useEffect } from 'react';
import {
  conversationAddArticleData,
  conversationModalsDefaultValues,
  conversationModalsValidation,
  menuOptionsAddConversation,
  conversationNoteArray,
  conversationReplyArray,
  conversationForwardArray,
} from './Conversation.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import ConversationDiscuss from './ConversationDiscuss';
import ConversationAddComponent from './ConversationAddComponent';

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
  const theme = useTheme();
  const addConversationModal: any = useForm({
    resolver: yupResolver(conversationModalsValidation),
    defaultValues: conversationModalsDefaultValues,
  });

  const open = Boolean(addConversation);

  const handleClickButtonMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAddConversation(event?.currentTarget);
  };

  const { handleSubmit } = addConversationModal;

  const onSubmit = async () => {
    enqueueSnackbar('Note Add Successfully!', {
      variant: 'success',
    });
    setShow(false);
  };

  const handleCloseButtonMenu = (e: any) => {
    setSelectedItem(e?.target?.value);
    setShow(true);
    setAddConversation(null);
    setTitle(e?.target?.value);
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
    // Set default values when the component mounts
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
  };
};
