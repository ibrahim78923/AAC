import { useState } from 'react';

export const useChatFooter = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [messageText, setMessageText] = useState<string | null>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageText((prevInput: any) => prevInput + emoji?.emoji);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'simple-popover' : undefined;

  return {
    anchorEl,
    setAnchorEl,
    messageText,
    setMessageText,
    handleClick,
    handleEmojiSelect,
    isOpen,
    id,
  };
};
