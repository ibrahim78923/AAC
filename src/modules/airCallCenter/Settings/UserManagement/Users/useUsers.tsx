import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
// import dayjs from 'dayjs';

import { PAGINATION } from '@/config';
import {
  editUserDefaultValues,
  editUserValidationSchema,
} from './EditUser/EditUser.data';
import { successSnackbar } from '@/utils/api';
// import { DATE_FORMAT } from '@/constants/index';

const useUsers = (props: any) => {
  const { setOpenDrawerAddUser, setIsViewed } = props;
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [search, setSearch] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // OPEN/CLOSE ACTIONS MENU
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // GET USERS
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  // const defaultParams = {
  //   page: PAGINATION?.CURRENT_PAGE,
  //   limit: PAGINATION?.PAGE_LIMIT,
  // };
  const [searchValue, setSearchValue] = useState('');
  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageLimit,
  });
  // let searchPayLoad;
  // if (searchValue) {
  //   searchPayLoad = { search: searchValue };
  // }
  // const { data: jopPostingData, isLoading: loadingJobPosting } =
  //   useGetJobsQuery({ params: { ...filterParams, ...searchPayLoad } });
  // const methodsFilter: any = useForm();
  //const { handleSubmit: handleMethodFilter, reset: ressetFilterForm } = methodsFilter;

  // Hadle PAGE CHANGE
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setFilterParams((prev: any) => {
      return {
        ...prev,
        page: newPage,
      };
    });
  };

  // Edit User
  const [openDrawerEditUser, setOpenDrawerEditUser] = useState(false);
  const methodsEditUser = useForm({
    resolver: yupResolver(editUserValidationSchema),
    defaultValues: editUserDefaultValues,
  });

  const { handleSubmit: handleMethodEditUser, reset: resetEditUserForm } =
    methodsEditUser;

  const handleOpenDrawerEditUser = () => {
    handleClose();
    setOpenDrawerEditUser(true);
  };
  const handleCloseDrawerEditUser = () => {
    setOpenDrawerEditUser(false);
    resetEditUserForm();
  };

  const onSubmitEditUser = async () => {
    successSnackbar('User updated successfully');
    handleCloseDrawerEditUser();
  };
  const handleEditUserSubmit = handleMethodEditUser(onSubmitEditUser);
  const handleViewUserDrawer = () => {
    handleClose();
    setIsViewed?.(true);
    setOpenDrawerAddUser(true);
  };
  const handleDeleteUser = () => {
    setOpenDeleteModal?.(true);
  };
  const handleDelete = () => {
    successSnackbar('Record deleted successfully');
    setOpenDeleteModal(false);
  };

  return {
    anchorEl,
    actionMenuOpen,
    handleActionsClick,
    handleClose,
    filterParams,
    searchValue,
    setSearchValue,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
    openDrawerEditUser,
    methodsEditUser,
    handleOpenDrawerEditUser,
    handleCloseDrawerEditUser,
    handleEditUserSubmit,
    handleViewUserDrawer,
    search,
    setSearch,
    handleDeleteUser,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
  };
};
export default useUsers;
