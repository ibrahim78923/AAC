import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetDealsTasksManagementQuery } from '@/services/airSales/deals/view-details/tasks';

const useTasks = () => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const { data: taskData } = useGetDealsTasksManagementQuery({});

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, row]);
    } else {
      setSelectedCheckboxes(
        (prevSelected) =>
          prevSelected?.filter((item) => item?._id !== row?._id),
      );
    }
  };

  return {
    openDrawer,
    setOpenDrawer,
    theme,
    taskData,
    handleCheckboxChange,
    selectedCheckboxes,
    setSelectedCheckboxes,
  };
};

export default useTasks;
