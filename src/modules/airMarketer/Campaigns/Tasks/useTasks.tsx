import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useDeleteCampaignTasksMutation,
  useGetCampaignsTasksQuery,
  useUpdateCampaignTasksMutation,
} from '@/services/airMarketer/campaigns';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useTasks = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenEditTaskDrawer, setIsOpenEditTaskDrawer] = useState({
    isToggle: false,
    type: '',
  });
  const [isOpenDeleteDrawer, setIsOpenDeleteDrawer] = useState(false);
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false);
  const [selectedRec, setSelectedRec] = useState<string[]>([]);
  const [statusVariant, setStatusVariant] = useState<any>('');
  const [isListView, setIsListView] = useState('listView');
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [searchValue, setSearchValue] = useState('');
  const actionMenuOpen = Boolean(anchorEl);

  const statusConstants = {
    INPROGRESS: 'inprogress',
    PENDING: 'pending',
    COMPLETED: 'completed',
  };

  const taskParams = {
    page: page,
    limit: pageLimit,
    search: searchValue ?? undefined,
  };

  const {
    data: getCampaignsTasks,
    isLoading,
    isSuccess,
  } = useGetCampaignsTasksQuery(taskParams);

  const compaignsTasksData = getCampaignsTasks?.data?.campaigntasks;

  const [deleteTasks, { isLoading: deleteTaskLoading }] =
    useDeleteCampaignTasksMutation();

  const [updateCampaignTasks, { isLoading: updateTaskLoading }] =
    useUpdateCampaignTasksMutation();

  const handleDeleteModal = async (id: any) => {
    try {
      await deleteTasks({ ids: id });
      enqueueSnackbar('Task Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setIsOpenDeleteDrawer(false);
  };

  const handleChangeStatus = () => {
    setIsOpenChangeStatus(true);
  };

  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleListViewClick = (val: string) => {
    setIsListView(val);
  };

  const handleUpdateStatus = async (selectedId: any, status: any) => {
    try {
      await updateCampaignTasks({
        id: selectedId,
        body: { status: status },
      })?.unwrap();
      setIsOpenChangeStatus(false);
      setAnchorEl(null);
      setSelectedRec([]);
      enqueueSnackbar('Task status updated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    setIsOpenEditTaskDrawer,
    handleActionsMenuClose,
    handleActionsMenuClick,
    setIsOpenDeleteDrawer,
    setIsOpenChangeStatus,
    isOpenEditTaskDrawer,
    handleListViewClick,
    isOpenDeleteDrawer,
    handleChangeStatus,
    isOpenChangeStatus,
    compaignsTasksData,
    handleUpdateStatus,
    getCampaignsTasks,
    handleDeleteModal,
    deleteTaskLoading,
    updateTaskLoading,
    statusConstants,
    actionMenuOpen,
    setSearchValue,
    setSelectedRec,
    statusVariant,
    setStatusVariant,
    setPageLimit,
    setAnchorEl,
    deleteTasks,
    searchValue,
    selectedRec,
    isListView,
    isLoading,
    isSuccess,
    anchorEl,
    setPage,
    theme,
  };
};
export default useTasks;
