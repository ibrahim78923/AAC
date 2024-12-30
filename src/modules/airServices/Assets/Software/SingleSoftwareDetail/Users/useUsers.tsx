import { PAGINATION } from '@/config';
import {
  SOFTWARE_USER_ACTIONS_TYPES,
  EXPORT_FILE_TYPE,
  MODULE_TYPE,
} from '@/constants/strings';
import {
  useDeallocateContractMutation,
  useLazyGetSoftwareUsersDetailsQuery,
  useRemoveContractMutation,
  useAllocateContractMutation,
  useLazyGetExportSoftwareUsersQuery,
} from '@/services/airServices/assets/software/single-software-detail/users';
import { useEffect, useState } from 'react';
import { downloadFile } from '@/utils/file';
import { useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import { AllocateSubmitI, SoftwareUserDataI } from './Users.interface';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

const useUsers = () => {
  const [usersData, setUsersData] = useState<SoftwareUserDataI[]>([]);
  const [actionModalOpen, setActionModalOpen] = useState<boolean>(false);
  const [selectedActionTitle, setSelectedActionTitle] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const getUserArray = usersData?.find((item) => item);

  const useFormValues = {
    validationSchema: Yup?.object()?.shape({
      contract: Yup?.mixed()?.required('Required'),
    }),
    defaultValues: { contract: null },
  };

  const { methods, handleSubmit } = useFormLib(useFormValues);

  const params = useSearchParams();
  const softwareId = params?.get('softwareId');
  const [
    getUserListTrigger,
    { data: getSoftwareUsers, isLoading, isFetching, isSuccess, isError },
  ] = useLazyGetSoftwareUsersDetailsQuery();

  const handleGetUser = async () => {
    const getUserListParam = new URLSearchParams();
    getUserListParam?.append('page', page?.toString());
    getUserListParam?.append('limit', limit?.toString());
    getUserListParam?.append('id', softwareId + '');
    getUserListParam?.append('search', search?.toString());
    Object?.entries(filterValues)?.forEach(([key, value]: any) => {
      getUserListParam?.append(
        key,
        key === MODULE_TYPE?.DEPARTMENT?.toLowerCase() && value
          ? value?.name
          : value
            ? value?.toString()
            : '',
      );
    });
    await getUserListTrigger(getUserListParam);
  };
  useEffect(() => {
    handleGetUser();
  }, [softwareId, page, limit, search, filterValues, getUserListTrigger]);
  const metaData = getSoftwareUsers?.data?.meta;

  const [getExportUserTrigger] = useLazyGetExportSoftwareUsersQuery();

  const [userDeallocate, { isLoading: deAllocateLoading }] =
    useDeallocateContractMutation();
  const [userAllocate, { isLoading: allocateLoading }] =
    useAllocateContractMutation();
  const [userRemove, { isLoading: removeLoading }] =
    useRemoveContractMutation();

  const userActionClickHandler = (title: string) => {
    setSelectedActionTitle(title);
    if (
      (title === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE ||
        title === SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE) &&
      usersData?.length <= 1
    ) {
      setActionModalOpen(true);
    } else {
      if (
        title === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE ||
        title === SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE
      ) {
        errorSnackbar(`Can't ${title} multiple records`);
      }
    }
  };

  const userActionDropdownCloseHandler = () => {
    setActionModalOpen(false);
  };

  const getUserListDataExport = async (type: string) => {
    const queryParams = {
      exportType: type,
      id: softwareId,
    };
    const getContractExportParameter = {
      queryParams,
    };

    try {
      const response: any = await getExportUserTrigger(
        getContractExportParameter,
      )?.unwrap();
      downloadFile(response, 'User Data List', EXPORT_FILE_TYPE?.[type]);
      successSnackbar('File Exported successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const deallocateParams = {
    id: getUserArray?._id,
    contractId: getUserArray?.contractId,
  };
  const deleteParams = new URLSearchParams();
  usersData?.forEach((user) => deleteParams?.append('ids', user?._id));
  const actionClickHandler = async (selectedActionTitle: string) => {
    try {
      switch (selectedActionTitle) {
        case SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE:
          try {
            await userDeallocate(deallocateParams)?.unwrap();
            successSnackbar('Contract Deallocate successfully');
            userActionDropdownCloseHandler();
            setUsersData([]);
          } catch (error: any) {
            errorSnackbar(error?.error?.message);
          }
          break;
        case SOFTWARE_USER_ACTIONS_TYPES?.REMOVE:
          try {
            await userRemove({
              params: deleteParams,
            });
            successSnackbar('Users Removed Successfully');

            setUsersData([]);
            userActionDropdownCloseHandler();
          } catch (error: any) {
            errorSnackbar(error?.data?.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {}
  };
  const allocateSubmit = async (formData: AllocateSubmitI) => {
    const allocateParams = {
      id: getUserArray?._id,
      contractId: formData?.contract?._id,
    };
    try {
      await userAllocate(allocateParams)?.unwrap();
      successSnackbar('Contract Allocated successfully');
      userActionDropdownCloseHandler();
      setUsersData([]);
    } catch (error: any) {
      errorSnackbar(error?.error?.message);
    }
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };
  return {
    userActionClickHandler,
    userActionDropdownCloseHandler,
    getUserListDataExport,
    actionClickHandler,
    setActionModalOpen,
    actionModalOpen,
    usersData,
    selectedActionTitle,
    setUsersData,
    search,
    handleSearch,
    getSoftwareUsers,
    setPage,
    setLimit,
    page,
    limit,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    metaData,
    methods,
    allocateSubmit,
    deAllocateLoading,
    allocateLoading,
    removeLoading,
    setFilterValues,
    filterValues,
    handleGetUser,
    handleSubmit,
  };
};

export default useUsers;
