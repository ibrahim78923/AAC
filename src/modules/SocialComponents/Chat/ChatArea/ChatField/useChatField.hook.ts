import { useState } from 'react';

import { useTheme } from '@mui/material';

import {
  chatsData,
  groupChatsData,
} from '@/mock/modules/SocialComponents/Chat';

import { useAppSelector } from '@/redux/store';

export const useChatField = () => {
  const theme = useTheme();
  const chatModeState = useAppSelector(
    (state: any) => state.chat.chatModeState,
  );
  const [activeChat, setActiveChat] = useState('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const chatMode = chatModeState.chatModeState;

  const chatDataToShow = chatMode === 'groupChat' ? groupChatsData : chatsData;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    theme,
    chatMode,
    activeChat,
    setActiveChat,
    isDeleteModal,
    setIsDeleteModal,
    chatDataToShow,
    actionMenuOpen,
    handleClick,
    handleClose,
    anchorEl,
  };
};
