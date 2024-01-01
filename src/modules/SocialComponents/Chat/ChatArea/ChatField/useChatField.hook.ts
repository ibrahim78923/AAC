import { useState } from 'react';

import { useTheme } from '@mui/material';

import { useAppSelector } from '@/redux/store';

export const useChatField = () => {
  const chatMessages = useAppSelector((state) => state?.chat?.chatMessages);

  const theme = useTheme();
  const chatModeState = useAppSelector(
    (state: any) => state?.chat?.chatModeState,
  );
  const [activeChat, setActiveChat] = useState('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const chatMode = chatModeState?.chatModeState;

  const filteredMessages = chatMessages?.filter(
    (message: any) => message?.content !== '',
  );

  const chatDataToShow = chatMode === 'groupChat' ? [] : filteredMessages;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
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
