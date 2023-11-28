import React, { useState } from 'react';

import { useTheme } from '@mui/material';

const useMailBox = () => {
  const theme = useTheme();
  const [isToggleOpen, setIsToggleOpen] = useState(true);
  const [isReply, setIsReply] = useState(false);
  const [editorValue, setEditorValue] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    theme,
    isToggleOpen,
    setIsToggleOpen,
    isReply,
    setIsReply,
    editorValue,
    setEditorValue,
    open,
    handleClick,
    handleClose,
    anchorEl,
  };
};

export default useMailBox;
