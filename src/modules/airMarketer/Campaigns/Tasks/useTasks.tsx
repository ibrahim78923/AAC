import { useTheme } from '@mui/material';
import { useState } from 'react';

const useTasks = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenEditTaskDrawer, setIsOpenEditTaskDrawer] = useState(false);
  const [isOpenDeleteDrawer, setIsOpenDeleteDrawer] = useState(false);
  const [isTaskCreate, setTaskCreate] = useState('');
  const theme = useTheme();
  const actionMenuOpen = Boolean(anchorEl);
  const handleTaskDrawer = () => {
    setIsOpenEditTaskDrawer(true);
  };
  const handleDeleteModal = () => {
    setIsOpenDeleteDrawer(true);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event?.currentTarget);
  };

  return {
    anchorEl,
    setAnchorEl,
    theme,
    actionMenuOpen,
    handleActionsMenuClose,
    handleActionsMenuClick,
    isOpenEditTaskDrawer,
    setIsOpenEditTaskDrawer,
    handleTaskDrawer,
    isOpenDeleteDrawer,
    handleDeleteModal,
    setIsOpenDeleteDrawer,
    setTaskCreate,
    isTaskCreate,
  };
};
export default useTasks;
