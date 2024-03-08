import { useState } from 'react';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { DATE_FORMAT } from '@/constants';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';

const useContactsSaleSite = () => {
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
  const { data: dataGetContacts, isLoading: loadingGetContacts } =
    useGetContactsQuery({
      params: { ...filterParams, ...searchPayLoad },
    });

  // Filters
  const [openFilters, setOpenFilters] = useState(false);
  const handleOpenFilters = () => {
    setOpenFilters(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const onSubmitFilters = async (values: any) => {
    const { createdAt, lastActivityDate, nextActivityDate, ...others } = values;

    setFilterParams((prev) => {
      const updatedParams = {
        ...prev,
        ...others,
      };

      if (createdAt) {
        updatedParams.createdAt = dayjs(createdAt).format(DATE_FORMAT.API);
      }
      if (lastActivityDate) {
        updatedParams.lastActivityDate = dayjs(lastActivityDate[0]).format(
          DATE_FORMAT.API,
        );
      }
      if (nextActivityDate) {
        updatedParams.nextActivityDate = dayjs(nextActivityDate[0]).format(
          DATE_FORMAT.API,
        );
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

  // Delete Contact
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [deleteContact, { isLoading: loadingDelete }] =
    useDeleteContactMutation();
  const handleOpenModalDelete = () => {
    handleActionsMenuClose();
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDeleteContact = async () => {
    const contactIds = await selectedRow;
    try {
      await deleteContact({ contactIds })?.unwrap();
      handleCloseModalDelete();
      setSelectedRow([]);
      enqueueSnackbar('Contact has been deleted.', {
        variant: 'success',
      });
      setIsActionsDisabled(true);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  // Re-Asign
  const [isReAssign, setIsReAssign] = useState(false);
  const handleOpenModalReAssign = () => {
    handleActionsMenuClose();
    setIsReAssign(true);
  };
  const handleCloseModalReAssign = () => {
    setIsReAssign(false);
  };

  // Modal export
  const [openModalExport, setOpenModalExport] = useState(false);
  const handleOpenModalExport = () => {
    setOpenModalExport(true);
  };
  const handleCloseModalExport = () => {
    setOpenModalExport(false);
  };

  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isDealCustomize, setIsDealCustomize] = useState(false);
  const handleChange = () => setIsOpen(!isOpen);
  const handleDealCustomize = () => setIsDealCustomize(!isDealCustomize);

  return {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    dataGetContacts,
    loadingGetContacts,
    setPage,
    setPageLimit,
    handlePageChange,
    handleRefresh,
    handleFiltersSubmit,
    searchValue,
    setSearchValue,
    methodsFilter,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteContact,
    loadingDelete,
    isReAssign,
    handleOpenModalReAssign,
    handleCloseModalReAssign,
    openModalExport,
    handleOpenModalExport,
    handleCloseModalExport,
    setOpenModalExport,

    theme,
    isOpen,
    isDealCustomize,
    handleChange,
    handleDealCustomize,
  };
};

export default useContactsSaleSite;
