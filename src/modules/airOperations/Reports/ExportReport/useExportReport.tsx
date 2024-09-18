import {
  emptySelectedReportsList,
  setIsPortalClose,
} from '@/redux/slices/airOperations/reports/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyExportReportsListQuery } from '@/services/airOperations/reports';
import {
  REPORTS_BASE_MODULE,
  TAB_CHANGED_FILTERED,
} from '../ReportLists/ReportLists.data';
import { useRouter } from 'next/router';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import { downloadFile } from '@/utils/file';
import { EXPORT_FILE_TYPE } from '@/constants/strings';

export const useExportReport = () => {
  const [lazyExportReportsListTrigger, lazyExportReportsListStatus]: any =
    useLazyExportReportsListQuery?.();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isPortalOpen = useAppSelector(
    (state) => state?.operationsReportsLists?.isPortalOpen,
  );
  const filter = useAppSelector(
    (state) => state?.operationsReportsLists?.filter,
  );

  const tabValue = useAppSelector(
    (state) => state?.operationsReportsLists?.tabValue,
  );
  const closeModal = () => {
    dispatch(emptySelectedReportsList());
    dispatch(setIsPortalClose());
  };

  const handleFileExportSubmit = async (type: string) => {
    const additionalParams = [
      ['exportType', type],
      ...(!!filter?.length ? [...TAB_CHANGED_FILTERED?.[tabValue]] : []),
      ...(!!router?.pathname
        ? [['baseModule', REPORTS_BASE_MODULE?.[router?.pathname as string]]]
        : []),
    ];

    const getReportParam: URLSearchParams = buildQueryParams(additionalParams);

    const apiDataParameter = {
      queryParams: getReportParam,
    };

    try {
      const response: any =
        await lazyExportReportsListTrigger(apiDataParameter)?.unwrap();
      downloadFile(response, 'ReportsLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`File Exported successfully`);
      closeModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  return {
    isPortalOpen,
    handleFileExportSubmit,
    closeModal,
    lazyExportReportsListStatus,
  };
};
