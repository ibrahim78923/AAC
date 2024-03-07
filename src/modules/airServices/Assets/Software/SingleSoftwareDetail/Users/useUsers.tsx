import { PAGINATION } from '@/config';
import {
  NOTISTACK_VARIANTS,
  SOFTWARE_USER_ACTIONS_TYPES,
  EXPORT_TYPE,
  EXPORT_FILE_TYPE,
} from '@/constants/strings';
import {
  useDeallocateContractMutation,
  useGetSoftwareUsersDetailsQuery,
  useRemoveContractMutation,
} from '@/services/airServices/assets/software/single-software-detail/users';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { downloadFile } from '@/utils/file';
import { useSearchParams } from 'next/navigation';
import { userData } from '@/modules/airServices/Dashboard/CreateDashboard/CreateDashboard.data';

const useUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedActionTitle, setSelectedActionTitle] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [selectedExportType, setSelectedExportType] = useState(
    EXPORT_TYPE?.XLS,
  );

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
  const metaData = getSoftwareUsers?.data;
  const { data: getSoftwareExportUsers } = useGetSoftwareUsersDetailsQuery({
    id: softwareId,
    page,
    limit,
    exportType: selectedExportType,
  });

  const [userDeallocate] = useDeallocateContractMutation();
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

  const excelExportHandler = async () => {
    try {
      const excelData = getSoftwareUsers?.data?.[0]?.collections[0]?.details;
      const userArray = Array.isArray(excelData) ? excelData : [excelData];

      const formattedExcelData = userArray.map((user) => ({
        Name: `${user?.details?.firstName || 'Unknown'} ${
          user?.details?.lastName || 'Unknown'
        }`,
        Department: user?.data?.department || '--',
        Source: user?.data?.source || '--',
        Usage: user?.data?.usage || '--',
        'First Seen': user?.createdAt || '--',
        'Last Seen': user?.updatedAt || '--',
        'Assigned Date': user?.createdAt || '--',
        Contract: user?.data?.contract || '--',
      }));

      const convertedExcelData = formattedExcelData.map((user) => ({
        ...user,
        Contract: String(user.Contract),
      }));

      downloadFile(
        convertedExcelData || [],
        'excel-export.xlsx',
        EXPORT_FILE_TYPE?.XLS,
      );
      enqueueSnackbar(
        getSoftwareExportUsers?.data?.message ??
          ' XLS File Download successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error) {
      enqueueSnackbar(
        getSoftwareExportUsers?.data?.message ?? ' Error exporting XLS file ',
        {
          variant: NOTISTACK_VARIANTS?.ERROR,
        },
      );
    }
  };

  const csvExportHandler = async () => {
    try {
      const csvData = getSoftwareUsers?.data?.[0]?.collections[0]?.details;
      const userArray = Array.isArray(csvData) ? csvData : [csvData];

      const formattedCsvData = userArray.map((user) => ({
        Name: `${user?.details?.firstName || 'Unknown'} ${
          user?.details?.lastName || 'Unknown'
        }`,
        Department: user?.data?.department || '--',
        Source: user?.data?.source || '--',
        Usage: user?.data?.usage || '--',
        'First Seen': user?.createdAt || '--',
        'Last Seen': user?.updatedAt || '--',
        'Assigned Date': user?.createdAt || '--',
        Contract: user?.data?.contract || '--',
      }));
      const convertedCsvData = formattedCsvData.map((user) => ({
        ...user,

        Contract: String(user.Contract),
      }));

      downloadFile(
        convertedCsvData || [],
        'csv-export.csv',
        EXPORT_FILE_TYPE?.CSV,
      );
      enqueueSnackbar(
        getSoftwareExportUsers?.data?.message ??
          'CSV File Download Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error) {
      enqueueSnackbar(
        getSoftwareExportUsers?.data?.message ?? 'Error exporting CSV file',
        {
          variant: NOTISTACK_VARIANTS?.ERROR,
        },
      );
    }
  };
  // const dealocateParams = new URLSearchParams();
  // dealocateParams?.append('id', userData?._id + '');
  // dealocateParams?.append('contractId', userData?.contracts?._id + '');
  const deleteParams = new URLSearchParams();
  usersData?.forEach((user: any) => deleteParams?.append('ids', user?._id));
  const actionClickHandler = async (selectedActionTitle: any) => {
    try {
      switch (selectedActionTitle) {
        case SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE:
          enqueueSnackbar('Contract Allocated Successfully', {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          userActionDropdownCloseHandler();
          setUsersData([]);
          break;
        case SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE:
          await userDeallocate(userData?._id);
          enqueueSnackbar('Contract Deallocated Successfully', {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          userActionDropdownCloseHandler();
          setUsersData([]);
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
    } catch (error) {
      // Handle errors and show appropriate messages
      // console.error('Error:', error);
    }
  };
  // console.log(userData);
  const handleExportTypeClick = (type: any) => {
    setSelectedExportType(type);
  };

  return {
    userActionClickHandler,
    userActionDropdownCloseHandler,
    excelExportHandler,
    csvExportHandler,
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
    handleExportTypeClick,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    metaData,
  };
};

export default useUsers;
