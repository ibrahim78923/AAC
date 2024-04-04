import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { userList } from './User.data';
import {
  useGetProductUserListQuery,
  useLazyGetCompanyAccountsRolesQuery,
  useLazyGetTeamUserListQuery,
  usePatchProductUsersMutation,
  usePostProductUserListMutation,
} from '@/services/airOperations/user-management/user';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/tickets';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertUserDefaultValues,
  upsertUserValidationSchema,
} from './UpsertUser/UpsertUser.data';
import { useRouter } from 'next/router';

export const useUser = () => {
  const router = useRouter();
  const { _id } = router?.query;
  const [selectedUserList, setSelectedUserList] = useState<any[]>([]);
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [setUserData] = useState<any[]>();
  const [disabled, setDisabled] = useState(true);
  const [tabData, setTabData] = useState({});

  const param = {
    page: page,
    limit: pageLimit,
    search,
  };
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetProductUserListQuery({ param });

  const usersData = data?.data?.usercompanyaccounts;
  const metaData = data?.data?.meta;
  const userListColumn = userList(
    usersData,
    selectedUserList,
    setSelectedUserList,
    setIsDrawerOpen,
    setTabData,
  );

  const departmentDropdown = useLazyGetDepartmentDropdownQuery();
  const rolesDropdown = useLazyGetCompanyAccountsRolesQuery();
  const usersTeamDropdown = useLazyGetTeamUserListQuery();

  const methods: any = useForm({
    resolver: yupResolver(upsertUserValidationSchema),
    defaultValues: upsertUserDefaultValues(tabData),
  });
  const { handleSubmit, reset } = methods;
  useEffect(() => {
    reset(upsertUserDefaultValues(tabData));
  }, [isDrawerOpen]);
  const [patchProductUsersTrigger, patchProductUsersStatus] =
    usePatchProductUsersMutation();
  const [addListUsers, addUsersListStatus] = usePostProductUserListMutation();
  const submit = async (data: any) => {
    try {
      const body = {
        ...data,
        role: data?.role?._id,
        team: data?.team?._id,
        language: data?._id,
      };
      if (!!_id) {
        editProductUsersDetails?.(body);
        return;
      }
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

  const editProductUsersDetails = async (data: any) => {
    const formData = {
      id: _id,
      ...data,
    };
    try {
      await patchProductUsersTrigger(formData)?.unwrap();
      successSnackbar('Products Users Edit  Successfully');
      setIsDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    handleClose?.();
  };

  return {
    usersData,
    theme,
    selectedUserList,
    setSelectedUserList,
    userListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
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
    patchProductUsersStatus,
    addUsersListStatus,
  };
};
