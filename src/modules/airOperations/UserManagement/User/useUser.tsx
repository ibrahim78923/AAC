import { useTheme } from '@mui/material';
import { useState } from 'react';
import { userDropdown, userList } from './User.data';
import {
  useGetProductUserListQuery,
  useLazyGetCompanyAccountsRolesQuery,
  useLazyGetTeamUserListQuery,
  usePostProductUserListMutation,
} from '@/services/airOperations/user-management/user';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/tickets';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertUserData,
  upsertUserDefaultValues,
  upsertUserValidationSchema,
} from './UpsertUser/UpsertUser.data';

export const useUser = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [userData, setUserData] = useState<any[]>(upsertUserData);
  const [disabled, setDisabled] = useState(true);

  const param = {
    page: page,
    limit: pageLimit,
    search,
  };
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetProductUserListQuery({ param });

  const usersData = data?.data?.usercompanyaccounts;
  const metaData = data?.data?.meta;
  const userDropdownOptions = userDropdown(setDeleteModal);
  const userListColumn = userList(
    userData,
    selectedUserList,
    setSelectedUserList,
    setIsDrawerOpen,
  );

  const departmentDropdown = useLazyGetDepartmentDropdownQuery();
  const rolesDropdown = useLazyGetCompanyAccountsRolesQuery();
  const usersTeamDropdown = useLazyGetTeamUserListQuery();

  const methods: any = useForm({
    resolver: yupResolver(upsertUserValidationSchema),
    defaultValues: upsertUserDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const [addListUsers] = usePostProductUserListMutation();
  const submit = async (data: any) => {
    try {
      const body = {
        ...data,
        role: data?.role?._id,
        team: data?.team?._id,
        language: data?._id,
      };

      await addListUsers({ body }).unwrap();
      successSnackbar('Users List added successfully.');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
  };

  return {
    usersData,
    theme,
    selectedUserList,
    setSelectedUserList,
    userListColumn,
    searchValue,
    setSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    userDropdownOptions,
    deleteModal,
    setDeleteModal,
    setSearch,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPage,
    setPageLimit,
    methods,
    handleSubmit,
    submit,
    setUserData,
    disabled,
    setDisabled,
    departmentDropdown,
    handleClose,
    metaData,
    rolesDropdown,
    usersTeamDropdown,
  };
};
