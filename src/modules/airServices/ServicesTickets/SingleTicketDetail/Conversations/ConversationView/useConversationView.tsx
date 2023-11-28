import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  EditBlackIcon,
  ShortcutSharpLeftIcon,
  ShortcutSharpRightIcon,
} from '@/assets/icons';
import { TICKETS_CONVERSATION_TYPE } from '@/constants/strings';

export const useConversationView = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
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
    conversationActionIcon,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
  };
};
