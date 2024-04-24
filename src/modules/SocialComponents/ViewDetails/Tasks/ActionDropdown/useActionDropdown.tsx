import { useState } from 'react';

import { useTheme } from '@mui/material';

import {
  assigneeDefaultValues,
  assigneeValidationSchema,
} from './ActionDropDown.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useDeleteDealsTasksManagementMutation,
  useUpdateDealsTasksManagementMutation,
} from '@/services/airSales/deals/view-details/tasks';
import { enqueueSnackbar } from 'notistack';

const useActionDropdown = ({
  setOpenDrawer,
  selectedCheckboxes,
  setSelectedCheckboxes,
}: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAlertModal, setOpenAlertModal] = useState('');
  const isMenuOpen = Boolean(anchorEl);
  const [deleteCompanyTasksManagement] =
    useDeleteDealsTasksManagementMutation();

  const methodsAssignee = useForm({
    resolver: yupResolver(assigneeValidationSchema),
    defaultValues: assigneeDefaultValues,
  });
  const [updatedDealsTasksManagement] = useUpdateDealsTasksManagementMutation();

  const { handleSubmit } = methodsAssignee;

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
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

  const selectedCheckboxesIds = selectedCheckboxes.map(
    (checked: any) => checked?._id,
  );

  const onSubmit = async (value: any) => {
    const body = {
      type: value?.tasktype,
    };
    try {
      await updatedDealsTasksManagement({
        body,
        id: selectedCheckboxes[0]?._id,
      })?.unwrap();
      enqueueSnackbar(`Task Re-assign Successfully`, { variant: 'success' });
      setSelectedCheckboxes([]);
      handleCloseAlert();
      handleCloseMenu();
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };

  const handleDeleteHandler = async () => {
    try {
      await deleteCompanyTasksManagement({
        id: selectedCheckboxesIds,
      }).unwrap();
      enqueueSnackbar(`Task Deleted Successfully`, { variant: 'success' });
      handleCloseAlert();
      setSelectedCheckboxes([]);
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
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
  };
};

export default useActionDropdown;
