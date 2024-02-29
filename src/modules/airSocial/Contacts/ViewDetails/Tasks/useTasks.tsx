import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useGetContactTasksQuery } from '@/services/commonFeatures/contacts';

const useTasks = (contactId: any) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');

  // const [selectedRow, setSelectedRow]: any = useState([]);
  // const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  // const [rowId, setRowId] = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  // const defaultParams = {
  //   page: PAGINATION?.CURRENT_PAGE,
  //   limit: PAGINATION?.PAGE_LIMIT,
  // };
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageLimit,
    contactId: contactId,
  });
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }

  const { data: dataGetContactTasks, isLoading: loadingGetTasks } =
    useGetContactTasksQuery({ params: { ...filterParams, ...searchPayLoad } });

  return {
    setPage,
    setPageLimit,
    openDrawer,
    setOpenDrawer,
    theme,
    dataGetContactTasks,
    loadingGetTasks,
    setSearchValue,
    setFilterParams,
  };
};

export default useTasks;
