import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  addOutcomeDefaultValues,
  addOutcomeValidation,
} from './AddOutcome/AddOutcome.data';
import { useMediaQuery } from '@mui/material';

export const useMeetings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [meetingsData, setMeetingsData] = useState([]);
  const [showAddOutcome, setShowAddOutcome] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const matches = useMediaQuery('(max-width:600px)');
  const [actionsPopover, setActionsPopover] =
    useState<HTMLButtonElement | null>(null);
  const [reschedulePopover, setReschedulePopover] =
    useState<HTMLButtonElement | null>(null);
  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionsPopover(event.currentTarget);
  };
  const handleActionsPopoverClose = () => {
    setActionsPopover(null);
  };
  const handleRescheduleClick = (event: any) => {
    setReschedulePopover(event.currentTarget);
  };
  const handleReschedulePopoverClose = () => {
    setReschedulePopover(null);
  };
  const addCoversationModel: any = useForm({
    resolver: yupResolver(addOutcomeValidation),
    defaultValues: addOutcomeDefaultValues,
  });
  const onSubmitAddOutcome = (data: any) => data;
  return {
    enqueueSnackbar,
    meetingsData,
    onSubmitAddOutcome,
    reschedulePopover,
    addCoversationModel,
    handleReschedulePopoverClose,
    handleRescheduleClick,
    actionsPopover,
    matches,
    setMeetingsData,
    handleActionsPopoverClose,
    handleActionsClick,
    setDrawerOpen,
    drawerOpen,
    setShowAddOutcome,
    showAddOutcome,
  };
};
