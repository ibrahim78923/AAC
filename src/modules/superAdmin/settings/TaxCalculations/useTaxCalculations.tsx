import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetTaxCalculationQuery,
  usePostTaxCalculationMutation,
  useUpdateTaxCalculationMutation,
  useDeleteTaxCalculationMutation,
} from '@/services/superAdmin/settings/tax-calculations';
import { DATE_FORMAT } from '@/constants';
import {
  addTaxFormDefaultValues,
  addTaxFormValidationSchema,
} from './TaxCalculations.data';
import { PAGINATION } from '@/config';

const useTaxCalculations = () => {
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
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
  const { data: dataGetTaxCalculation, isLoading: loagingGetTaxCalculation } =
    useGetTaxCalculationQuery({
      params: { ...filterParams, ...searchPayLoad },
    });

  // Dropdown Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
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
    resetFilters();
  };

  const onSubmitFilters = async (values: any) => {
    const { createdDate, ...others } = values;
    const dateStart = createdDate?.[0]
      ? dayjs(createdDate[0]).format(DATE_FORMAT.API)
      : null;
    const dateEnd = createdDate?.[1]
      ? dayjs(createdDate[1]).format(DATE_FORMAT.API)
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

  // Add Tax
  const [postAddTax, { isLoading: loadingAddTax }] =
    usePostTaxCalculationMutation();
  const [isAddTaxCalculationDrawerOpen, setIsAddTaxCalculationDrawerOpen] =
    useState(false);

  const methodsAddTaxForm = useForm({
    resolver: yupResolver(addTaxFormValidationSchema),
    defaultValues: addTaxFormDefaultValues,
  });

  const { handleSubmit: handleMethodAddFaq, reset: resetAddTaxForm } =
    methodsAddTaxForm;

  const handleOpenAddDrawer = () => {
    setIsAddTaxCalculationDrawerOpen(true);
    handleActionsMenuClose();
  };
  const handleCloseAddDrawer = () => {
    setIsAddTaxCalculationDrawerOpen(false);
    resetAddTaxForm();
  };

  const onSubmitAddTax = async (values: any) => {
    const payLoad = {
      ...values,
      percentage: Number(values?.percentage),
    };
    try {
      await postAddTax({ body: payLoad })?.unwrap();
      handleCloseAddDrawer();
      enqueueSnackbar('A new tax added to the system.', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(`${error?.data?.error}: ${error?.data?.message}`, {
        variant: 'error',
      });
    }
  };
  const handleAddTaxSubmit = handleMethodAddFaq(onSubmitAddTax);

  // Update Status
  const [updateTax, { isLoading: loadingUpdateTax }] =
    useUpdateTaxCalculationMutation();
  const handleUpdateStatus = async (status: string) => {
    handleActionsMenuClose();
    const payLoad = {
      status: status,
    };
    try {
      await updateTax({ id: rowId, body: payLoad })?.unwrap();
      enqueueSnackbar(`Tax is ${status} now`, {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  // Update Tax
  const methodsEditTaxForm = useForm({
    resolver: yupResolver(addTaxFormValidationSchema),
    defaultValues: addTaxFormDefaultValues,
  });
  const { handleSubmit: submitEditTax } = methodsEditTaxForm;
  const [openDrawerEditTax, setOpenDrawerEditTax] = useState(false);
  const handleOpenDrawerEditTax = () => {
    handleActionsMenuClose();
    const selectedItem =
      dataGetTaxCalculation?.data?.taxCalculations.find(
        (item: any) => item._id === rowId,
      ) || {};
    if (selectedItem) {
      methodsEditTaxForm.setValue('name', selectedItem?.name);
      methodsEditTaxForm.setValue('percentage', selectedItem?.percentage);
      methodsEditTaxForm.setValue('description', selectedItem?.description);
      methodsEditTaxForm.setValue('applyOn', selectedItem?.applyOn);
    }
    setOpenDrawerEditTax(true);
  };
  const handleCloseDrawerEditTax = () => {
    setOpenDrawerEditTax(false);
  };
  const onSubmitEditJob = async (values: any) => {
    try {
      await updateTax({ id: rowId, body: values })?.unwrap();
      handleCloseDrawerEditTax();
      setSelectedRow([]);
      enqueueSnackbar('Information updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitEditTax = submitEditTax(onSubmitEditJob);

  // Delete Faq
  const [isTaxDeleteModal, setisTaxDeleteModal] = useState(false);
  const [deleteTaxCalculation, { isLoading: loadingDelete }] =
    useDeleteTaxCalculationMutation();
  const handleOpenModalDelete = () => {
    handleActionsMenuClose();
    setisTaxDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setisTaxDeleteModal(false);
  };

  const handleDeleteTaxCalculation = async () => {
    const items = await selectedRow.join(',');
    try {
      await deleteTaxCalculation(items)?.unwrap();
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
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetTaxCalculation,
    dataGetTaxCalculation,
    setSearchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    setPageLimit,
    setPage,
    handlePageChange,
    isAddTaxCalculationDrawerOpen,
    handleOpenAddDrawer,
    handleCloseAddDrawer,
    methodsAddTaxForm,
    handleAddTaxSubmit,
    loadingAddTax,
    resetAddTaxForm,
    loadingDelete,
    handleDeleteTaxCalculation,
    isTaxDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    openDrawerEditTax,
    handleOpenDrawerEditTax,
    handleCloseDrawerEditTax,
    handleUpdateStatus,
    loadingUpdateTax,
    handleSubmitEditTax,
    methodsEditTaxForm,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
  };
};

export default useTaxCalculations;
