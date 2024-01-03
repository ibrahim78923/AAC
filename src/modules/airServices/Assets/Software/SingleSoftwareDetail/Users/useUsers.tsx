import { PAGINATION } from '@/config';
import {
  NOTISTACK_VARIANTS,
  SOFTWARE_USER_ACTIONS_TYPES,
  EXPORT_TYPE,
  EXPORT_FILE_TYPE,
} from '@/constants/strings';
import { useGetSoftwareUsersDetailsQuery } from '@/services/airServices/assets/software/single-software-detail/users';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { downloadFile } from '@/utils/file';
import { useSearchParams } from 'next/navigation';

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
  const { data: getSoftwareUsers } = useGetSoftwareUsersDetailsQuery({
    id: softwareId,
    page,
    limit,
  });

  const { data: getSoftwareExportUsers } = useGetSoftwareUsersDetailsQuery({
    id: softwareId,
    page,
    limit,
    exportType: selectedExportType,
  });

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
      const excelData = getSoftwareExportUsers?.data;

      downloadFile(excelData || [], 'excel-export.xlsx', EXPORT_FILE_TYPE?.XLS);
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
      const csvData = getSoftwareExportUsers?.data;

      downloadFile(csvData || [], 'csv-export.csv', EXPORT_FILE_TYPE?.CSV);
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

  const actionClickHandler = (selectedActionTitle: any) => {
    switch (selectedActionTitle) {
      case SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE:
        enqueueSnackbar('Contract Allocated Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        userActionDropdownCloseHandler();
        setUsersData([]);
        break;
      case SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE:
        enqueueSnackbar('Contract Deallocated Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        userActionDropdownCloseHandler();
        setUsersData([]);
        break;
      case SOFTWARE_USER_ACTIONS_TYPES?.REMOVE:
        enqueueSnackbar('User Removed Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        setUsersData([]);
        userActionDropdownCloseHandler();
        break;
      default:
        '';
        break;
    }
  };
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
  };
};

export default useUsers;
