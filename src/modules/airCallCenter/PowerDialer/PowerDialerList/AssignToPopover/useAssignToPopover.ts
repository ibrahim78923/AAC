import { useState } from 'react';

export const useAssignToPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'assign-to-popover' : undefined;

  return {
    anchorEl,
    handleClick,
    handleClose,
    open,
    id,
  };
};
