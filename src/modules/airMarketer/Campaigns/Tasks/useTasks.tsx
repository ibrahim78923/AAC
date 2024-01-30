import { useTheme } from '@mui/material';
import { useState } from 'react';

const useTasks = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenEditTaskDrawer, setIsOpenEditTaskDrawer] = useState({
    isToggle: false,
    type: '',
  });
  const [isOpenDeleteDrawer, setIsOpenDeleteDrawer] = useState(false);
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false);
  // const [isTaskCreate, setTaskCreate] = useState('');
  const [isListView, setIsListView] = useState('listView');
  const [searchValue, setSearchValue] = useState('');
  const theme = useTheme();
  const actionMenuOpen = Boolean(anchorEl);

  const handleDeleteModal = () => {
    setIsOpenDeleteDrawer(true);
  };

  const handleChangeStatus = () => {
    setIsOpenChangeStatus(true);
  };

  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleListViewClick = (val: string) => {
    setIsListView(val);
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
    isOpenDeleteDrawer,
    handleDeleteModal,
    setIsOpenDeleteDrawer,
    handleChangeStatus,
    // setTaskCreate,
    // isTaskCreate,
    isOpenChangeStatus,
    setIsOpenChangeStatus,
    handleListViewClick,
    isListView,
    searchValue,
    setSearchValue,
  };
};
export default useTasks;
