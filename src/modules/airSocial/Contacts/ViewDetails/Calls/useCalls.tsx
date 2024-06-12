import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useDeleteCallMutation,
  useGetCallsQuery,
  usePostCallMutation,
  useUpdateCallMutation,
} from '@/services/commonFeatures/contact-calls';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { useGetEmployeeListQuery } from '@/services/superAdmin/user-management/UserList';
import { getSession } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCallValidationSchema } from './AddCalls/AddCalls.data';
import { parseISO } from 'date-fns';

const useCalls = (contactId: any = '') => {
  const theme = useTheme();
  const { user } = getSession();

  // Actions Dropdown Menu
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

  // Get Employee List
  const { data: employeeListData } = useGetEmployeeListQuery({
    orgId: user?.organization?._id,
  });
  const employeeList = employeeListData?.data?.users?.map((item: any) => ({
    value: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  // Get Contacts List
  const { data: dataContactsList } = useGetContactsQuery({});
  const contactsList = dataContactsList?.data?.contacts?.map((item: any) => ({
    value: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  // Get Calls Data
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  const {
    data: dataGetCalls,
    isLoading: loadingGetCalls,
    isFetching: fetchingGetCalls,
  } = useGetCallsQuery({
    params: paginationParams,
  });

  // Add Call
  const [postAddCall, { isLoading: loadingAddCall }] = usePostCallMutation();
  const [openDrawerAddCall, setOpenDrawerAddCall] = useState(false);
  const methodsAddCall = useForm({
    resolver: yupResolver(addCallValidationSchema),
  });

  const { handleSubmit: handleMethodAddCall, reset: resetAddCallForm } =
    methodsAddCall;

  const handleOpenDrawerAddCall = () => {
    setOpenDrawerAddCall(true);
  };
  const handleCloseDrawerAddCall = () => {
    setOpenDrawerAddCall(false);
    resetAddCallForm();
  };

  const onSubmitAddCall = async (values: any) => {
    const payload = {
      recordType: 'contacts',
      contactId: contactId,
      recordId: contactId,
    };
    try {
      await postAddCall({ body: { ...values, ...payload } })?.unwrap();
      handleCloseDrawerAddCall();
      enqueueSnackbar('Call has been added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddCallSubmit = handleMethodAddCall(onSubmitAddCall);

  // Edit/View Call
  const methodsEditCall = useForm({});

  const [openDrawerEditCall, setOpenDrawerEditCall] = useState(false);
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('View');

  const handleOpenDrawerEditCall = (title: string) => {
    const flag = title === 'View' ? true : false;
    setIsFieldDisabled(flag);
    setDrawerTitle(title);
    handleActionsMenuClose();
    const selectedItem =
      dataGetCalls?.data?.contactcalls?.find(
        (item: any) => item?._id === selectedRow[0],
      ) || {};

    if (selectedItem) {
      methodsEditCall?.setValue('title', selectedItem?.title);
      methodsEditCall?.setValue('startDate', parseISO(selectedItem?.startDate));
      methodsEditCall?.setValue('endDate', parseISO(selectedItem?.endDate));
      methodsEditCall?.setValue('contactOwnerId', selectedItem?.contactOwnerId);
      methodsEditCall?.setValue('assignee', selectedItem?.assignee);
      methodsEditCall?.setValue('outcome', selectedItem?.outcome);
      methodsEditCall?.setValue('note', selectedItem?.note);
    }
    setOpenDrawerEditCall(true);
  };
  const handleCloseDrawerEditCall = () => {
    setOpenDrawerEditCall(false);
  };

  // Edit call
  const { handleSubmit: handleMethodEditCall } = methodsEditCall;
  const [updateCall, { isLoading: loadingUpdateCall }] =
    useUpdateCallMutation();
  const onSubmitEditCall = async (values: any) => {
    try {
      await updateCall({ id: selectedRow[0], body: values })?.unwrap();
      handleCloseDrawerEditCall();
      setSelectedRow([]);
      enqueueSnackbar('Call has been updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitUpdateCall = handleMethodEditCall(onSubmitEditCall);

  // Delete Calls
  const [isCallsDeleteModal, setIsCallsDeleteModal] = useState(false);
  const [deleteCalls, { isLoading: loadingDelete }] = useDeleteCallMutation();
  const handleOpenModalDelete = () => {
    handleActionsMenuClose();
    setIsCallsDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsCallsDeleteModal(false);
  };

  const handleSubmitDeleteCalls = async () => {
    const items = await selectedRow?.join(',');
    try {
      await deleteCalls(items)?.unwrap();
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

  // Reschedule call
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);
  const handleOpenModalReschedule = () => {
    handleActionsMenuClose();
    setOpenRescheduleModal(true);
  };
  const handleCloseModalReschedule = () => {
    setOpenRescheduleModal(false);
  };
  const methodsReschedule = useForm({});
  const { handleSubmit: handleMethodReschedule } = methodsReschedule;
  const [reScheduleCall, { isLoading: loadingRescheduleCall }] =
    useUpdateCallMutation();
  const onSubmitReschedule = async (values: any) => {
    try {
      await reScheduleCall({ id: selectedRow[0], body: values })?.unwrap();
      handleCloseDrawerEditCall();
      setSelectedRow([]);
      enqueueSnackbar('Call has been updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitRescheduleCall = handleMethodReschedule(onSubmitReschedule);

  // Add Outcome
  const [openOutcomeModal, setOpenOutcomeModal] = useState(false);
  const handleOpenModalOutcome = () => {
    handleActionsMenuClose();
    setOpenOutcomeModal(true);
  };
  const handleCloseModalOutcome = () => {
    setOpenOutcomeModal(false);
  };
  const methodsOutcome = useForm({});
  const { handleSubmit: handleMethodOutcome } = methodsOutcome;
  const [outcomeCall, { isLoading: loadingOutcome }] = useUpdateCallMutation();
  const onSubmitOutcome = async (values: any) => {
    try {
      await outcomeCall({ id: selectedRow[0], body: values })?.unwrap();
      handleCloseModalOutcome();
      setSelectedRow([]);
      enqueueSnackbar('Call has been updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitOutcomeCall = handleMethodOutcome(onSubmitOutcome);

  return {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    loadingGetCalls,
    fetchingGetCalls,
    dataGetCalls,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,

    theme,
    loadingAddCall,
    openDrawerAddCall,
    methodsAddCall,
    handleOpenDrawerAddCall,
    handleCloseDrawerAddCall,
    handleAddCallSubmit,
    employeeList,
    contactsList,
    methodsEditCall,
    openDrawerEditCall,
    handleOpenDrawerEditCall,
    handleCloseDrawerEditCall,
    drawerTitle,
    isFieldDisabled,
    handleSubmitUpdateCall,
    loadingUpdateCall,
    isCallsDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleSubmitDeleteCalls,
    loadingDelete,
    methodsReschedule,
    loadingRescheduleCall,
    handleSubmitRescheduleCall,
    openRescheduleModal,
    handleOpenModalReschedule,
    handleCloseModalReschedule,
    methodsOutcome,
    handleSubmitOutcomeCall,
    openOutcomeModal,
    handleCloseModalOutcome,
    handleOpenModalOutcome,
    loadingOutcome,
  };
};

export default useCalls;
