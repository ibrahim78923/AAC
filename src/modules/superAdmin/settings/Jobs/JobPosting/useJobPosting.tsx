import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { parseISO } from 'date-fns';
import {
  jobPostingFiltersDefaultValues,
  jobPostingValidationSchema,
} from './jobPosting.data';
import {
  useGetJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from '@/services/superAdmin/settings/jobs';

const useJobPosting = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tableRowValues, setTableRowValues] = useState([]);
  const [rowId, setRowId] = useState(null);
  const defaultParams = { page: 1, limit: 5 };
  const [jobsParams, setJobsParams] = useState(defaultParams);
  const [searchValue, setSearchValue] = useState('');
  const [openJobPostingFilter, setOpenJobPostingFilter] = useState(false);
  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: jopPostinData, isLoading: loadingJobPosting } =
    useGetJobsQuery(jobsParams);
  const [deleteJobPost, { isLoading: loadingDeleteJobPost }] =
    useDeleteJobMutation();
  const methodsFilter: any = useForm({
    defaultValues: jobPostingFiltersDefaultValues,
  });
  const { handleSubmit: handleMethodFilter } = methodsFilter;

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

  const onSubmitFilters = async (values: any) => {
    const updatedParams: any = { ...jobsParams };
    for (const field in values) {
      if (values[field] !== '') {
        updatedParams[field] = values[field];
      }
    }
    setJobsParams(updatedParams);
    handleCloseJobPostingFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Update Job Posting
  const [updateJobPost, { isLoading: loadingUpdateJobPost }] =
    useUpdateJobMutation();
  const methodsEditJobPosting = useForm({
    resolver: yupResolver(jobPostingValidationSchema),
  });
  const { handleSubmit: handleMethodEditJobPosting } = methodsEditJobPosting;
  const [openEditJobPost, setOpenEditJobPost] = useState(false);
  const handleOpenEditJobPost = () => {
    handleClose();
    const selectedItem =
      jopPostinData?.data?.jobs.find((item: any) => item._id === rowId) || {};
    if (selectedItem) {
      methodsEditJobPosting.setValue('title', selectedItem?.title);
      methodsEditJobPosting.setValue('jobType', selectedItem?.jobType);
      methodsEditJobPosting.setValue('jobCategory', selectedItem?.jobCategory);
      methodsEditJobPosting.setValue('experience', selectedItem?.experience);
      methodsEditJobPosting.setValue(
        'numberOfVacancy',
        selectedItem?.numberOfVacancy,
      );
      methodsEditJobPosting.setValue(
        'deadline',
        parseISO(selectedItem?.deadline),
      );
      methodsEditJobPosting.setValue('description', selectedItem?.description);
    }
    setOpenEditJobPost(true);
  };

  const handleCloseEditJobPost = () => {
    setOpenEditJobPost(false);
  };

  const onSubmitEditJob = async (values: any) => {
    try {
      await updateJobPost({ id: rowId, body: values })?.unwrap();
      handleCloseEditJobPost();
      enqueueSnackbar('Job updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitEditJobPost = handleMethodEditJobPosting(onSubmitEditJob);

  // Delete JobPosting
  const [openModalDeleteJobPost, setOpenModalDeleteJobPost] =
    useState<boolean>(false);
  const handleOpenModalDeleteJobPost = () => {
    handleClose();
    setOpenModalDeleteJobPost(true);
  };

  const handleCloseModalDeleteJobPost = () => {
    setOpenModalDeleteJobPost(false);
  };

  const handleDeleteJobPost = async () => {
    const items = await tableRowValues.join(',');
    try {
      await deleteJobPost(items)?.unwrap();
      handleCloseEditJobPost();
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setIsDisabled(true);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    anchorEl,
    actionMenuOpen,
    handleActionsClick,
    handleClose,
    jopPostinData,
    loadingJobPosting,
    jobsParams,
    searchValue,
    handleSearch,
    handleRefresh,
    openJobPostingFilter,
    handleOpenJobPostingFilters,
    handleCloseJobPostingFilters,
    methodsFilter,
    handleFiltersSubmit,
    tableRowValues,
    setTableRowValues,
    isDisabled,
    setIsDisabled,
    setRowId,
    rowId,
    openModalDeleteJobPost,
    handleOpenModalDeleteJobPost,
    handleCloseModalDeleteJobPost,
    handleDeleteJobPost,
    loadingDeleteJobPost,
    openEditJobPost,
    handleOpenEditJobPost,
    handleCloseEditJobPost,
    handleSubmitEditJobPost,
    loadingUpdateJobPost,
    methodsEditJobPosting,
  };
};

export default useJobPosting;
