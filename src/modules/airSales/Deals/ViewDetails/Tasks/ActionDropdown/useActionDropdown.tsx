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
import { useAppSelector } from '@/redux/store';

const useActionDropdown = ({ setOpenDrawer, selectedRecId }: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAlertModal, setOpenAlertModal] = useState('');
  const isMenuOpen = Boolean(anchorEl);

  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task_deals?.selectedDealsTaskIds,
  );

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

  const handleDeleteHandler = async () => {
    const payload = {
      taskIds: selectedTaskIds,
      dealId: selectedRecId,
    };
    try {
      await deleteDealsTasksManagement({
        body: payload,
      }).unwrap();
      enqueueSnackbar('Task Deleted Successfully', {
        variant: 'success',
      });
      handleCloseAlert();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
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
