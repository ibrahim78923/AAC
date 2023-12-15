import { useTheme } from '@mui/material';
import { useState } from 'react';
import { teamDropdown, teamList, teamListData } from './Teams.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useTeams = () => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedTeamList, setSelectedTeamList] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const submitDeleteModal = () => {
    enqueueSnackbar('Delete Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setDeleteModal(false);
  };
  const teamDropdownOptions = teamDropdown(setDeleteModal);

  const teamListColumn = teamList(
    selectedTeamList,
    setSelectedTeamList,
    teamListData,
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
  };
};
