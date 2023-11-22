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
import { faqsFilterDefaultValues } from './Faqs.data';
import {
  addFaqsValidationSchema,
  addFaqsDefaultValues,
} from './AddFaq/AddFaq.data';
import { DATE_FORMAT } from '@/constants';

const useFaqs = () => {
  const [rowId, setRowId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalTitle, setModalTitle] = useState('FAQ');
  const [tableRowValues, setTableRowValues] = useState([]);
  const defaultParams = { page: 1, limit: 5 };
  const [filterParams, setFilterParams] = useState(defaultParams);
  const methodsFilter: any = useForm({
    defaultValues: faqsFilterDefaultValues,
  });
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const { data: dataGetFaqs, isLoading: loagingGetFaqs } =
    useGetFaqsQuery(filterParams);

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
    if (values?.faqCategory !== '') {
      setFilterParams((prev) => {
        return {
          ...prev,
          faqCategory: values.faqCategory,
        };
      });
    }
    if (values?.createdBy !== '') {
      setFilterParams((prev) => {
        return {
          ...prev,
          createdBy: values.createdBy,
        };
      });
    }
    if (values?.createAt != null) {
      if (!Array.isArray(values?.createdAt)) {
        setFilterParams((prev) => {
          return {
            ...prev,
            startDate: dayjs(values?.createdAt).format(DATE_FORMAT.API),
            endDate: dayjs(values?.createdAt).format(DATE_FORMAT.API),
          };
        });
      } else {
        setFilterParams((prev) => {
          return {
            ...prev,
            startDate: dayjs(values?.createdAt[0]).format(DATE_FORMAT.API),
            endDate: dayjs(values?.createdAt[1]).format(DATE_FORMAT.API),
          };
        });
      }
    }
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Search
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target?.value);
    setFilterParams((prev) => {
      return {
        ...prev,
        search: event?.target?.value,
      };
    });
  };

  // Refresh
  const handleRefresh = () => {
    setFilterParams(defaultParams);
    setSearchValue('');
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

  const handleOpenModalEditFaq = () => {
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
    const items = await tableRowValues?.join(',');
    try {
      await deleteFaq(items)?.unwrap();
      handleCloseModalDelete();
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
    handleActionsMenuClick,
    handleActionsMenuClose,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    rowId,
    setRowId,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetFaqs,
    dataGetFaqs,
    handleSearch,
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
    handleOpenModalEditFaq,
    handleCloseModalEditFaq,
    handleSubmitUpdateFaq,
    loadingUpdateFaq,
    methodsEditFaq,
  };
};

export default useFaqs;
