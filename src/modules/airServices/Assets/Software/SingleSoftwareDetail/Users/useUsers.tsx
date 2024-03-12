import { PAGINATION } from '@/config';
import {
  NOTISTACK_VARIANTS,
  SOFTWARE_USER_ACTIONS_TYPES,
  EXPORT_FILE_TYPE,
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

const useUsers = () => {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedActionTitle, setSelectedActionTitle] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const getUserArray = usersData?.find((item: any) => item);
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
  const getUserListParam = new URLSearchParams();
  getUserListParam?.append('page', page?.toString());
  getUserListParam?.append('limit', limit?.toString());
  getUserListParam?.append('id', softwareId + '');
  getUserListParam?.append('search', search?.toString());
  useEffect(() => {
    const handleGetUser = async () => {
      await getUserListTrigger(getUserListParam);
    };
    handleGetUser();
  }, [softwareId, page, limit, search]);
  const metaData = getSoftwareUsers?.data?.meta;

  const [getExportUserTrigger] = useLazyGetExportSoftwareUsersQuery();

  const [userDeallocate, { isLoading: deAllocateLoading }] =
    useDeallocateContractMutation();
  const [userAllocate, { isLoading: allocateLoading }] =
    useAllocateContractMutation();
  const [userRemove, { isLoading: removeLoading }] =
    useRemoveContractMutation();

  const userActionClickHandler = (title: any) => {
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

  const getUserListDataExport = async (type: any) => {
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
  usersData?.forEach((user: any) => deleteParams?.append('ids', user?._id));
  const actionClickHandler = async (selectedActionTitle: any) => {
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
  const allocateSubmit = async (formData: any) => {
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
  };
};

export default useUsers;
