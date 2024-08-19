import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PAGINATION } from '@/config';
import { downloadFile } from '@/utils/file';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import {
  useLazyGetExportInstallationQuery,
  useLazyGetInstallationByIdQuery,
} from '@/services/airServices/assets/software/single-software-detail/installations';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useInstallationDetail = () => {
  const [activeCheck, setActiveCheck] = useState<any[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const searchParams = useSearchParams();
  const deviceId = searchParams?.get?.('softwareId');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [lazyGetExportInstallationTrigger] =
    useLazyGetExportInstallationQuery();
  const getInstallationListDataExport = async (type: string) => {
    const getInstallationParam = new URLSearchParams();
    getInstallationParam?.append('page', page + '');
    getInstallationParam?.append('limit', pageLimit + '');
    getInstallationParam?.append('deviceId', deviceId + '');
    getInstallationParam?.append('search', searchBy + '');
    getInstallationParam?.append('exportType', type);
    const getInstallationExportParameter = {
      queryParams: getInstallationParam,
    };
    try {
      const response: any = await lazyGetExportInstallationTrigger(
        getInstallationExportParameter,
      )?.unwrap();
      downloadFile(response, 'Software Devices List', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(
        response?.data?.message ?? `Installation Exported Successfully`,
      );
      setActiveCheck([]);
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? `Installation Not Exported`);
      setActiveCheck([]);
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
