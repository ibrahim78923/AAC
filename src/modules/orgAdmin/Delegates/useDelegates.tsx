import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetDelegateDashboardDataQuery } from '@/services/orgAdmin/Delegates';
import { Theme, useTheme } from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const useDelegates = () => {
  const theme: any = useTheme<Theme>();
  const [isModalOpen, setIsModalOpen] = useState({
    invite: false,
    viewDetail: false,
    status: '',
  });
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState<any>({ status: '' });

  const params = {
    page: page,
    limit: pageLimit,
    search: searchValue ? searchValue : undefined,
    status: filterValue?.status ? filterValue?.status : undefined,
    dateStart: filterValue?.dateStart
      ? dayjs(filterValue?.dateStart)?.format(DATE_FORMAT?.API)
      : undefined,
    dateEnd: filterValue?.dateEnd
      ? dayjs(filterValue?.dateEnd)?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const {
    data: getDelegateData,
    isLoading: getDelgateDataLoading,
    isFetching,
  } = useGetDelegateDashboardDataQuery(params);

  const handleResetFilterValue = () => {
    setFilterValue({
      status: '',
      dateStart: '',
      dateEnd: '',
    });
  };

  const tableDataParams = {
    setPage,
    setPageLimit,
    getDelegateData,
    setSearchValue,
    filterValue,
    setFilterValue,
    isModalOpen,
    setIsModalOpen,
    isFetching,
    handleResetFilterValue,
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
