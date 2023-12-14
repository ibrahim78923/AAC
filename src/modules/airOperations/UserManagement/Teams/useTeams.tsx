import { useTheme } from '@mui/material';
import { useState } from 'react';
import { teamList, teamListData } from './Teams.data';

export const useTeams = () => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedTeamList, setSelectedTeamList] = useState<any>([]);
  const teamListColumn = teamList(
    selectedTeamList,
    setSelectedTeamList,
    teamListData,
  );

  return {
    theme,
    searchValue,
    setSearchValue,
    selectedTeamList,
    setSelectedTeamList,
    teamListColumn,
  };
};
