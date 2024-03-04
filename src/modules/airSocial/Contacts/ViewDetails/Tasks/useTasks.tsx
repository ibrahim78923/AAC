import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useGetContactTasksQuery } from '@/services/commonFeatures/contacts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactTaskValidationSchema } from './TaskEditorDrawer/TaskEditor.data';
import { parseISO } from 'date-fns';

const useTasks = (contactId: any) => {
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

  // Update FAQ
  // const [updateFaq, { isLoading: loadingUpdateFaq }] = useUpdateFaqsMutation();
  const methodsEditTask = useForm({
    resolver: yupResolver(contactTaskValidationSchema),
  });
  const { handleSubmit: handleMethodEditTask } = methodsEditTask;
  const [openDrawerEditTask, setOpenDrawerEditTask] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('Edit');

  const handleOpenDrawerEditTask = (title: string = 'Edit') => {
    setDrawerTitle(title);
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

  const onSubmitEditJob = async () => {
    // try {
    //   await updateFaq({ id: rowId, body: values })?.unwrap();
    //   handleCloseDrawerEditFaq();
    //   setSelectedRow([]);
    //   enqueueSnackbar('FAQ updated successfully', {
    //     variant: 'success',
    //   });
    // } catch (error: any) {
    //   enqueueSnackbar('An error occured', {
    //     variant: 'error',
    //   });
    // }
  };
  const handleSubmitUpdateContactTask = handleMethodEditTask(onSubmitEditJob);

  return {
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
    drawerTitle,
    openDrawerEditTask,
    handleOpenDrawerEditTask,
    handleCloseDrawerEditTask,
    methodsEditTask,
    handleSubmitUpdateContactTask,
    theme,
    dataGetContactTasks,
    loadingGetTasks,
    setSearchValue,
    setFilterParams,
  };
};

export default useTasks;
