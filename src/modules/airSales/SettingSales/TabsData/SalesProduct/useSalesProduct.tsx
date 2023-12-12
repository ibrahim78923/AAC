import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import { columns } from './SalesProduct.data';

const useSalesProduct = () => {
  const theme = useTheme<Theme>();
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    setIsDraweropen(false);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected: any) => [...prevSelected, row]);
    } else {
      setSelectedCheckboxes(
        (prevSelected: any) =>
          prevSelected?.filter((item: any) => item?.id !== row?.id),
      );
    }
  };
  const getRowValues = columns({ handleCheckboxChange, selectedCheckboxes });

  return {
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    setIsEditMode,
    isDeleteModalOpen,
    setDeleteModalOpen,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    handleCloseDeleteModal,
    handleDelete,
    selectedCheckboxes,
    getRowValues,
    setAnchorEl,
  };
};

export default useSalesProduct;
