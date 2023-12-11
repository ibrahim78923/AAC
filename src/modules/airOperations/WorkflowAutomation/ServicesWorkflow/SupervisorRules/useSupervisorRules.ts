import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
  supervisorListData,
  supervisorListsColumnsFunction,
} from './SupervisorRules.data';

export const useSupervisorRules = () => {
  const theme = useTheme();
  const [selectedSupervisorList, setSelectedSupervisorList] = useState([]);

  const supervisorListsColumns = supervisorListsColumnsFunction(
    selectedSupervisorList,
    setSelectedSupervisorList,
    supervisorListData,
    theme,
  );
  return {
    supervisorListsColumns,
    selectedSupervisorList,
    theme,
  };
};
