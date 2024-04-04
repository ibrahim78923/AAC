import { useState } from 'react';

const useLinkDropDown = () => {
  // Popup show/hide
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // QuickLinks & EditLinks View Toggle
  const [toggleView, setToggleView] = useState(false);
  const handleToggleView = () => {
    setToggleView(!toggleView);
  };

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
    toggleView,
    handleToggleView,
  };
};

export default useLinkDropDown;
