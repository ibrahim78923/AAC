import {
  EditBlackIcon,
  ShortcutSharpLeftIcon,
  ShortcutSharpRightIcon,
} from '@/assets/icons';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConversationDataI } from '../Conversation.interface';
export const useConversationView = () => {
  const conversationNoteContent = (conversationData: ConversationDataI) => {
    const content: { [key: string]: string } = {};

    for (const key in conversationData) {
      if (
        key !== 'noteDescription' &&
        key !== 'replyDescription' &&
        key !== 'forwardDescription' &&
        conversationData[key]
      ) {
        content[key] = `${key}: ${conversationData[key]}`;
      }
    }

    return content;
  };

  const conversationActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'Note':
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
            />
          </>
        );
      case 'Forward':
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
            />
          </>
        );
      case 'Reply':
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
  };
};
