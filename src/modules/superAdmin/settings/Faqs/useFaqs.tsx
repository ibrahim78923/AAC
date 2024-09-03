import { useEffect, useState } from 'react';
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
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('FAQ');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [filterParams, setFilterParams] = useState({});
  useEffect(() => {
    if (selectedRow?.length === 0) {
      setIsActionsDisabled(true);
    } else {
      setIsActionsDisabled(false);
    }
  }, [selectedRow]);
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
  const { data: dataGetFaqs, isLoading: loagingGetFaqs } = useGetFaqsQuery({
    params: { ...filterParams, ...searchPayLoad, ...paginationParams },
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
    const updateFilterParams = (key: string, value: any) => {
      setFilterParams((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    };

    const createdAt = values?.createdAt;
    const faqCategory = values?.faqCategory?._id;
    const createdBy = values?.createdBy?._id;

    if (createdAt && createdAt?.length === 2) {
      const [start, end] = createdAt;
      updateFilterParams(
        'dateStart',
        start ? dayjs(start).format(DATE_FORMAT.API) : null,
      );
      updateFilterParams(
        'dateEnd',
        end ? dayjs(end).format(DATE_FORMAT.API) : null,
      );
    } else {
      updateFilterParams('dateStart', undefined);
      updateFilterParams('dateEnd', undefined);
    }

    if (faqCategory) {
      updateFilterParams('faqCategory', faqCategory);
    } else {
      updateFilterParams('faqCategory', undefined);
    }

    if (createdBy) {
      updateFilterParams('createdBy', createdBy);
    } else {
      updateFilterParams('createdBy', undefined);
    }

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
    const payload = {
      faqCategory: values?.faqCategory?._id,
      faqQuestion: values?.faqQuestion,
      faqAnswer: values?.faqAnswer,
    };

    try {
      await postAddFaq({ body: payload })?.unwrap();
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
    const selectedItem =
      dataGetFaqs?.data?.faqs?.find((item: any) => item?._id === rowId) || {};

    const payload: any = {};
    if (selectedItem?.faqCategory?._id !== values?.faqCategory?._id) {
      payload.faqCategory = values?.faqCategory?._id;
    }
    if (selectedItem?.faqQuestion !== values?.faqQuestion) {
      payload.faqQuestion = values?.faqQuestion;
    }
    if (selectedItem?.faqAnswer !== values?.faqAnswer) {
      payload.faqAnswer = values?.faqAnswer;
    }

    try {
      await updateFaq({ id: rowId, body: payload })?.unwrap();
      await handleCloseModalEditFaq();
      enqueueSnackbar('FAQ updated successfully', {
        variant: 'success',
      });
      setSelectedRow([]);
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
    selectedRow,
    setSelectedRow,
    isActionsDisabled,
    setRowId,
    rowId,
  };
};

export default useFaqs;
