import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { parseISO } from 'date-fns';
import dayjs from 'dayjs';
import { jobPostingValidationSchema } from './jobPosting.data';
import {
  useGetJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from '@/services/superAdmin/settings/jobs';
import { PAGINATION } from '@/config';
import { DATE_FORMAT } from '@/constants/index';

const useJobPosting = () => {
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);

  // OPEN/CLOSE ACTIONS MENU
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // GET JOB POSTINGS
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const defaultParams = {
    page: PAGINATION?.CURRENT_PAGE,
    limit: PAGINATION?.PAGE_LIMIT,
  };
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageLimit,
  });
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: jopPostingData, isLoading: loadingJobPosting } =
    useGetJobsQuery({ params: { ...filterParams, ...searchPayLoad } });
  const methodsFilter: any = useForm();
  const { handleSubmit: handleMethodFilter, reset: ressetFilterForm } =
    methodsFilter;

  // HANDLE REFRESH
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

  // OPEN/CLOSE FILTER DRAWER
  const [openJobPostingFilter, setOpenJobPostingFilter] = useState(false);
  const handleOpenJobPostingFilters = () => {
    setOpenJobPostingFilter(true);
  };
  const handleCloseJobPostingFilters = () => {
    setOpenJobPostingFilter(false);
    ressetFilterForm();
  };

  const onSubmitFilters = async (values: any) => {
    if (values?.createdAt) {
      if (!Array.isArray(values?.createdAt)) {
        setFilterParams((prev) => {
          return {
            ...prev,
            dateStart: dayjs(values?.createdAt).format(DATE_FORMAT.API),
            dateEnd: dayjs(values?.createdAt).format(DATE_FORMAT.API),
          };
        });
      } else {
        setFilterParams((prev) => {
          return {
            ...prev,
            dateStart: dayjs(values?.createdAt[0]).format(DATE_FORMAT.API),
            dateEnd: dayjs(values?.createdAt[1]).format(DATE_FORMAT.API),
          };
        });
      }
    }
    setFilterParams((prev) => {
      return {
        ...prev,
        ...values,
      };
    });
    setOpenJobPostingFilter(false);
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
      jopPostingData?.data?.jobs.find((item: any) => item?._id === rowId) || {};
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
      setSelectedRow([]);
      enqueueSnackbar('Record Details Updated Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitEditJobPost = handleMethodEditJobPosting(onSubmitEditJob);

  // Update Status
  const handleUpdateStatus = async (status: string, id: any) => {
    const payLoad = {
      status: status,
    };
    try {
      await updateJobPost({ id: id, body: payLoad })?.unwrap();
      enqueueSnackbar(
        `This job is ${status === 'OPEN' ? 'open' : 'close'} now`,
        {
          variant: 'success',
        },
      );
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  // Delete JobPosting
  const [deleteJobPost, { isLoading: loadingDeleteJobPost }] =
    useDeleteJobMutation();
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
    const items = await selectedRow?.join(',');
    try {
      await deleteJobPost(items)?.unwrap();
      handleCloseModalDeleteJobPost();
      setSelectedRow([]);
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setIsActionsDisabled(true);
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
    jopPostingData,
    loadingJobPosting,
    filterParams,
    searchValue,
    setSearchValue,
    handleRefresh,
    setPageLimit,
    setPage,
    handlePageChange,
    openJobPostingFilter,
    handleOpenJobPostingFilters,
    handleCloseJobPostingFilters,
    methodsFilter,
    handleFiltersSubmit,
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
    handleUpdateStatus,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
  };
};
export default useJobPosting;
