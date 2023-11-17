import React, { useState } from 'react';

const usePostDetailsField = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [messageText, setMessageText] = useState<string | null>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessageText((prevInput: any) => prevInput + emoji?.emoji);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'simple-popover' : undefined;

  return {
    setAnchorEl,
    anchorEl,
    messageText,
    setMessageText,
    handleClick,
    handleEmojiSelect,
    id,
    isOpen,
  };
};

export default usePostDetailsField;
