import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import {
  useGetFormSubmissionsQuery,
  useLazyGetFormSubmissionEmailsQuery,
} from '@/services/airMarketer/lead-capture/forms';
import { PAGINATION } from '@/config';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const useSubmissions = (formId: string) => {
  const theme = useTheme();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const methodsFilter: any = useForm();
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const {
    data: dataGetFormSubmissions,
    isLoading: loadingFormSubmissions,
    isFetching: fetchingFormSubmissions,
  } = useGetFormSubmissionsQuery({
    id: formId,
    params: {
      ...filterParams,
      ...searchPayLoad,
      ...paginationParams,
    },
  });

  // Filters
  const [openFilters, setOpenFilters] = useState(false);
  const handleOpenFilters = () => {
    setOpenFilters(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const onSubmitFilters = async (values: any) => {
    const updateFilterParams = (key: string, value: any) => {
      setFilterParams((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    };

    const dateRange = values?.dateRange;
    const customer = values?.customer;

    if (dateRange && dateRange?.length === 2) {
      const [start, end] = dateRange;
      updateFilterParams(
        'startDate',
        start ? dayjs(start).format(DATE_FORMAT.API) : null,
      );
      updateFilterParams(
        'endDate',
        end ? dayjs(end).format(DATE_FORMAT.API) : null,
      );
    } else {
      updateFilterParams('startDate', undefined);
      updateFilterParams('endDate', undefined);
    }

    if (customer) {
      updateFilterParams('customer', customer);
    } else {
      updateFilterParams('customer', undefined);
    }

    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  const dataCustomers = useLazyGetFormSubmissionEmailsQuery();

  return {
    theme,
    setPageLimit,
    setPage,
    setSearchValue,
    dataGetFormSubmissions,
    loadingFormSubmissions,
    fetchingFormSubmissions,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    dataCustomers,
    resetFilters,
  };
};

export default useSubmissions;
