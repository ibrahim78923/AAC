import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import {
  useGetDeletedContactsQuery,
  useRestoreContactMutation,
  useDeleteContactPermanentMutation,
} from '@/services/commonFeatures/contacts';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';

const useRestore = () => {
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
  const { data: dataGetDeletedContacts, isLoading: loadingGetContact } =
    useGetDeletedContactsQuery({
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
    const startDate = createdAt?.[0]
      ? dayjs(createdAt[0]).format(DATE_FORMAT.API)
      : null;
    const endDate = createdAt?.[1]
      ? dayjs(createdAt[1]).format(DATE_FORMAT.API)
      : null;
    setFilterParams((prev) => {
      const updatedParams = {
        ...prev,
        ...others,
      };

      if (startDate !== null && endDate !== null) {
        updatedParams.startDate = startDate;
        updatedParams.endDate = endDate;
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

  // Delete Contacts Permanent
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteContact, { isLoading: loadingDelete }] =
    useDeleteContactPermanentMutation();
  const handleOpenModalDelete = () => {
    handleActionsMenuClose();
    setIsDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsDeleteModal(false);
  };

  const handleDeleteContact = async () => {
    const contactIds = await selectedRow;
    try {
      await deleteContact({ contactIds })?.unwrap();
      handleCloseModalDelete();
      setSelectedRow([]);
      enqueueSnackbar('Contact has been permanently deleted.', {
        variant: 'success',
      });
      setIsActionsDisabled(true);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  // Restore Contacts
  const [isRestoreModal, setIsRestoreModal] = useState(false);
  const [restoreContacts, { isLoading: loadingRestore }] =
    useRestoreContactMutation();

  const handleOpenModalRestore = () => {
    handleActionsMenuClose();
    setIsRestoreModal(true);
  };
  const handleCloseModalRestore = () => {
    setIsRestoreModal(false);
  };

  const handleSubmitRestoreContact = async () => {
    const contactIds = await selectedRow;
    try {
      await restoreContacts({ contactIds })?.unwrap();

      handleCloseModalRestore();
      setSelectedRow([]);
      enqueueSnackbar('Record has been restored.', {
        variant: 'success',
      });
      setIsActionsDisabled(true);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const theme = useTheme();
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
    dataGetDeletedContacts,
    searchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteContact,
    loadingDelete,
    isRestoreModal,
    handleOpenModalRestore,
    handleSubmitRestoreContact,
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
