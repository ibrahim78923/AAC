import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { userList } from './User.data';
import {
  useGetProductUserListQuery,
  useLazyGetProductUserDropdownQuery,
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
import { REQUESTORS_STATUS } from '@/constants/strings';
import { fullName } from '@/utils/avatarUtils';

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
  const [switchLoading, setSwitchLoading] = useState<any>({});

  const [changeStatusTrigger] = usePatchProductUsersMutation();

  const param = {
    page: page,
    limit: pageLimit,
    search,
  };

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetProductUserListQuery({ param });

  const usersData = data?.data?.usercompanyaccounts;
  const metaData = data?.data?.meta;

  const handleChangeStatus = async (rowData: any) => {
    const status =
      rowData?.status === REQUESTORS_STATUS?.ACTIVE
        ? REQUESTORS_STATUS?.INACTIVE
        : REQUESTORS_STATUS?.ACTIVE;
    setSwitchLoading((prevState: any) => ({
      ...prevState,
      [rowData?._id]: true,
    }));
    const response: any = await changeStatusTrigger({
      id: rowData?._id,
      body: {
        status,
      },
    });
    try {
      response;
      successSnackbar(
        response?.data?.message &&
          `${fullName(
            rowData?.user?.firstName,
            rowData?.user?.lastName,
          )} ${status?.toLocaleLowerCase()} successfully`,
      );
    } catch (error) {
      errorSnackbar(response?.error?.data?.message);
    } finally {
      setSwitchLoading({ ...switchLoading, [rowData?._id]: false });
    }
  };

  const userListColumn = userList(
    usersData,
    selectedUserList,
    setSelectedUserList,
    setIsDrawerOpen,
    setTabData,
    switchLoading,
    handleChangeStatus,
    router,
  );

  const rolesDropdown = useLazyGetDepartmentDropdownQuery();
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
      handleClose();
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

  const userId = router?.query?.userId;
  const [userByIdTrigger, { data: userIdData }] =
    useLazyGetProductUserDropdownQuery();
  const handleUserById = async () => {
    await userByIdTrigger(userId);
  };
  useEffect(() => {
    handleUserById();
  }, [userId, isDrawerOpen]);

  const onClose = () => {
    setIsDrawerOpen(false);
    router?.push({
      pathname: router?.pathname,
    });
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
    usersTeamDropdown,
    handleClose,
    metaData,
    rolesDropdown,
    patchProductUsersStatus,
    addUsersListStatus,
    switchLoading,
    handleChangeStatus,
    editProductUsersDetails,
    onClose,
    data,
    router,
    userIdData,
  };
};
