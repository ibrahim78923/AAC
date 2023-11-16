import { useState } from 'react';
import {
  conversationAddArticleData,
  conversationModalsDefaultValues,
  conversationModalsValidation,
  menuOptionsAddConversation,
} from './Conversation.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ConversationNote from './ConversationNote';
import ConversationReply from './ConversationReply';
import ConversationForward from './ConversationForward';
import ConversationDiscuss from './ConversationDiscuss';
import { useTheme } from '@mui/material';

const UseConversation = () => {
  const [isConversation] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const [addConversation, setAddConversation] = useState<null | HTMLElement>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState(
    menuOptionsAddConversation[0]?.value,
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = conversationAddArticleData?.filter(
    (item) => item?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  );

  const [title, setTitle] = useState('');

  const theme = useTheme();

  const addConversationModal: any = useForm({
    resolver: yupResolver(conversationModalsValidation),
    defaultValues: conversationModalsDefaultValues,
  });

  const onSubmit = (data: any) => data;
  const open = Boolean(addConversation);

  const handleClickButtonMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAddConversation(event?.currentTarget);
  };

  const handleCloseButtonMenu = (e: any) => {
    setSelectedItem(e?.target?.value);
    setShow(true);
    setAddConversation(null);

    setTitle(e?.target?.value);
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case 'Note':
        return (
          <ConversationNote
            selectedItem={selectedItem}
            show={show}
            setShow={setShow}
            addConversationModal={addConversationModal}
            onSubmit={onSubmit}
          />
        );
      case 'Reply':
        return (
          <ConversationReply
            selectedItem={selectedItem}
            show={show}
            setShow={setShow}
            addConversationModal={addConversationModal}
            onSubmit={onSubmit}
          />
        );
      case 'Forward':
        return (
          <ConversationForward
            selectedItem={selectedItem}
            show={show}
            setShow={setShow}
            addConversationModal={addConversationModal}
            onSubmit={onSubmit}
          />
        );
      case 'Discuss':
        return (
          <ConversationDiscuss
            resetSelectedItem={() => setSelectedItem(null)}
          />
        );
      default:
        return null;
    }
  };

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
    title,
    renderSelectedComponent,
    theme,
    searchTerm,
    filteredContent,
    setSearchTerm,
    conversationAddArticleData,
  };
};

export default UseConversation;
