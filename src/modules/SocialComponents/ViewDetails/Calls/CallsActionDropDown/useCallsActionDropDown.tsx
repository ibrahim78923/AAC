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
import { enqueueSnackbar } from 'notistack';
import { useUpdateCallsMutation } from '@/services/commonFeatures/calling';
import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCallsActionDropdown = ({
  setOpenDrawer,
  setOpenAlertModal,
  selectedCheckboxes,
}: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [updateCalls] = useUpdateCallsMutation();

  const methodsReassignCall = useForm({
    resolver: yupResolver(reAssignCallValidationSchema),
    defaultValues: reAssignCallDefaultValues,
  });

  const onSubmitReassignCall = async (values: any) => {
    const { callToDate, callToTime, callFromTime, callFromDate } = values;
    const payload = {
      callToDate: dayjs(callToDate)?.format(DATE_FORMAT?.API),
      callToTime: dayjs(callToTime)?.format(TIME_FORMAT?.API),
      callFromTime: dayjs(callFromTime)?.format(TIME_FORMAT?.API),
      callFromDate: dayjs(callFromDate)?.format(DATE_FORMAT?.API),
      status: 'Re-Scheduled',
    };

    try {
      await updateCalls({
        body: payload,
        id: selectedCheckboxes[0]?._id,
      })?.unwrap();

      enqueueSnackbar(`Call Re-Scheduled Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setOpenAlertModal('');
    } catch (error) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const { handleSubmit: handleReAssignCall } = methodsReassignCall;

  const methodsOutCome = useForm({
    resolver: yupResolver(outcomesValidationSchema),
    defaultValues: outcomesDefaultValues,
  });

  const onSubmitOutCome = async (values: any) => {
    const { callNotes, outcome } = values;
    const payload = {
      callNotes: callNotes,
      outcome: outcome,
    };

    try {
      await updateCalls({
        body: payload,
        id: selectedCheckboxes[0]?._id,
      })?.unwrap();

      enqueueSnackbar(`Outcomes Added Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setOpenAlertModal('');
    } catch (error) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

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
