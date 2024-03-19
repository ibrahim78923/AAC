import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetFaqsQuery,
  usePostFaqsMutation,
  useDeleteFaqsMutation,
  useUpdateFaqsMutation,
} from '@/services/superAdmin/settings/faqs';
import {
  addFaqsValidationSchema,
  addFaqsDefaultValues,
} from './AddFaq/AddFaq.data';
import { DATE_FORMAT } from '@/constants';
import { PAGINATION } from '@/config';

const useFaqs = () => {
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [modalTitle, setModalTitle] = useState('FAQ');
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
  const methodsFilter: any = useForm();
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const { data: dataGetFaqs, isLoading: loagingGetFaqs } = useGetFaqsQuery({
    params: { ...filterParams, ...searchPayLoad },
  });

  // Dropdown Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };

  // Filters
  const [openFilters, setOpenFilters] = useState(false);
  const handleOpenFilters = () => {
    setOpenFilters(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const onSubmitFilters = async (values: any) => {
    const { createdAt, ...others } = values;
    const dateStart = createdAt?.[0]
      ? dayjs(createdAt[0]).format(DATE_FORMAT.API)
      : null;
    const dateEnd = createdAt?.[1]
      ? dayjs(createdAt[1]).format(DATE_FORMAT.API)
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

  // Refresh
  const handleRefresh = () => {
    setFilterParams(defaultParams);
    resetFilters();
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

  // Add FAQ
  const [postAddFaq, { isLoading: loadingAddFaq }] = usePostFaqsMutation();
  const [openModalAddFaq, setOpenModalAddFaq] = useState(false);
  const methodsAddFaqs = useForm({
    resolver: yupResolver(addFaqsValidationSchema),
    defaultValues: addFaqsDefaultValues,
  });

  const { handleSubmit: handleMethodAddFaq, reset: resetAddFaqForm } =
    methodsAddFaqs;

  const handleOpenModalFaq = (title: string) => {
    setModalTitle(title);
    setOpenModalAddFaq(true);
    handleActionsMenuClose();
  };
  const handleCloseModalFaq = () => {
    setOpenModalAddFaq(false);
    resetAddFaqForm();
  };

  const onSubmitAddFaq = async (values: any) => {
    try {
      await postAddFaq({ body: values })?.unwrap();
      handleCloseModalFaq();
      enqueueSnackbar('FAQ added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddFaqSubmit = handleMethodAddFaq(onSubmitAddFaq);

  // Update FAQ
  const [updateFaq, { isLoading: loadingUpdateFaq }] = useUpdateFaqsMutation();
  const methodsEditFaq = useForm({
    resolver: yupResolver(addFaqsValidationSchema),
    defaultValues: addFaqsDefaultValues,
  });
  const { handleSubmit: handleMethodEditFaq } = methodsEditFaq;
  const [openModalEditFaq, setOpenModalEditFaq] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('Edit');
  const [onViewDisabled, setOnViewDisabled] = useState(false);

  const handleOpenModalEditFaq = (title: string) => {
    if (title === 'View') {
      setOnViewDisabled(true);
    } else {
      setOnViewDisabled(false);
    }
    setDrawerTitle(title);
    handleActionsMenuClose();
    const selectedItem =
      dataGetFaqs?.data?.faqs?.find((item: any) => item?._id === rowId) || {};
    if (selectedItem) {
      methodsEditFaq.setValue('faqCategory', selectedItem?.faqCategory);
      methodsEditFaq.setValue('faqQuestion', selectedItem?.faqQuestion);
      methodsEditFaq.setValue('faqAnswer', selectedItem?.faqAnswer);
    }
    setOpenModalEditFaq(true);
  };
  const handleCloseModalEditFaq = () => {
    setOpenModalEditFaq(false);
  };

  const onSubmitEditJob = async (values: any) => {
    try {
      await updateFaq({ id: rowId, body: values })?.unwrap();
      handleCloseModalEditFaq();
      setSelectedRow([]);
      enqueueSnackbar('FAQ updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitUpdateFaq = handleMethodEditFaq(onSubmitEditJob);

  // Delete Faq
  const [isFaqsDeleteModal, setIsFaqsDeleteModal] = useState(false);
  const [deleteFaq, { isLoading: loadingDelete }] = useDeleteFaqsMutation();
  const handleOpenModalDelete = () => {
    handleActionsMenuClose();
    setIsFaqsDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsFaqsDeleteModal(false);
  };

  const handleDeleteFaq = async () => {
    const items = await selectedRow?.join(',');
    try {
      await deleteFaq(items)?.unwrap();
      handleCloseModalDelete();
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
    handleActionsMenuClick,
    handleActionsMenuClose,
    setSearchValue,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetFaqs,
    dataGetFaqs,
    searchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    modalTitle,
    openModalAddFaq,
    handleOpenModalFaq,
    handleCloseModalFaq,
    methodsAddFaqs,
    handleAddFaqSubmit,
    loadingAddFaq,
    resetAddFaqForm,
    loadingDelete,
    handleDeleteFaq,
    isFaqsDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    openModalEditFaq,
    drawerTitle,
    onViewDisabled,
    handleOpenModalEditFaq,
    handleCloseModalEditFaq,
    handleSubmitUpdateFaq,
    loadingUpdateFaq,
    methodsEditFaq,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
  };
};

export default useFaqs;
