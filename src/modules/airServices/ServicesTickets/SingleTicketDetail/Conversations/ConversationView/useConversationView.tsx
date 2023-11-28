import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  EditBlackIcon,
  ShortcutSharpLeftIcon,
  ShortcutSharpRightIcon,
} from '@/assets/icons';
import { ConversationDataI } from '../Conversation.interface';
import {
  TICKETS_CONVERSATION_Description_Type,
  TICKETS_CONVERSATION_TYPE,
} from '@/constants/strings';

export const useConversationView = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  const conversationNoteContent = (conversationData: ConversationDataI) => {
    const content: { [key: string]: string } = {};

    for (const key in conversationData) {
      if (
        key !== TICKETS_CONVERSATION_Description_Type?.NOTE &&
        key !== TICKETS_CONVERSATION_Description_Type?.REPLY &&
        key !== TICKETS_CONVERSATION_Description_Type?.FORWARD &&
        conversationData[key]
      ) {
        content[key] = `${key}: ${conversationData[key]}`;
      }
    }

    return content;
  };

  const conversationActionIcon = (actionType: string) => {
    switch (actionType) {
      case TICKETS_CONVERSATION_TYPE?.NOTE:
        return (
          <>
            <ShortcutSharpLeftIcon />
            <ShortcutSharpRightIcon />
            <EditBlackIcon />
            <DeleteIcon
              sx={{
                color: 'custom.main',
                '&:hover': {
                  color: 'error.main',
                },
              }}
              onClick={handleDelete}
            />
          </>
        );
      case TICKETS_CONVERSATION_TYPE?.FORWARD:
        return (
          <>
            <ShortcutSharpLeftIcon />
            <ShortcutSharpRightIcon />
            <DeleteIcon
              sx={{
                color: 'custom.main',
                '&:hover': {
                  color: 'error.main',
                },
              }}
              onClick={handleDelete}
            />
          </>
        );
      case TICKETS_CONVERSATION_TYPE?.REPLY:
        return (
          <>
            <ShortcutSharpRightIcon />
            <DeleteIcon
              sx={{
                color: 'custom.main',
                '&:hover': {
                  color: 'error.main',
                },
              }}
              onClick={handleDelete}
            />
          </>
        );
      default:
        return null;
    }
  };

  return {
    conversationNoteContent,
    conversationActionIcon,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
  };
};
