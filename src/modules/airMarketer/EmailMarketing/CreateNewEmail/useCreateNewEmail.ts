import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const useCreateNewEmail = () => {
  const router = useRouter();
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
    router,
    sendAnchorEl,
    handleSendMenuClick,
    handleSendMenuClose,
    sendMenuOpen,
  };
};
