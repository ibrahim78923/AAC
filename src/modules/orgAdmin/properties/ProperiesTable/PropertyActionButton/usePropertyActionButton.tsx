import { useState } from 'react';

const usePropertyActionButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    open,
    anchorEl,
    handleClick,
    handleClose,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  };
};

export default usePropertyActionButton;
