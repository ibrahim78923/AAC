import { useState } from 'react';
import {
  conversationModalsDefaultValues,
  conversationModalsValidation,
  menuOptionsAddConversation,
} from './Conversation.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const userConversation = () => {
  const [isConversation] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const [addConversation, setAddConversation] = useState<null | HTMLElement>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState(
    menuOptionsAddConversation[0].value,
  );

  // Add state for title
  const [title, setTitle] = useState('');

  const addConversationModal: any = useForm({
    resolver: yupResolver(conversationModalsValidation),
    defaultValues: conversationModalsDefaultValues,
  });
  const onSubmit = (data: any) => data;
  const open = Boolean(addConversation);

  const handleClickButtonMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAddConversation(event.currentTarget);
  };

  const handleCloseButtonMenu = (e: any) => {
    setSelectedItem(e.target.value);
    setShow(true);
    setAddConversation(null);

    setTitle(e.target.value);
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
  };
};

export default userConversation;
