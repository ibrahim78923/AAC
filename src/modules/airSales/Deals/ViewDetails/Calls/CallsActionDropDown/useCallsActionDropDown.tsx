import { useState } from 'react';

import { useTheme } from '@mui/material';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  outcomesDefaultValues,
  outcomesValidationSchema,
  reAssignCallDefaultValues,
  reAssignCallValidationSchema,
} from './CallsActionDropDown.data';

const useCallsActionDropdown = ({ setOpenDrawer }: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAlertModal, setOpenAlertModal] = useState('');
  const isMenuOpen = Boolean(anchorEl);

  const methodsReassignCall = useForm({
    resolver: yupResolver(reAssignCallValidationSchema),
    defaultValues: reAssignCallDefaultValues,
  });

  const onSubmitReassignCall = () => {};
  const { handleSubmit: handleReAssignCall } = methodsReassignCall;

  const methodsOutCome = useForm({
    resolver: yupResolver(outcomesValidationSchema),
    defaultValues: outcomesDefaultValues,
  });

  const onSubmitOutCome = () => {};
  const { handleSubmit: handleOutCome } = methodsOutCome;

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

  const handleOpenDeleteAlert = () => {
    setOpenAlertModal('Delete');
  };
  const handleCloseAlert = () => {
    setOpenAlertModal('');
  };
  const handleOpenReassignModal = () => {
    setOpenAlertModal('reschedule');
  };
  const handleOpenOutcomeModal = () => {
    setOpenAlertModal('outcome');
  };

  return {
    theme,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    anchorEl,
    openAlertModal,

    handleOpenDeleteAlert,
    handleCloseAlert,
    handleOpenEditDrawer,
    handleOpenViewDrawer,

    handleOpenReassignModal,

    methodsReassignCall,
    handleReAssignCall,
    onSubmitReassignCall,

    handleOutCome,
    onSubmitOutCome,
    methodsOutCome,
    handleOpenOutcomeModal,
  };
};

export default useCallsActionDropdown;
