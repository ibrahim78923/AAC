import React from 'react';
import { useState } from 'react';

export function useHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionPop(event.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [terminateModalOpen, setTerminateModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    setIsDrawerOpen,
    isDrawerOpen,
    handleActionClick,
    actionPop,
    setActionPop,
    handleActionClose,
    deleteModalOpen,
    setDeleteModalOpen,
    terminateModalOpen,
    setTerminateModalOpen,
    handleClose,
    handleClick,
    anchorEl,
    open,
  };
}
