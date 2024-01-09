import { useState } from 'react';

import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';

export const useServicesAction = (props: any) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openVisibilityE1, setOpenVisibilityE1] = useState(false);
  const openMenu = Boolean(anchorEl);
  // const router = useRouter();
  const [deleteServiceCatalog] = useDeleteServiceCatalogMutation({});
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { selectedCheckboxes, setSelectedCheckboxes, isDisabled } = props;
  // const { categoryId } = router?.query;

  const handleClickVisibility = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteBtn = async () => {
    const deleteParams = new URLSearchParams();
    selectedCheckboxes?.forEach(
      (categoryId: any) => deleteParams?.append('ids', categoryId),
    );
    const updatedData = {
      queryParams: deleteParams,
    };

    try {
      const res = await deleteServiceCatalog(updatedData)?.unwrap();
      setSelectedCheckboxes?.([]);
      setDeleteModalOpen?.(false);
      enqueueSnackbar(res?.message ?? 'Service Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
  };
};
