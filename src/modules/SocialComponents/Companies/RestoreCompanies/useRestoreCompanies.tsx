import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { companiesAPI } from '@/services/commonFeatures/companies';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const useRestoreCompanies = () => {
  const theme = useTheme<Theme>();

  const [search, setSearch] = useState('');
  const [isRestoreModal, setIsRestoreModal] = useState({
    isOpen: false,
    type: '',
  });
  const [isDeleteModal, setIsDeleteModal] = useState({
    isOpen: false,
    type: '',
  });
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [datePickerVal, setDatePickerVal] = useState<any>(new Date());

  const [filterValues, setFilterValues] = useState({
    search: '',
    date: '',
  });

  const startedDate = 0;
  const endedDate = 1;

  const deletedCompaniesParams = {
    page: page,
    limit: pageLimit,
    search: filterValues?.search ?? undefined,
    dateStart: filterValues?.date[startedDate]
      ? dayjs(filterValues?.date[startedDate])?.format(DATE_FORMAT?.API)
      : undefined,
    dateEnd: filterValues?.date[endedDate]
      ? dayjs(filterValues?.date[endedDate])?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const { useGetAllDeletedCompaniesQuery } = companiesAPI;
  const {
    data: getAllDeletedCompanies,
    isLoading,
    isSuccess,
  } = useGetAllDeletedCompaniesQuery(deletedCompaniesParams);

  const resetFilters = () => {
    setFilterValues({
      search: '',
      date: '',
    });
  };

  return {
    search,
    setSearch,
    theme,
    isDeleteModal,
    setIsDeleteModal,
    isRestoreModal,
    setIsRestoreModal,
    checkedRows,
    setCheckedRows,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    getAllDeletedCompanies,
    isLoading,
    isSuccess,
    datePickerVal,
    setDatePickerVal,
    filterValues,
    setFilterValues,
    resetFilters,
  };
};

export default useRestoreCompanies;
