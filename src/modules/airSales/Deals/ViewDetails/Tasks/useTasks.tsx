import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetDealsTasksManagementQuery } from '@/services/airSales/deals/view-details/tasks';
import { PAGINATION } from '@/config';

const useTasks = (selectedRecId: any) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const taskType = 'deals';

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const tasksParams = {
    recordId: selectedRecId,
    recordType: taskType,
  };

  const { data: taskData, status } = useGetDealsTasksManagementQuery({
    params: tasksParams,
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
    page,
    setPage,
    pageLimit,
    setPageLimit,
    status,
  };
};

export default useTasks;
