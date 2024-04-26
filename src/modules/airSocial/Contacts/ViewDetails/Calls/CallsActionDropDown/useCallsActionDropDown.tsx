import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  outcomesDefaultValues,
  outcomesValidationSchema,
  reAssignCallDefaultValues,
  reAssignCallValidationSchema,
} from './CallsActionDropDown.data';

const useCallsActionDropdown = ({ setOpenDrawer }: any) => {
  const theme = useTheme();

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

  const handleOpenEditDrawer = () => {
    setOpenDrawer('Edit');
  };
  const handleOpenViewDrawer = () => {
    setOpenDrawer('View');
  };

  const handleOpenDeleteAlert = () => {};
  const handleCloseAlert = () => {};
  const handleOpenReassignModal = () => {};
  const handleOpenOutcomeModal = () => {};

  return {
    theme,

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
