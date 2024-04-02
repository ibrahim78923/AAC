import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetDealsTasksManagementQuery } from '@/services/airSales/deals/view-details/tasks';

const useTasks = (selectedRecId: any) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const taskType = 'deals';

  const tasksParams = {
    recordId: selectedRecId,
    recordType: taskType,
  };

  const { data: taskData } = useGetDealsTasksManagementQuery({
    query: tasksParams,
  });

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected: any) => [...prevSelected, row]);
    } else {
      setSelectedCheckboxes(
        (prevSelected: any) =>
          prevSelected?.filter((item: any) => item?._id !== row?._id),
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
