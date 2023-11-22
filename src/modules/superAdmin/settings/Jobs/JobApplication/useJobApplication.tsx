import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

import { jobApplicationDefaultValues } from './JobApplication.data';
import {
  useGetJobAppsQuery,
  useGetUniqueCandidateQuery,
  useUpdateJobAppMutation,
} from '@/services/superAdmin/settings/jobs/job-application';

const useJobApplication = () => {
  const defaultParams = { page: 1, limit: 5 };
  const [filterParams, setFilterParams] = useState(defaultParams);
  const [searchValue, setSearchValue] = useState('');
  const [openDrawerFilter, setOpenDrawerFilter] = useState(false);
  const { data, isLoading } = useGetJobAppsQuery(filterParams);
  const { data: dataUniqueCandidate } = useGetUniqueCandidateQuery({});
  const methodsFilter: any = useForm({
    defaultValues: jobApplicationDefaultValues,
  });
  const { handleSubmit: handleMethodFilter } = methodsFilter;

  const handleRefresh = () => {
    setFilterParams(defaultParams);
    setSearchValue('');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setFilterParams((prev) => {
      return {
        ...prev,
        search: event.target.value,
      };
    });
  };

  const handleOpenFilters = () => {
    setOpenDrawerFilter(true);
  };
  const handleCloseFilters = () => {
    setOpenDrawerFilter(false);
  };

  const onSubmitFilters = async (values: any) => {
    const updatedParams: any = { ...filterParams };
    for (const field in values) {
      if (values[field] !== '') {
        updatedParams[field] = values[field];
      }
    }
    setFilterParams(updatedParams);
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Update Status
  const [statusValue, setStatusValue] = useState('');
  const [updateJobAPPStatus] = useUpdateJobAppMutation();
  const handleUpdateStatus = async (value: any, id: any) => {
    setStatusValue(value);
    const payLoad = {
      status: value,
    };
    try {
      await updateJobAPPStatus({ id: id, body: payLoad })?.unwrap();
      enqueueSnackbar(`Candidate is ${value} now`, {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    data,
    isLoading,
    filterParams,
    searchValue,
    handleSearch,
    handleRefresh,
    openDrawerFilter,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleUpdateStatus,
    statusValue,
    setStatusValue,
    dataUniqueCandidate,
  };
};

export default useJobApplication;
