import { useState } from 'react';
const useNewsAndEvents = () => {
  const [isOpenEditDrawer, setIsOpenEditDrawer] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tableRowValues, setTableRowValues] = useState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditDrawer = () => {
    setAnchorEl(null);
    setIsOpenEditDrawer(true);
  };
  const handleCloseEditDrawer = () => {
    setIsOpenEditDrawer(false);
  };

  return {
    anchorEl,
    actionMenuOpen,
    handleClick,
    handleClose,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    isOpenEditDrawer,
    handleOpenEditDrawer,
    handleCloseEditDrawer,
  };
};
export default useNewsAndEvents;
