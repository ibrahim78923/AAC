import { useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import {
  useGetRestoreFormsQuery,
  usePatchRestoreFormMutation,
  useDeleteFormPermanentMutation,
} from '@/services/airMarketer/lead-capture/forms';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';

const useRestore = () => {
  const theme = useTheme();
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
    data: dataGetDeletedContacts,
    isLoading: loadingGetContact,
    isFetching: fetchingGetContacts,
  } = useGetRestoreFormsQuery({
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
    const filterPayload: any = {};

    Object.entries(values).forEach(([key, value]: any) => {
      if (value) {
        switch (key) {
          case 'filterByDate':
            filterPayload.startDate = dayjs(value[0]).format(DATE_FORMAT.API);
            filterPayload.endDate = dayjs(value[1]).format(DATE_FORMAT.API);
            break;
          default:
            filterPayload[key] = value;
            break;
        }
      }
    });
    setFilterParams(filterPayload);
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

  // Delete Forms Permanent
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteForms, { isLoading: loadingDelete }] =
    useDeleteFormPermanentMutation();
  const handleOpenModalDelete = () => {
    handleActionsMenuClose();
    setIsDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsDeleteModal(false);
  };

  const handleDeleteForms = async () => {
    const formIds = await selectedRow;
    try {
      await deleteForms({ formIds })?.unwrap();
      handleCloseModalDelete();
      setSelectedRow([]);
      enqueueSnackbar('Form has been permanently deleted.', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  // Restore Forms
  const [isRestoreModal, setIsRestoreModal] = useState(false);
  const [restoreForms, { isLoading: loadingRestore }] =
    usePatchRestoreFormMutation();

  const handleOpenModalRestore = () => {
    handleActionsMenuClose();
    setIsRestoreModal(true);
  };
  const handleCloseModalRestore = () => {
    setIsRestoreModal(false);
  };

  const handleSubmitRestoreForm = async () => {
    // const ids = await selectedRow;
    const ids = await selectedRow?.join(',');
    try {
      await restoreForms({ ids })?.unwrap();

      handleCloseModalRestore();
      setSelectedRow([]);
      enqueueSnackbar('Record has been restored.', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const [isRestoreFilter, setIsRestoreFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [isPermanantlyDel, setIsPermanantlyDel] = useState(false);
  const [IsRestoreDealModal, setIsRestoreDealModal] = useState(false);

  const handlePermanantDelete = () => {
    setIsPermanantlyDel(!isPermanantlyDel);
  };
  const handleResDealModal = () => {
    setIsRestoreDealModal(!IsRestoreDealModal);
  };

  const handleRestoreFilter = () => {
    setIsRestoreFilter(!isRestoreFilter);
  };
  const handleActions = (value: string | any) => {
    switch (value) {
      case 'Restore':
        handleResDealModal();
        break;
      case 'Delete':
        handlePermanantDelete();
        break;
      default:
        break;
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
    loadingGetContact,
    fetchingGetContacts,
    dataGetDeletedContacts,
    searchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteForms,
    loadingDelete,
    isRestoreModal,
    handleOpenModalRestore,
    handleSubmitRestoreForm,
    handleCloseModalRestore,
    loadingRestore,

    isRestoreFilter,
    handleRestoreFilter,
    search,
    setSearch,
    handlePermanantDelete,
    handleResDealModal,
    isPermanantlyDel,
    IsRestoreDealModal,
    theme,
    handleActions,
  };
};

export default useRestore;
