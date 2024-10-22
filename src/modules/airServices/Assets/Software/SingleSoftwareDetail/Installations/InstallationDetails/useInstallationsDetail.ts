import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PAGINATION } from '@/config';
import { downloadFile } from '@/utils/file';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import {
  useLazyGetExportInstallationQuery,
  useLazyGetInstallationByIdQuery,
} from '@/services/airServices/assets/software/single-software-detail/installations';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useInstallationDetail = () => {
  const [activeCheck, setActiveCheck] = useState<any[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const searchParams = useSearchParams();
  const deviceId = searchParams?.get?.('softwareId');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [lazyGetExportInstallationTrigger] =
    useLazyGetExportInstallationQuery();
  const getInstallationListDataExport = async (type: string) => {
    const queryParams = {
      exportType: type,
    };
    const getContractExportParameter = {
      queryParams,
    };

    try {
      const response: any = await lazyGetExportInstallationTrigger(
        getContractExportParameter,
      )?.unwrap();
      downloadFile(response, 'Software Devices List', EXPORT_FILE_TYPE?.[type]);
      successSnackbar('File Exported successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const [
    lazyGetInstallationTrigger,
    { data: installationsData, isLoading, isError, isFetching, isSuccess },
  ] = useLazyGetInstallationByIdQuery();
  const installationData = installationsData?.data?.inventories;
  const metaData = installationsData?.data?.meta;
  const getInstallationListData = async () => {
    const getInstallationParam = new URLSearchParams();
    getInstallationParam?.append('page', page + '');
    getInstallationParam?.append('limit', pageLimit + '');
    getInstallationParam?.append('deviceId', deviceId + '');
    getInstallationParam?.append('search', searchBy + '');
    await lazyGetInstallationTrigger(getInstallationParam)?.unwrap();
  };
  useEffect(() => {
    getInstallationListData();
  }, [page, pageLimit, searchBy]);
  return {
    activeCheck,
    setActiveCheck,
    setPage,
    setPageLimit,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    metaData,
    page,
    pageLimit,
    setSearchBy,
    installationData,
    getInstallationListDataExport,
    getInstallationListData,
  };
};
