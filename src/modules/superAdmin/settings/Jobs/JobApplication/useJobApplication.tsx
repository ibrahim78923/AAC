import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import {
  useGetJobAppsQuery,
  useGetUniqueCandidateQuery,
  useUpdateJobAppMutation,
} from '@/services/superAdmin/settings/jobs/job-application';
import { DATE_FORMAT } from '@/constants/index';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useJobApplication = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data, isLoading } = useGetJobAppsQuery({
    params: { ...filterParams, ...searchPayLoad, ...paginationParams },
  });
  const { data: dataUniqueCandidate } = useGetUniqueCandidateQuery({});
  const methodsFilter: any = useForm();
  const { handleSubmit: handleMethodFilter, reset: ressetFilterForm } =
    methodsFilter;

  // HANDLE REFRESH
  const handleRefresh = () => {
    setPageLimit(PAGINATION?.PAGE_LIMIT);
    setPage(PAGINATION?.CURRENT_PAGE);
    setFilterParams({});
    ressetFilterForm();
  };

  // OPEN/CLOSE FILTER DRAWER
  const [openDrawerFilter, setOpenDrawerFilter] = useState(false);
  const handleOpenFilters = () => {
    setOpenDrawerFilter(true);
  };
  const handleCloseFilters = () => {
    setOpenDrawerFilter(false);
    ressetFilterForm();
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
      successSnackbar(`Candidate is ${value} now`);
    } catch (error: any) {
      errorSnackbar('An error occured');
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
  };
};

export default useJobApplication;
