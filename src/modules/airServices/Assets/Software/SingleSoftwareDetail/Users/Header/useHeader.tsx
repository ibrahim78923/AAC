import { useLazyGetExportSoftwareUsersQuery } from '@/services/airServices/assets/software/single-software-detail/users';
import { useRouter } from 'next/router';
import { EXPORT_FILE_TYPE, EXPORT_TYPE } from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { userActionDropdownDynamic } from './Header.data';
import { SOFTWARE_USER_PORTAL_ACTIONS_TYPES } from '../Users.data';
import { PAGINATION } from '@/config';

export const useHeader = (props: any) => {
  const { setIsPortalOpen, setPage, setSearch, usersData } = props;
  const router = useRouter();
  const softwareId = router?.query?.softwareId;

  const setPortalActions = (action: any) => {
    setIsPortalOpen({
      isOpen: true,
      action,
    });
  };

  const userActionDropdown = userActionDropdownDynamic(
    setPortalActions,
    usersData,
  );

  const [getExportUserTrigger] = useLazyGetExportSoftwareUsersQuery();

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

  const exportAsCsv = () => getUserListDataExport?.(EXPORT_TYPE?.CSV);
  const exportAsXls = () => getUserListDataExport?.(EXPORT_TYPE?.XLS);

  const openFilterPortal = () =>
    setPortalActions(SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.FILTER);

  const openAddUserPortal = () =>
    setPortalActions(SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.ADD);

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  return {
    exportAsCsv,
    exportAsXls,
    userActionDropdown,
    openAddUserPortal,
    openFilterPortal,
    handleSearch,
  };
};
