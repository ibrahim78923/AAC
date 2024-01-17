import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { downloadFile } from '@/utils/file';
import { EXPORT_FILE_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useLazyGetExportInstallationQuery,
  useLazyGetInstallationByIdQuery,
} from '@/services/airServices/assets/software/single-software-detail/installations';

export const useInstallationDetail = () => {
  const [activeCheck, setActiveCheck] = useState<string[]>([]);
  const [searchBy, setSearchBy] = useState<any>('');
  const searchParams = useSearchParams();
  const deviceId = searchParams?.get?.('softwareId');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [lazyGetExportInstallationTrigger] =
    useLazyGetExportInstallationQuery();
  const getInstallationListDataExport = async (type: any) => {
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
      enqueueSnackbar(
        response?.data?.message ?? `Installation Exported Successfully`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      setActiveCheck([]);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? `Installation Not Exported`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setActiveCheck([]);
    }
  };
  useEffect(() => {
    getInstallationListData();
  }, [page, pageLimit, searchBy]);
  const [
    lazyGetInstallationTrigger,
    { data: installationsData, isLoading, isError, isFetching, isSuccess },
  ] = useLazyGetInstallationByIdQuery<any>();
  const installationData = installationsData?.data?.inventories;
  const metaData: any = installationsData?.data?.meta;
  const getInstallationListData = async () => {
    const getInstallationParam = new URLSearchParams();
    getInstallationParam?.append('page', page + '');
    getInstallationParam?.append('limit', pageLimit + '');
    getInstallationParam?.append('deviceId', deviceId + '');
    getInstallationParam?.append('search', searchBy + '');
    try {
      await lazyGetInstallationTrigger(getInstallationParam)?.unwrap();
    } catch (error: any) {
      enqueueSnackbar(error?.error?.message ?? 'An error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
        autoHideDuration: 2000,
      });
    }
  };
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
    searchBy,
    setSearchBy,
    installationData,
    getInstallationListDataExport,
  };
};
