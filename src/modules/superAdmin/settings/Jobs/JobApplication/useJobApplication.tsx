import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import {
  useGetJobAppsQuery,
  useGetUniqueCandidateQuery,
  useUpdateJobAppMutation,
} from '@/services/superAdmin/settings/jobs/job-application';
import { DATE_FORMAT } from '@/constants/index';
import { PAGINATION } from '@/config';

const useJobApplication = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
  const defaultParams = {
    page: PAGINATION?.CURRENT_PAGE,
    limit: PAGINATION?.PAGE_LIMIT,
  };
  let searchParam;
  if (searchValue) {
    searchParam = { search: searchValue };
  }
  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageLimit,
  });
  const [openDrawerFilter, setOpenDrawerFilter] = useState(false);
  const { data, isLoading } = useGetJobAppsQuery({
    params: { ...filterParams, ...searchParam },
  });
  const { data: dataUniqueCandidate } = useGetUniqueCandidateQuery({});
  const methodsFilter: any = useForm();
  const { handleSubmit: handleMethodFilter, reset: ressetFilterForm } =
    methodsFilter;

  const handleRefresh = () => {
    setFilterParams(defaultParams);
    ressetFilterForm();
  };

  // Hadle PAGE CHANGE
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setFilterParams((prev) => {
      return {
        ...prev,
        page: newPage,
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
    const { applyDate, ...others } = values;
    const dateStart = applyDate?.[0]
      ? dayjs(applyDate[0]).format(DATE_FORMAT.API)
      : null;
    const dateEnd = applyDate?.[1]
      ? dayjs(applyDate[1]).format(DATE_FORMAT.API)
      : null;
    setFilterParams((prev) => {
      const updatedParams = {
        ...prev,
        ...others,
      };

      if (dateStart !== null && dateEnd !== null) {
        updatedParams.dateStart = dateStart;
        updatedParams.dateEnd = dateEnd;
      }

      return updatedParams;
    });
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Update Status
  const [updateJobAPPStatus] = useUpdateJobAppMutation();
  const handleUpdateStatus = async (value: any, id: any) => {
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
    setSearchValue,
    handleRefresh,
    openDrawerFilter,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleUpdateStatus,
    dataUniqueCandidate,
    setPageLimit,
    setPage,
    handlePageChange,
  };
};

export default useJobApplication;
