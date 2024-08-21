import { MouseEvent, useState } from 'react';
import { useDeleteServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { IServicesProps } from '../Services.interface';

export const useServicesAction = (props: IServicesProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openVisibilityE1, setOpenVisibilityE1] = useState(false);
  const openMenu = Boolean(anchorEl);

  const [deleteServiceCatalog, deleteServiceCatalogStatus] =
    useDeleteServiceCatalogMutation({});
  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { selectedCheckboxes, setSelectedCheckboxes, isDisabled } = props;

  const handleClickVisibility = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteBtn = async () => {
    const deleteParams = new URLSearchParams();
    selectedCheckboxes?.forEach(
      (categoryId: string) => deleteParams?.append('ids', categoryId),
    );
    const updatedData = {
      queryParams: deleteParams,
    };

    try {
      await deleteServiceCatalog(updatedData)?.unwrap();
      setSelectedCheckboxes?.([]);
      setDeleteModalOpen?.(false);
      successSnackbar('Service Deleted Successfully!');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      setSelectedCheckboxes?.([]);
      setDeleteModalOpen?.(false);
    }
  };
  const handleCloseVisibility = () => {
    setOpenVisibilityE1(false);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setDeleteModalOpen?.(true);
    handleCloseMenu?.();
  };
  const handleStatus = () => {
    setOpenStatus?.(true);
    handleCloseMenu?.();
  };
  const handleCategory = () => {
    setOpen?.(true);
    handleCloseMenu?.();
  };
  const handleVisibility = () => {
    setOpenVisibilityE1?.(true);
    handleClickVisibility;
  };
  return {
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
    open,
    setOpen,
    openStatus,
    setOpenStatus,
    openMenu,
    handleClickMenu,
    anchorEl,
    setAnchorEl,
    handleCloseMenu,
    handleDelete,
    handleStatus,
    handleCategory,
    handleClickVisibility,
    handleCloseVisibility,
    handleVisibility,
    openVisibilityE1,
    isDisabled,
    setSelectedCheckboxes,
    deleteServiceCatalogStatus,
  };
};
