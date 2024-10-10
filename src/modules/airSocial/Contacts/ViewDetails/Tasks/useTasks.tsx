import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import {
  useDeleteContactTasksMutation,
  useGetContactTasksQuery,
} from '@/services/commonFeatures/contacts/tasks';
import { enqueueSnackbar } from 'notistack';

const useTasks = (contactId: string) => {
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

  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
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

  const { data: dataGetContactTasks, isLoading: loadingGetTasks } =
    useGetContactTasksQuery({
      params: {
        recordType: 'contacts',
        recordId: contactId,
        ...filterParams,
        ...searchPayLoad,
        ...paginationParams,
      },
    });

  useEffect(() => {
    if (selectedRow.length === 1) {
      setSelectedRowData(
        dataGetContactTasks?.data?.taskmanagements?.find(
          (item: any) => item?._id === selectedRow[0],
        ),
      );
    } else {
      setSelectedRowData(null);
    }
  }, [selectedRow]);

  // View Task Drawer
  const [openDrawerEditTask, setOpenDrawerEditTask] = useState(false);
  const handleOpenDrawerEditTask = () => {
    handleCloseActionMenu();
    setOpenDrawerEditTask(true);
  };
  const handleCloseDrawerEditTask = () => {
    setOpenDrawerEditTask(false);
  };

  // Re-assign Modal
  const [openModalAssignee, setOpenModalAssignee] = useState(false);
  const handleOpenModalAssignee = () => {
    handleCloseActionMenu();
    setOpenModalAssignee(true);
  };
  const handleCloseModalAssignee = () => {
    setOpenModalAssignee(false);
  };

  // Delete Tasks
  const [openTaskDeleteModal, setOpenTaskDeleteModal] = useState(false);
  const [deleteTasks, { isLoading: loadingDelete }] =
    useDeleteContactTasksMutation();
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
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    } finally {
      handleCloseModalDelete();
    }
  };

  return {
    theme,
    contactsList,
    anchorEl,
    isActionMenuOpen,
    handleOpenActionMenu,
    handleCloseActionMenu,
    setPage,
    setPageLimit,
    selectedRow,
    setSelectedRow,
    selectedRowData,
    openDrawerEditTask,
    handleOpenDrawerEditTask,
    handleCloseDrawerEditTask,
    dataGetContactTasks,
    loadingGetTasks,
    setSearchValue,
    setFilterParams,
    openModalAssignee,
    handleOpenModalAssignee,
    handleCloseModalAssignee,
    openTaskDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleSubmitDeleteTasks,
    loadingDelete,
  };
};

export default useTasks;
