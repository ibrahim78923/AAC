import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetDelegateDashboardDataQuery } from '@/services/orgAdmin/Delegates';
import { Theme, useTheme } from '@mui/material';

const useDelegates = () => {
  const theme: any = useTheme<Theme>();
  const [isModalOpen, setIsModalOpen] = useState({
    invite: false,
    viewDetail: false,
  });
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState({
    status: '',
    fromData: null,
    toDate: null,
  });

  const params = {
    page: page,
    limit: pageLimit,
    search: searchValue ? searchValue : undefined,
    fromDate: filterValue?.fromData ? filterValue?.fromData : undefined,
    toDate: filterValue?.toDate ? filterValue?.toDate : undefined,
  };

  const { data: getDelegateData, isLoading: getDelgateDataLoading } =
    useGetDelegateDashboardDataQuery(params);

  const tableDataParams = {
    setPage,
    setPageLimit,
    getDelegateData,
    setSearchValue,
    filterValue,
    setFilterValue,
    isModalOpen,
    setIsModalOpen,
  };

  return {
    theme,
    isModalOpen,
    setIsModalOpen,
    getDelegateData,
    getDelgateDataLoading,
    setPage,
    setPageLimit,
    tableDataParams,
  };
};

export default useDelegates;
