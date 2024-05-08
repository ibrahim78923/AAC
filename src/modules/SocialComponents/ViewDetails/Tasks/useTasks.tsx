import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetDealsTasksManagementQuery } from '@/services/airSales/deals/view-details/tasks';
import { PAGINATION } from '@/config';

const useTasks = (companyId: any) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const params = {
    page,
    limit: pageLimit,
    recordId: companyId,
    recordType: 'companies',
  };
  const { data: taskData, isLoading } = useGetDealsTasksManagementQuery({
    params,
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
    selectedCheckboxes,
    setSelectedCheckboxes,
    handleCheckboxChange,
    isLoading,
    setPageLimit,
    setPage,
  };
};

export default useTasks;
