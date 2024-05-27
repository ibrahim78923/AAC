import { useState } from 'react';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { DATE_FORMAT } from '@/constants';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
  useUpdateContactOwnerMutation,
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';

const useContactsSaleSite = () => {
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
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
  const { data: dataGetContacts, isLoading: loadingGetContacts } =
    useGetContactsQuery({
      params: { ...filterParams, ...searchPayLoad, ...paginationParams },
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
    const filterPayload: any = {};

    Object.entries(values).forEach(([key, value]: any) => {
      if (value) {
        switch (key) {
          case 'createdAt':
          case 'lastActivityDate':
            filterPayload[key] = dayjs(value).format(DATE_FORMAT.API);
            break;
          case 'contactOwnerId':
          case 'lifeCycleStageId':
          case 'statusId':
          case 'createdBy':
            filterPayload[key] = value?._id;
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
      enqueueSnackbar('Contact has been deleted.', {
        variant: 'success',
      });
      setSelectedRow([]);
      setIsActionsDisabled(true);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  // Re-Asign
  const [reAssignContactOwner, { isLoading: loadingReassign }] =
    useUpdateContactOwnerMutation();
  const methodsReAssign = useForm({});
  const { handleSubmit: handleMethodReAssign } = methodsReAssign;
  const [isReAssign, setIsReAssign] = useState(false);
  const handleOpenModalReAssign = () => {
    handleActionsMenuClose();
    const selectedItem =
      dataGetContacts?.data?.contacts?.find(
        (item: any) => item?._id === rowId,
      ) || {};

    if (selectedItem) {
      methodsReAssign.setValue('contactOwnerId', selectedItem?.contactOwnerId);
    }
    setIsReAssign(true);
  };
  const handleCloseModalReAssign = () => {
    setIsReAssign(false);
  };

  const onSubmitReAssign = async (values: any) => {
    try {
      await reAssignContactOwner({ id: rowId, body: values })?.unwrap();
      handleCloseModalReAssign();
      setSelectedRow([]);
      enqueueSnackbar('Contact updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitReAssign = handleMethodReAssign(onSubmitReAssign);

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
    // contactOwnerData,
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    dataGetContacts,
    loadingGetContacts,
    setPage,
    setPageLimit,
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
    methodsReAssign,
    isReAssign,
    handleOpenModalReAssign,
    handleCloseModalReAssign,
    handleSubmitReAssign,
    loadingReassign,
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
