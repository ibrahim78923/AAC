import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useCreateNewEmail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isAddNoteDrawer, setIsAddNoteDrawer] = useState<boolean>(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const [sendAnchorEl, setSendAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );
  const handleSendMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSendAnchorEl(event.currentTarget);
  };
  const handleSendMenuClose = () => setSendAnchorEl(null);
  const sendMenuOpen = Boolean(sendAnchorEl);
  const theme = useTheme();
  const handleAddNoteDrawer = () => {
    setIsAddNoteDrawer(!isAddNoteDrawer);
  };
  const handleScheduleModal = () => {
    setIsScheduleModalOpen(!isScheduleModalOpen);
  };
  const handleActionsButton = () => {
    setOpenCalendar(true);
  };

  return {
    enqueueSnackbar,
    theme,
    handleAddNoteDrawer,
    isAddNoteDrawer,
    setIsAddNoteDrawer,
    handleActionsButton,
    isScheduleModalOpen,
    handleScheduleModal,
    openCalendar,
    setOpenCalendar,
    sendAnchorEl,
    handleSendMenuClick,
    handleSendMenuClose,
    sendMenuOpen,
  };
};
