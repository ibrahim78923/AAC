import { PAGINATION } from '@/config';
import {
  NOTISTACK_VARIANTS,
  SOFTWARE_USER_ACTIONS_TYPES,
  EXPORT_FILE_TYPE,
} from '@/constants/strings';
import {
  useDeallocateContractMutation,
  useGetSoftwareUsersDetailsQuery,
  useRemoveContractMutation,
  useAllocateContractMutation,
  useLazyGetExportSoftwareUsersQuery,
} from '@/services/airServices/assets/software/single-software-detail/users';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { downloadFile } from '@/utils/file';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';

const useUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedActionTitle, setSelectedActionTitle] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = useSearchParams();
  const softwareId = params?.get('softwareId');
  const {
    data: getSoftwareUsers,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetSoftwareUsersDetailsQuery({
    id: softwareId,
    page: page,
    limit: limit,
  });
  const metaData = getSoftwareUsers?.data?.meta;

  const [getExportUserTrigger] = useLazyGetExportSoftwareUsersQuery();

  const [userDeallocate] = useDeallocateContractMutation();
  const [userAllocate] = useAllocateContractMutation();
  const [userRemove] = useRemoveContractMutation();

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
    // getUserParam?.append('search', searchBy + '');
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
  const allocateParams = {
    id: softwareId,
    softwareId: getSoftwareUsers?.data?.softwareusers?.userId,
    contractId: getSoftwareUsers?.data?.softwareusers?.Contract,
  };
  const deallocateParams = {
    id: softwareId,
    softwareId: getSoftwareUsers?.data?.softwareusers?.userId,
    contractId: getSoftwareUsers?.data?.softwareusers?.Contract,
  };
  const deleteParams = new URLSearchParams();
  usersData?.forEach((user: any) => deleteParams?.append('ids', user?._id));
  const actionClickHandler = async (selectedActionTitle: any) => {
    try {
      switch (selectedActionTitle) {
        case SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE:
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

          break;
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
  };
};

export default useUsers;
