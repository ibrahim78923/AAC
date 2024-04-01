import { useState } from 'react';

import { useTheme } from '@mui/material';

import {
  assigneeDefaultValues,
  assigneeValidationSchema,
} from './ActionDropDown.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDeleteDealsTasksManagementMutation } from '@/services/airSales/deals/view-details/tasks';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useActionDropdown = ({
  setOpenDrawer,
  selectedCheckboxes,
  setSelectedCheckboxes,
}: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAlertModal, setOpenAlertModal] = useState('');
  const isMenuOpen = Boolean(anchorEl);

  const [deleteDealsTasksManagement, { isLoading: deleteTaskLoading }] =
    useDeleteDealsTasksManagementMutation();

  const methodsAssignee = useForm({
    resolver: yupResolver(assigneeValidationSchema),
    defaultValues: assigneeDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsAssignee;

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const selectedCheckboxesIds = selectedCheckboxes.map(
    (checked: any) => checked?._id,
  );

  const handleDeleteHandler = async () => {
    try {
      await deleteDealsTasksManagement({ id: selectedCheckboxesIds }).unwrap();
      enqueueSnackbar(`Task Deleted Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      handleCloseAlert();
      setSelectedCheckboxes([]);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleOpenEditDrawer = () => {
    setOpenDrawer('Edit');
    handleCloseMenu();
  };
  const handleOpenViewDrawer = () => {
    setOpenDrawer('View');
    handleCloseMenu();
  };
  const handleOpenReassignAlert = () => {
    setOpenAlertModal('Reassign');
  };
  const handleOpenDeleteAlert = () => {
    setOpenAlertModal('Delete');
  };
  const handleCloseAlert = () => {
    setOpenAlertModal('');
  };

  return {
    theme,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    anchorEl,
    openAlertModal,
    handleSubmit,
    onSubmit,
    methodsAssignee,
    handleOpenReassignAlert,
    handleOpenDeleteAlert,
    handleCloseAlert,
    handleDeleteHandler,
    handleOpenEditDrawer,
    handleOpenViewDrawer,
    deleteTaskLoading,
  };
};

export default useActionDropdown;
