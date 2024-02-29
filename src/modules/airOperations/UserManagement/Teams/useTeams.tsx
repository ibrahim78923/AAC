import { useTheme } from '@mui/material';
import { useState } from 'react';
import { teamDropdown, teamList, teamListData } from './Teams.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useTeams = () => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isTeamDrawerOpen, setIsTeamDrawerOpen] = useState<boolean>(false);
  const [selectedTeamList, setSelectedTeamList] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const submitDeleteModal = () => {
    enqueueSnackbar('Delete Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setDeleteModal(false);
  };
  const teamDropdownOptions = teamDropdown(setDeleteModal);

  const submit = async () => {
    enqueueSnackbar('Team Add Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setIsDrawerOpen(false);
  };

  const teamListColumn = teamList(
    selectedTeamList,
    setSelectedTeamList,
    teamListData,
    setIsTeamDrawerOpen,
    setIsDrawerOpen,
    setDeleteModal,
  );

  return {
    theme,
    searchValue,
    setSearchValue,
    selectedTeamList,
    setSelectedTeamList,
    teamListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModal,
    setDeleteModal,
    submitDeleteModal,
    teamDropdownOptions,
    isTeamDrawerOpen,
    setIsTeamDrawerOpen,
    handleMenuClick,
    handleMenuClose,
    anchorEl,
    submit,
  };
};
