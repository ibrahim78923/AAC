import { useLazyGetExportInstallationQuery } from '@/services/airServices/assets/software/single-software-detail/installations';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { downloadFile } from '@/utils/file';
import { useRouter } from 'next/router';
import { HeaderPropsI } from '../Installations.interface';
import { INSTALLATION_PORTAL_ACTION } from '../Installations.data';
import { EXPORT_FILE_TYPE } from '@/constants/strings';

export const useHeader = (props: HeaderPropsI) => {
  const { setSearch, setPage, setIsPortalOpen } = props;

  const router = useRouter();

  const softwareId = router?.query?.softwareId;

  const [lazyGetExportInstallationTrigger] =
    useLazyGetExportInstallationQuery();

  const handleOpenDelete = () => {
    setIsPortalOpen({
      isOpen: true,
      action: INSTALLATION_PORTAL_ACTION?.REMOVE_DEVICE,
    });
  };

  const handleAddDevice = () => {
    setIsPortalOpen({
      isOpen: true,
      action: INSTALLATION_PORTAL_ACTION?.ADD_DEVICE,
    });
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  const getInstallationListDataExport = async (type: string) => {
    const queryParams = {
      exportType: type,
      deviceId: softwareId,
    };
    const getContractExportParameter = {
      queryParams,
    };

    try {
      const response: any = await lazyGetExportInstallationTrigger(
        getContractExportParameter,
      )?.unwrap();
      downloadFile(response, 'Software Devices List', EXPORT_FILE_TYPE?.[type]);
      successSnackbar('File exported successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    handleOpenDelete,
    handleSearch,
    handleAddDevice,
    getInstallationListDataExport,
  };
};
