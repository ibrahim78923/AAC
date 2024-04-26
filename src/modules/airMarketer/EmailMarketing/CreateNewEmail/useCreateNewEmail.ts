import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { createNewEmailSchema, defaultValues } from './CreateNewEmail.data';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const useCreateNewEmail = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isBcc, setIsBcc] = useState<string[]>(['both']);
  const [isAddNoteDrawer, setIsAddNoteDrawer] = useState<boolean>(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isActive, setIsActive] = useState({
    bcc: false,
    cc: false,
  });

  const [sendAnchorEl, setSendAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );
  const handleSendMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSendAnchorEl(event.currentTarget);
  };
  const handleSendMenuClose = () => setSendAnchorEl(null);
  const sendMenuOpen = Boolean(sendAnchorEl);
  const theme = useTheme();

  const methodsCreateEmail: any = useForm({
    resolver: yupResolver(createNewEmailSchema),
    defaultValues: async () => {
      const defaults = await defaultValues;
      return defaults;
    },
  });
  const { handleSubmit, reset } = methodsCreateEmail;
  const onSubmit = async (values: any, action: any) => {
    alert('values::' + ' ' + values);
    if (action === 'send') {
      handleSendMenuClose();
      reset();
    } else if (action === 'schedule') {
      handleSendMenuClose();
      setOpenCalendar(true);
      reset();
    } else {
      handleSendMenuClose();
      reset();
    }
  };

  const handleCreateEmailSubmit = (action: any) => {
    try {
      handleSubmit((values: any) => onSubmit(values, action))();
    } catch (error) {
      alert('Error::' + ' ' + error);
    }
  };

  const handleAddNoteDrawer = () => {
    setIsAddNoteDrawer(!isAddNoteDrawer);
  };

  const handleScheduleModal = () => {
    setIsScheduleModalOpen(!isScheduleModalOpen);
  };

  const handleActionsButton = () => {
    setOpenCalendar(true);
  };

  // const onSubmit = () => {
  //   // console.log('values', values);
  //   if (actionName === 'schedule') {
  //     setIsScheduleModalOpen(true);
  //   }
  // };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopverClose = () => setAnchorEl(null);
  const menuOpen = Boolean(anchorEl);

  return {
    anchorEl,
    handlePopverClick,
    handlePopverClose,
    menuOpen,
    methodsCreateEmail,
    defaultValues,
    enqueueSnackbar,
    handleCreateEmailSubmit,
    theme,
    onSubmit,
    isBcc,
    setIsBcc,
    isActive,
    setIsActive,
    handleAddNoteDrawer,
    isAddNoteDrawer,
    setIsAddNoteDrawer,
    handleActionsButton,
    isScheduleModalOpen,
    handleScheduleModal,
    openCalendar,
    setOpenCalendar,
    router,
    sendAnchorEl,
    handleSendMenuClick,
    handleSendMenuClose,
    sendMenuOpen,
  };
};
