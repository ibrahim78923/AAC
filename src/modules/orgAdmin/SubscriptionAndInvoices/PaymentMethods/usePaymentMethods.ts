import { useState } from 'react';

const usePaymentMethods = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAddCard, setOpenAddCard] = useState(false);
  const [openEditCard, setOpenEditCard] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenAddCard = () => {
    setOpenAddCard(true);
  };
  const handleCloseAddCard = () => {
    setOpenAddCard(false);
  };
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
    handleClose();
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleOpenEditCard = () => {
    setOpenEditCard(true);
    handleClose();
  };
  const handleCloseEditCard = () => {
    setOpenEditCard(false);
  };

  return {
    open,
    anchorEl,
    handleActionsClick,
    handleClose,
    openAddCard,
    handleOpenAddCard,
    handleCloseAddCard,
    openEditCard,
    handleOpenEditCard,
    handleCloseEditCard,
    openDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
};

export default usePaymentMethods;
