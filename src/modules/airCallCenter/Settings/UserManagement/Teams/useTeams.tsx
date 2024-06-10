import { useState } from 'react';

// import dayjs from 'dayjs';

import { PAGINATION } from '@/config';
import { columns } from './Teams.data';
import { Skeleton, useTheme } from '@mui/material';
import { successSnackbar } from '@/utils/api';

// import { DATE_FORMAT } from '@/constants/index';

const useTeams = (props: any) => {
  const {
    openDrawerAddTeams,
    handleCloseDrawerAddTeams,
    methodsAddTeams,
    handleAddTeamsSubmits,
    setOpenDrawerAddTeams,
    addTeamDrawer,
    setAddTeamDrawer,
  } = props;
  const skeletonLines = [];
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [isTeamDrawerOpen, setIsTeamDrawerOpen] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [teamByIdLoading, setTeamByIdLoading] = useState(false);
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const handleDelete = () => {
    successSnackbar('Record deleted successfully');
    setIsDeleteModal(false);
  };
  const handleOpenDrawerEditTeams = () => {
    setAddTeamDrawer(false);
    setOpenDrawerAddTeams(true);
  };
  const getColumns = columns(
    theme,
    setIsDeleteModal,
    handleOpenDrawerEditTeams,
    setIsTeamDrawerOpen,
  );
  for (let i = 0; i < 5; i++) {
    skeletonLines.push(
      <Skeleton key={i} animation="wave" height={60} sx={{ mb: 1 }} />,
    );
  }
  return {
    getColumns,
    search,
    setSearch,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
    page,
    pageLimit,
    isDeleteModal,
    setIsDeleteModal,
    handleDelete,
    openDrawerAddTeams,
    handleCloseDrawerAddTeams,
    methodsAddTeams,
    handleAddTeamsSubmits,
    addTeamDrawer,
    setAddTeamDrawer,
    handleOpenDrawerEditTeams,
    isTeamDrawerOpen,
    setIsTeamDrawerOpen,
    teamByIdLoading,
    setTeamByIdLoading,
    skeletonLines,
  };
};
export default useTeams;
