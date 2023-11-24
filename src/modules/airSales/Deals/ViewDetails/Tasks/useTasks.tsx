import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetDealsTasksManagementQuery } from '@/services/airSales/deals/view-details/tasks';

const useTasks = () => {
  const theme = useTheme();
  const { data: taskData } = useGetDealsTasksManagementQuery({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, row]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((item) => item._id !== row._id),
      );
    }
  };

  const [openDrawer, setOpenDrawer] = useState('');

  return {
    openDrawer,
    setOpenDrawer,
    theme,
    taskData,
    handleCheckboxChange,
    selectedCheckboxes,
  };
};

export default useTasks;
