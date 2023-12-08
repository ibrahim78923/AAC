import { useState } from 'react';

export const useAddNote = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopverClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const popverId = open ? 'simple-popover' : undefined;
  return {
    handlePopverClick,
    handlePopverClose,
    anchorEl,
    popverId,
  };
};
