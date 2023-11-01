import { useState } from 'react';
import {
  conversationModelsDefaultValues,
  conversationModelsValidation,
  menuOptionsAddconversation,
} from './Conversation.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const userCoversation = () => {
  const [isConversation] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const [addCoversation, setAddCoversation] = useState<null | HTMLElement>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState(
    menuOptionsAddconversation[0].value,
  );

  // Add state for title
  const [title, setTitle] = useState('');

  const addCoversationModel: any = useForm({
    resolver: yupResolver(conversationModelsValidation),
    defaultValues: conversationModelsDefaultValues,
  });
  const onSubmit = (data: any) => data;
  const open = Boolean(addCoversation);

  const handleClickButtonMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAddCoversation(event.currentTarget);
  };

  const handleCloseButtonMenu = (e: any) => {
    setSelectedItem(e.target.value);
    setShow(true);
    setAddCoversation(null);

    // Set the title based on the selected item
    setTitle(e.target.value);
    // just for desgin will remove
    // setIsConversation(!isConversation);
  };

  return {
    isConversation,
    open,
    show,
    setShow,
    handleClickButtonMenu,
    addCoversation,
    handleCloseButtonMenu,
    setSelectedItem,
    addCoversationModel,
    selectedItem,
    onSubmit,
    title, // Include title in the returned object
  };
};

export default userCoversation;
