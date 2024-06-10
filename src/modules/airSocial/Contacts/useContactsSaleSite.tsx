import { useState } from 'react';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { DATE_FORMAT } from '@/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetContactsQuery,
  useGetContactsViewQuery,
  useDeleteContactMutation,
  useUpdateContactOwnerMutation,
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';
import {
  customValidationSchema,
  defaultValues,
} from './ContactsModalBox/AssignModalBox/AssignModal.data';

const useContactsSaleSite = () => {
  const { data: dataContactViews } = useGetContactsViewQuery({});

  const getTabsArray = (data: any) => {
    const tabsArray = [{ _id: 'all', name: 'All Contacts' }];
    if (!data || !Array.isArray(data)) {
      return tabsArray;
    }
    const dataArray = data.map((view: any) => ({
      _id: view._id,
      name: view.name,
    }));

    return [...tabsArray, ...dataArray];
  };
  const tabsArray = getTabsArray(dataContactViews?.data);

  const [tabValue, setTabValue] = useState('all');
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const [isImportDrawer, setIsImportDrawer] = useState(false);
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
    data: dataGetContacts,
    isLoading: loadingGetContacts,
    isFetching: fetchingGetContacts,
  } = useGetContactsQuery({
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

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    const selectedView: any = dataContactViews?.data.find(
      (tab: any) => tab._id === newValue,
    );

    const filterPayload: any = {};
    const keys = [
      'contactOwnerId',
      'lifeCycleStageId',
      'statusId',
      'createdAtFilter',
      'createdByFilter',
    ];
    keys.forEach((key) => {
      if (selectedView && selectedView[key] !== undefined) {
        if (key === 'createdAtFilter') {
          filterPayload.createdAt = dayjs(selectedView[key]).format(
            DATE_FORMAT.API,
          );
        } else if (key === 'createdByFilter') {
          filterPayload.createdBy = selectedView[key];
        } else {
          filterPayload[key] = selectedView[key];
        }
      }
    });
    setFilterParams(filterPayload);
  };

  // Contact View
  const [isCreateViewOpen, setIsCreateViewOpen] = useState(false);
  const handleOpenCreateView = () => {
    setIsCreateViewOpen(true);
  };
  const handleCloseCreateView = () => {
    setIsCreateViewOpen(false);
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
  const methodsReAssign = useForm<any>({
    resolver: yupResolver(customValidationSchema),
    defaultValues: defaultValues,
  });
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
    const payload = {
      contactOwnerId: values?.contactOwnerId?._id,
    };
    try {
      await reAssignContactOwner({ id: rowId, body: payload })?.unwrap();
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
  const [isDealCustomize, setIsDealCustomize] = useState(false);
  const handleDealCustomize = () => setIsDealCustomize(!isDealCustomize);

  return {
    tabValue,
    handleChangeTabs,
    tabsArray,
    // contactOwnerData,
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    dataGetContacts,
    loadingGetContacts,
    fetchingGetContacts,
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
    isDealCustomize,
    handleDealCustomize,
    isCreateViewOpen,
    handleOpenCreateView,
    handleCloseCreateView,
    isImportDrawer,
    setIsImportDrawer,
  };
};

export default useContactsSaleSite;
