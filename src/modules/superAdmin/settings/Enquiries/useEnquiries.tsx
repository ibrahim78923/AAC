import { useState } from 'react';
import {
  useDeleteEnquiryMutation,
  useGetEnquiriesQuery,
  usePatchEnquiriesMutation,
  useEnquiriesPostNewEmailMutation,
} from '@/services/superAdmin/enquiries';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { SelectChangeEvent } from '@mui/material/Select';

export const useEnquiries = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isActionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get Data
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
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

  const methodsFilter = useForm();
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;

  const {
    data: enquiriesData,
    isLoading: enquiriesIsLoading,
    isFetching: enquiriesIsFetching,
  } = useGetEnquiriesQuery({
    params: { ...filterParams, ...searchPayLoad, ...paginationParams },
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
    setFilterParams(values);
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Refresh
  const handleRefresh = () => {
    setPageLimit(PAGINATION?.PAGE_LIMIT);
    setPage(PAGINATION?.CURRENT_PAGE);
    setFilterParams({});
    resetFilters();
  };

  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [trigger, status] = useEnquiriesPostNewEmailMutation();
  const methodsQueryForm: any = useForm({
    resolver: yupResolver(
      Yup?.object()?.shape({
        reply: Yup?.string()?.trim()?.required('Reply is Required'),
      }),
    ),
    defaultValues: {
      reply: '',
    },
  });
  const { handleSubmit: handleMethodQuery, reset: resetQueryForm } =
    methodsQueryForm;

  const handleOpenModalQuery = () => {
    handleClose();
    setIsQueryModalOpen(true);
  };
  const handleCloseModalQuery = () => {
    resetQueryForm();
    setIsQueryModalOpen(false);
  };

  const onSubmitQuery = async (values: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', selectedRowData?.email);
    emailFormData?.append('subject', selectedRowData?.query);
    emailFormData?.append('html', values?.reply);

    try {
      await trigger(emailFormData)?.unwrap();
      successSnackbar('Reply Sent Successfully!');
      handleCloseModalQuery();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      handleCloseModalQuery();
    }
  };
  const handleQuerySubmit = handleMethodQuery(onSubmitQuery);

  const [isEnquiriesDeleteModal, setIsEnquiriesDeleteModal] = useState(false);
  const [deleteEnquiriesMutation, { isLoading: loadingDeleteEnquiries }] =
    useDeleteEnquiryMutation();

  const handleOpenModalDelete = () => {
    handleClose();
    setIsEnquiriesDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsEnquiriesDeleteModal(false);
  };

  const handleDeleteEnquiries = async () => {
    const items = await selectedRow?.join(',');
    try {
      await deleteEnquiriesMutation(items);
      handleCloseModalDelete();
      setSelectedRow([]);
      enqueueSnackbar('Enquiries delete successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Error while deleting enquiries', {
        variant: 'success',
      });
    }
  };

  const [patchEnquiriesTrigger, patchEnquiriesStatus] =
    usePatchEnquiriesMutation();

  const handleStatusChange = async (info: any, event: SelectChangeEvent) => {
    const patchEnquiriesParameter = {
      queryParams: info?._id,
      body: { status: event?.target?.value },
    };

    try {
      await patchEnquiriesTrigger(patchEnquiriesParameter)?.unwrap();
      successSnackbar('Status Updated successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    anchorEl,
    isActionMenuOpen,
    handleClick,
    handleClose,
    setSearchValue,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    selectedRowData,
    setSelectedRowData,
    enquiriesData,
    enquiriesIsLoading,
    enquiriesIsFetching,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    isQueryModalOpen,
    handleOpenModalQuery,
    handleCloseModalQuery,
    methodsQueryForm,
    handleQuerySubmit,
    status,
    isEnquiriesDeleteModal,
    handleCloseModalDelete,
    handleOpenModalDelete,
    handleDeleteEnquiries,
    loadingDeleteEnquiries,
    handleStatusChange,
    patchEnquiriesStatus,
  };
};
