import { useState } from 'react';

const useTableSection = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);

  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    setAnchorEl,
    actionMenuOpen,
    handleActionsClick,
    handleClose,
  };
};
export default useTableSection;
