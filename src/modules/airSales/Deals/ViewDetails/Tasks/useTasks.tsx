import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetDealsTasksQuery } from '@/services/airSales/deals/view-details/tasks';

const useTasks = () => {
  const theme = useTheme();
  const { data: taskData } = useGetDealsTasksQuery({});

  const [openDrawer, setOpenDrawer] = useState('');

  return { openDrawer, setOpenDrawer, theme, taskData };
};

export default useTasks;
