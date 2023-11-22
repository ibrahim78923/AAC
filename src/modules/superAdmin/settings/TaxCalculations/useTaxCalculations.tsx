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
  taxFormFiltersDefaultValues,
} from './TaxCalculations.data';

const useTaxCalculations = () => {
  const [rowId, setRowId] = useState(null);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [tableRowValues, setTableRowValues] = useState([]);
  const defaultParams = { page: 1, limit: 5 };
  const [filterParams, setFilterParams] = useState(defaultParams);
  const methodsFilter: any = useForm({
    defaultValues: taxFormFiltersDefaultValues,
  });
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const { data: dataGetTaxCalculation, isLoading: loagingGetTaxCalculation } =
    useGetTaxCalculationQuery(filterParams);

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
    if (values?.status !== '') {
      setFilterParams((prev) => {
        return {
          ...prev,
          status: values?.status,
        };
      });
    }
    if (values?.createdDate != null) {
      if (!Array.isArray(values?.createdDate)) {
        const formatedDate = dayjs(values?.createdDate).format(
          DATE_FORMAT?.API,
        );
        setFilterParams((prev) => {
          return {
            ...prev,
            dateStart: formatedDate,
            dateEnd: formatedDate,
          };
        });
      } else {
        setFilterParams((prev) => {
          return {
            ...prev,
            dateStart: dayjs(values?.createdDate[0]).format(DATE_FORMAT?.API),
            dateEnd: dayjs(values?.createdDate[1]).format(DATE_FORMAT?.API),
          };
        });
      }
    }
    if (values?.applyOn !== '') {
      setFilterParams((prev) => {
        return {
          ...prev,
          applyOn: values.applyOn,
        };
      });
    }
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Search
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setFilterParams((prev) => {
      return {
        ...prev,
        search: event.target.value,
      };
    });
  };

  // Refresh
  const handleRefresh = () => {
    setFilterParams(defaultParams);
    setSearchValue('');
    resetFilters();
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
    const items = await tableRowValues.join(',');
    try {
      await deleteTaxCalculation(items)?.unwrap();
      handleCloseModalDelete();
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
    isActionsDisabled,
    setIsActionsDisabled,
    tableRowValues,
    setTableRowValues,
    rowId,
    setRowId,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetTaxCalculation,
    dataGetTaxCalculation,
    handleSearch,
    searchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
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
  };
};

export default useTaxCalculations;
