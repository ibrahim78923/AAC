import { useGetSingleGenericReportDetailQuery } from '@/services/airOperations/reports';
import { htmlToPdfConvert } from '@/utils/file';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export const useSingleGenericReportDetail = () => {
  const router = useRouter();
  const { reportId } = router?.query;
  const reportRef = useRef(null);
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

  const reportWidgets = singleReportApi?.data?.data?.report?.reportDoc;
  const reportResults = singleReportApi?.data?.data?.report?.result;

  const downloadReport = () => {
    htmlToPdfConvert?.(reportRef, reportWidgets?.name);
  };

  return {
    reportWidgets,
    reportResults,
    downloadReport,
    reportRef,
    router,
    singleReportApi,
  };
};
