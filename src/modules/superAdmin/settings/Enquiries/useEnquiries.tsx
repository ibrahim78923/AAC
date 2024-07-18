import { useState } from 'react';
import {
  useDeleteEnquiryMutation,
  useGetEnquiriesQuery,
} from '@/services/superAdmin/enquiries';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { usePostNewEmailMutation } from '@/services/airServices/tickets/single-ticket-details/new-email';
import { errorSnackbar, successSnackbar } from '@/utils/api';

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
  const [selectedRow, setSelectedRow]: any = useState([]);
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
  const [trigger, status] = usePostNewEmailMutation();
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
  const [deleteEnquiriesMutation] = useDeleteEnquiryMutation();

  const handleOpenModalDelete = () => {
    handleClose();
    setIsEnquiriesDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsEnquiriesDeleteModal(false);
  };

  const handleDeleteEnquiries = async () => {
    try {
      await deleteEnquiriesMutation({ ids: selectedRow?.join(',') });
      handleCloseModalDelete();
      enqueueSnackbar('Enquiries delete successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Error while deleting enquiries', {
        variant: 'success',
      });
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
  };
};
