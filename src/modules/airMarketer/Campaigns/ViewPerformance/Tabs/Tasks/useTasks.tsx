import { PAGINATION } from '@/config';
import { useGetCampaignsTasksQuery } from '@/services/airMarketer/campaigns';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const useTasks = (CurrCampaignId: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenEditTaskDrawer, setIsOpenEditTaskDrawer] = useState(false);
  const [isOpenDeleteDrawer, setIsOpenDeleteDrawer] = useState(false);
  // const [searchUser, setSearchUser] = useState('');
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [searchValue, setSearchValue] = useState('');
  const theme = useTheme();
  const [selectedRec, setSelectedRec] = useState<string[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any>([]);
  const [statusVariant, setStatusVariant] = useState<any>('');
  const actionMenuOpen = Boolean(anchorEl);

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

  const handleTaskDrawer = () => {
    setIsOpenEditTaskDrawer(true);
  };
  const handleDeleteModal = () => {
    setIsOpenDeleteDrawer(true);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
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
    handleDeleteModal,
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
  };
};
export default useTasks;
