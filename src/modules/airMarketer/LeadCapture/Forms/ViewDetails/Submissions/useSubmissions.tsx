import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { useGetFormSubmissionsQuery } from '@/services/airMarketer/lead-capture/forms';
import { PAGINATION } from '@/config';

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
    resetFilters();
  };

  const onSubmitFilters = async (values: any) => {
    setFilterParams((prev: any) => ({
      ...prev,
      ...values,
    }));
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

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
  };
};

export default useSubmissions;
