import { useGetSingleGenericReportDetailQuery } from '@/services/airOperations/reports';
import { htmlToPdfConvert } from '@/utils/file';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export const useSingleGenericReportDetail = () => {
  const router = useRouter();
  const { reportId } = router?.query;
  const reportRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const apiDataParameter = {
    queryParams: {
      id: reportId,
    },
  };

  const singleReportApi = useGetSingleGenericReportDetailQuery(
    apiDataParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !reportId,
    },
  );
  const reportWidgets = singleReportApi?.data?.data?.result?.genericReports;
  const reportResults =
    singleReportApi?.data?.data?.result?.genericReportsResult;

  const downloadReport = async () => {
    setIsDownloading(true);
    try {
      await htmlToPdfConvert?.(reportRef, reportWidgets?.name);
    } catch (error) {}
    setIsDownloading(false);
  };

  return {
    reportWidgets,
    reportResults,
    downloadReport,
    reportRef,
    router,
    singleReportApi,
    isDownloading,
  };
};
