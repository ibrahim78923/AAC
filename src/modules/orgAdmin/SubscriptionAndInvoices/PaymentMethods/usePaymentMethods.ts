import { useState } from 'react';
import { columns } from './PaymentMethods.data';

const usePaymentMethods = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAddCard, setOpenAddCard] = useState(false);
  const [openEditCard, setOpenEditCard] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');

  const open = Boolean(anchorEl);
  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenAddCard = () => {
    setOpenAddCard(true);
    setOpenEditCard('Add');
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

  const getRowValues = columns(
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
  );

  return {
    open,
    anchorEl,
    handleActionsClick,
    handleClose,
    openAddCard,
    handleOpenAddCard,
    handleCloseAddCard,
    openEditCard,
    setOpenEditCard,
    openDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    getRowValues,
    setIsGetRowValues,
    isGetRowValues,
    setIsChecked,
    isChecked,
    setOpenAddCard,
  };
};

export default usePaymentMethods;
