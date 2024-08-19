import { PAGINATION } from '@/config';
import {
  NOTISTACK_VARIANTS,
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
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { downloadFile } from '@/utils/file';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AllocateSubmitI, SoftwareUserDataI } from './Users.interface';

const useUsers = () => {
  const [usersData, setUsersData] = useState<SoftwareUserDataI[]>([]);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedActionTitle, setSelectedActionTitle] = useState('');
  const [search, setSearch] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const getUserArray = usersData?.find((item) => item);
  const methods = useForm({
    resolver: yupResolver<any>(
      Yup?.object()?.shape({
        contract: Yup?.mixed()?.required('Required'),
      }),
    ),
    defaultValues: { contract: null },
  });
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
        enqueueSnackbar(`Can't ${title} multiple records`, {
          variant: NOTISTACK_VARIANTS?.WARNING,
        });
      }
    }
  };

  const userActionDropdownCloseHandler = () => {
    setActionModalOpen(false);
  };

  const getUserListDataExport = async (type: string) => {
    const getUserParam = new URLSearchParams();
    getUserParam?.append('page', page + '');
    getUserParam?.append('limit', limit + '');
    getUserParam?.append('id', softwareId + '');
    getUserParam?.append('exportType', type);
    try {
      const response: any = await getExportUserTrigger(getUserParam)?.unwrap();
      downloadFile(response, 'User Data List', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(response?.data?.message ?? `Users Exported Successfully`);
      setUsersData([]);
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? `Users Not Exported`);
      setUsersData([]);
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
            const res = await userDeallocate(deallocateParams)?.unwrap();
            enqueueSnackbar(
              res?.message ?? 'Contract Deallocate successfully',
              {
                variant: NOTISTACK_VARIANTS?.SUCCESS,
              },
            );
            userActionDropdownCloseHandler();
            setUsersData([]);
          } catch (error: any) {
            enqueueSnackbar(
              error?.error?.message ?? 'Contract Not Deallocated',
              {
                variant: NOTISTACK_VARIANTS?.ERROR,
              },
            );
          }
          break;
        case SOFTWARE_USER_ACTIONS_TYPES?.REMOVE:
          try {
            const deleteRes: any = await userRemove({
              params: deleteParams,
            });
            enqueueSnackbar(
              deleteRes?.data?.message && 'Users Removed Successfully',
              {
                variant: NOTISTACK_VARIANTS?.SUCCESS,
              },
            );

            setUsersData([]);
            userActionDropdownCloseHandler();
          } catch (error: any) {
            enqueueSnackbar(error?.data?.message ?? 'Something Went Wrong', {
              variant: NOTISTACK_VARIANTS?.ERROR,
            });
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
      const res = await userAllocate(allocateParams)?.unwrap();
      enqueueSnackbar(res?.message ?? 'Contract Allocated successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      userActionDropdownCloseHandler();
      setUsersData([]);
    } catch (error: any) {
      enqueueSnackbar(error?.error?.message ?? 'Contract Not Allocated', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
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
    setSearch,
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
  };
};

export default useUsers;
