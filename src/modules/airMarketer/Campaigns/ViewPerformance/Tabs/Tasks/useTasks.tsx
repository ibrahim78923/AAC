import { useState } from 'react';
import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useDeleteCampaignTasksMutation,
  useGetCampaignsTasksQuery,
} from '@/services/airMarketer/campaigns';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

const useTasks = (CurrCampaignId: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenEditTaskDrawer, setIsOpenEditTaskDrawer] = useState({
    isToggle: false,
    id: '',
  });
  const [isOpenDeleteDrawer, setIsOpenDeleteDrawer] = useState({
    isToggle: false,
    id: '',
  });
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRec, setSelectedRec] = useState<string[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any>([]);
  const [statusVariant, setStatusVariant] = useState<any>('');
  const actionMenuOpen = Boolean(anchorEl);
  const disableActions = selectedRec.length === 0;

  const taskParams = {
    page: page,
    limit: pageLimit,
    search: searchValue ?? undefined,
    campaignId: CurrCampaignId,
  };

  const {
    data: getCampaignsTasks,
    isLoading,
    isFetching,
  } = useGetCampaignsTasksQuery(taskParams);

  const compaignsTasksData = getCampaignsTasks?.data?.campaigntasks;

  const [deleteTasks, { isLoading: deleteTaskLoading }] =
    useDeleteCampaignTasksMutation();

  const handleTaskDrawer = () => {
    setIsOpenEditTaskDrawer({ isToggle: true, id: selectedRowData?._id });
  };

  const handleClickDeleteModal = () => {
    setIsOpenDeleteDrawer({ isToggle: true, id: selectedRowData?._id });
  };

  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteModal = async (id: any) => {
    try {
      await deleteTasks({ ids: id })?.unwrap();
      enqueueSnackbar('Task Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setIsOpenDeleteDrawer({ ...isOpenDeleteDrawer, isToggle: false });
  };

  return {
    anchorEl,
    setAnchorEl,
    theme,
    actionMenuOpen,
    handleActionsMenuClose,
    handleActionsMenuClick,
    isOpenEditTaskDrawer,
    setIsOpenEditTaskDrawer,
    handleTaskDrawer,
    isOpenDeleteDrawer,
    handleClickDeleteModal,
    setIsOpenDeleteDrawer,
    searchValue,
    setSearchValue,
    getCampaignsTasks,
    setPage,
    setPageLimit,
    isLoading,
    isFetching,
    compaignsTasksData,
    selectedRowData,
    setSelectedRowData,
    selectedRec,
    setSelectedRec,
    setStatusVariant,
    statusVariant,
    disableActions,
    handleDeleteModal,
    deleteTaskLoading,
  };
};
export default useTasks;
