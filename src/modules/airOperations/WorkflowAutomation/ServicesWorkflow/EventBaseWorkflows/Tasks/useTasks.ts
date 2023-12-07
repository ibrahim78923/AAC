import { useState } from 'react';
import { tasksListData, tasksListsColumnsFunction } from './Tasks.data';
import { useTheme } from '@mui/material';

export const useTasks = () => {
  const theme = useTheme();
  const [selectedTasksList, setSelectedTasksList] = useState([]);

  const tasksListsColumns = tasksListsColumnsFunction(
    selectedTasksList,
    setSelectedTasksList,
    tasksListData,
    theme,
  );
  return {
    tasksListsColumns,
    selectedTasksList,
  };
};
