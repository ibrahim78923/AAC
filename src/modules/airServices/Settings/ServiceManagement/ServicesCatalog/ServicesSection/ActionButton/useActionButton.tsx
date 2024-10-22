import { MouseEvent, useState } from 'react';
import { useDeleteAirServicesSettingsServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { getActionButtonMenuData } from './ActionButton.data';

export const useActionButton = (props: any) => {
  const { selectedCheckboxes, setSelectedCheckboxes, isDisabled } = props;

  const [state, setState] = useState({
    deleteModalOpen: false,
    open: false,
    openStatus: false,
    openVisibilityE1: false,
    anchorEl: null as null | HTMLElement,
  });

  const [deleteServiceCatalog, deleteServiceCatalogStatus] =
    useDeleteAirServicesSettingsServiceCatalogMutation({});

  const openMenu = Boolean(state.anchorEl);

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setState((prevState) => ({ ...prevState, anchorEl: event.currentTarget }));
  };

  const handleClickVisibility = (event: MouseEvent<HTMLButtonElement>) => {
    setState((prevState) => ({ ...prevState, anchorEl: event.currentTarget }));
  };

  const handleDeleteBtn = async () => {
    const deleteParams = new URLSearchParams();
    selectedCheckboxes?.forEach(
      (categoryId: string) => deleteParams?.append('ids', categoryId),
    );
    const updatedData = { queryParams: deleteParams };

    try {
      await deleteServiceCatalog(updatedData)?.unwrap();
      setSelectedCheckboxes?.([]);
      setState((prevState) => ({ ...prevState, deleteModalOpen: false }));
      successSnackbar('Service(s) Deleted Successfully!');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      setSelectedCheckboxes?.([]);
      setState((prevState) => ({ ...prevState, deleteModalOpen: false }));
    }
  };

  const handleCloseMenu = () => {
    setState((prevState) => ({ ...prevState, anchorEl: null }));
  };

  const handleDelete = () => {
    setState((prevState) => ({ ...prevState, deleteModalOpen: true }));
    handleCloseMenu();
  };

  const handleStatus = () => {
    setState((prevState) => ({ ...prevState, openStatus: true }));
    handleCloseMenu();
  };

  const handleCategory = () => {
    setState((prevState) => ({ ...prevState, open: true }));
    handleCloseMenu();
  };

  const handleVisibility = () => {
    setState((prevState) => ({ ...prevState, openVisibilityE1: true }));
  };

  const handleCloseVisibility = () => {
    setState((prevState) => ({ ...prevState, openVisibilityE1: false }));
  };

  const actionButtonMenuData = getActionButtonMenuData(
    handleCategory,
    handleStatus,
    handleVisibility,
    handleDelete,
  );

  return {
    state,
    setState,
    handleDeleteBtn,
    openMenu,
    handleClickMenu,
    handleCloseMenu,
    handleClickVisibility,
    handleCloseVisibility,
    isDisabled,
    setSelectedCheckboxes,
    deleteServiceCatalogStatus,
    actionButtonMenuData,
  };
};
