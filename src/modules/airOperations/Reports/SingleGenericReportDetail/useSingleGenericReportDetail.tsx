import { useGetOperationsSingleReportDetailsForDownloadQuery } from '@/services/airOperations/reports';
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

  const singleReportApi = useGetOperationsSingleReportDetailsForDownloadQuery(
    apiDataParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !reportId,
    },
  );

  const reportWidgets = singleReportApi?.data?.data?.result?.genericReports;
  const reportResults =
    singleReportApi?.data?.data?.result?.genericReportsResult;

  const moveBack = () =>
    router?.push({
      pathname: router?.query?.redirect as string,
      query: {
        id: router?.query?.id,
        baseModule: router?.query?.baseModule,
      },
    });

  const showLoader = singleReportApi?.isLoading || singleReportApi?.isFetching;

  return {
    reportWidgets,
    reportResults,
    reportRef,
    singleReportApi,
    moveBack,
    showLoader,
  };
};
