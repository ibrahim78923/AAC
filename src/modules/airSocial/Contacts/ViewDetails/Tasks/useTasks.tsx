import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useDeleteTasksMutation,
  useGetContactTasksQuery,
  useGetContactsQuery,
  useUpdateContactTaskMutation,
} from '@/services/commonFeatures/contacts';
import { useForm } from 'react-hook-form';
import { parseISO } from 'date-fns';
import { enqueueSnackbar } from 'notistack';

const useTasks = (contactId: any) => {
  const { data: dataContactsList } = useGetContactsQuery({});
  const contactsList = dataContactsList?.data?.contacts?.map((item: any) => ({
    value: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isActionMenuOpen = Boolean(anchorEl);
  const handleOpenActionMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setAnchorEl(null);
  };

  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  // const defaultParams = {
  //   page: PAGINATION?.CURRENT_PAGE,
  //   limit: PAGINATION?.PAGE_LIMIT,
  // };
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageLimit,
    contactId: contactId,
  });
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }

  const { data: dataGetContactTasks, isLoading: loadingGetTasks } =
    useGetContactTasksQuery({ params: { ...filterParams, ...searchPayLoad } });

  // View Task
  const methodsEditTask = useForm({});
  const [openDrawerEditTask, setOpenDrawerEditTask] = useState(false);

  const handleOpenDrawerEditTask = () => {
    handleCloseActionMenu();
    const selectedItem =
      dataGetContactTasks?.data?.tasks?.find(
        (item: any) => item?._id === rowId,
      ) || {};

    if (selectedItem) {
      methodsEditTask?.setValue('title', selectedItem?.title);
      methodsEditTask?.setValue('description', selectedItem?.description);
      methodsEditTask?.setValue('status', selectedItem?.status);
      methodsEditTask?.setValue('startDate', parseISO(selectedItem?.startDate));
      methodsEditTask?.setValue('endDate', parseISO(selectedItem?.endDate));
      methodsEditTask?.setValue('assignTo', selectedItem?.assignTo);
      methodsEditTask?.setValue('priority', selectedItem?.priority);
      methodsEditTask?.setValue('notifyBefore', selectedItem?.notifyBefore);
    }
    setOpenDrawerEditTask(true);
  };
  const handleCloseDrawerEditTask = () => {
    setOpenDrawerEditTask(false);
  };

  // Re-assign
  const methodsAssignee = useForm({});
  const { handleSubmit: handleMethodAssignee } = methodsAssignee;
  const [openModalAssignee, setOpenModalAssignee] = useState(false);

  const handleOpenModalAssignee = () => {
    handleCloseActionMenu();

    const selectedItem =
      dataGetContactTasks?.data?.tasks?.find(
        (item: any) => item?._id === rowId,
      ) || {};

    if (selectedItem) {
      methodsAssignee?.setValue('assignTo', selectedItem?.assignTo);
    }
    setOpenModalAssignee(true);
  };
  const handleCloseModalAssignee = () => {
    setOpenModalAssignee(false);
  };

  const [reAssignTask, { isLoading: loadingReAssignTask }] =
    useUpdateContactTaskMutation();
  const onSubmitReassign = async (values: any) => {
    try {
      await reAssignTask({ id: rowId, body: values })?.unwrap();
      handleCloseModalAssignee();
      setSelectedRow([]);
      enqueueSnackbar('New person has been assigned successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitReassign = handleMethodAssignee(onSubmitReassign);

  // Delete Tasks
  const [openTaskDeleteModal, setOpenTaskDeleteModal] = useState(false);
  const [deleteTasks, { isLoading: loadingDelete }] = useDeleteTasksMutation();
  const handleOpenModalDelete = () => {
    handleCloseActionMenu();
    setOpenTaskDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setOpenTaskDeleteModal(false);
  };

  const handleSubmitDeleteTasks = async () => {
    const items = await selectedRow?.join(',');
    try {
      await deleteTasks(items)?.unwrap();
      setSelectedRow([]);
      enqueueSnackbar('Record has been deleted successfully.', {
        variant: 'success',
      });
      setIsActionsDisabled(true);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    } finally {
      handleCloseModalDelete();
    }
  };

  return {
    contactsList,
    anchorEl,
    isActionMenuOpen,
    handleOpenActionMenu,
    handleCloseActionMenu,
    setPage,
    setPageLimit,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
    openDrawerEditTask,
    handleOpenDrawerEditTask,
    handleCloseDrawerEditTask,
    methodsEditTask,
    theme,
    dataGetContactTasks,
    loadingGetTasks,
    setSearchValue,
    setFilterParams,
    methodsAssignee,
    openModalAssignee,
    handleOpenModalAssignee,
    handleCloseModalAssignee,
    handleSubmitReassign,
    loadingReAssignTask,
    openTaskDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleSubmitDeleteTasks,
    loadingDelete,
  };
};

export default useTasks;
