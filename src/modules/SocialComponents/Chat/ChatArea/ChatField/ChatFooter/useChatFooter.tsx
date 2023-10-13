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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return {
    anchorEl,
    setAnchorEl,
    messageText,
    setMessageText,
    handleClick,
    handleEmojiSelect,
    open,
    id,
  };
};
