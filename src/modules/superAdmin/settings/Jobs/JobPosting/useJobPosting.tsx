import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { jobPostingFiltersDefaultValues } from './jobPosting.data';
import { useGetJobsQuery } from '@/services/superAdmin/settings/jobs';

const useJobPosting = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const defaultParams = { page: 1, limit: 5 };
  const [jobsParams, setJobsParams] = useState(defaultParams);
  const [searchValue, setSearchValue] = useState('');
  const [openJobPostingFilter, setOpenJobPostingFilter] = useState(false);
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetJobsQuery(jobsParams);

  const methodsFilterJobPosting: any = useForm({
    defaultValues: jobPostingFiltersDefaultValues,
  });
  const { handleSubmit } = methodsFilterJobPosting;

  const handleRefresh = () => {
    setJobsParams(defaultParams);
    setSearchValue('');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setJobsParams((prev) => {
      return {
        ...prev,
        search: event.target.value,
      };
    });
  };

  const handleOpenJobPostingFilters = () => {
    setOpenJobPostingFilter(true);
  };
  const handleCloseJobPostingFilters = () => {
    setOpenJobPostingFilter(false);
  };

  const onSubmit = async (values: any) => {
    const updatedParams: any = { ...jobsParams };
    for (const field in values) {
      if (values[field] !== '') {
        updatedParams[field] = values[field];
      }
    }
    setJobsParams(updatedParams);
    handleCloseJobPostingFilters();
  };
  const handleFiltersSubmit = handleSubmit(onSubmit);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setJobsParams((prev: any) => {
      return {
        ...prev,
        page: newPage,
      };
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    setJobsParams((prev: any) => {
      return {
        ...prev,
        limit: event.target.value,
      };
    });
  };

  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    jobsParams,
    searchValue,
    handleSearch,
    handleRefresh,
    openJobPostingFilter,
    handleOpenJobPostingFilters,
    handleCloseJobPostingFilters,
    methodsFilterJobPosting,
    handleFiltersSubmit,
    handleChangeRowsPerPage,
    rowsPerPage,
    handleChangePage,
    page,
  };
};

export default useJobPosting;
