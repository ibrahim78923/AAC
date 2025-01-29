import { NextRouter, useRouter } from 'next/router';
import { filteredEmptyValues } from '@/utils/api';
import { useRef, useState } from 'react';
import {
  SoftwareReportsChartData,
  SoftwareReportsCountData,
  softwareReportsTableColumnsDynamic,
  softwareStatusReportsOptions,
} from './SoftwareReports.data';
import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import { useGetServiceSystematicReportsQuery } from '@/services/airServices/reports';
import { AUTO_REFRESH_API_POLLING_TIME } from '@/config';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';

export const useSoftwareReports = () => {
  const router: NextRouter = useRouter();
  const [hasDate, setHasDate] = useState<boolean>(false);
  const [filterDate, setFilterDate] = useState<any>({
    startDate: null,
    endDate: null,
  });

  const downloadRef = useRef(null);

  const softwareReportMethodProps = {
    defaultValues: {
      status: softwareStatusReportsOptions?.[ARRAY_INDEX?.ZERO],
      createdDate: {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    },
  };

  const { getValues, watch, setValue, methods } = useFormLib(
    softwareReportMethodProps,
  );
  watch?.();

  const apiDataParameter = {
    queryParams: {
      moduleType: MODULE_TYPE?.SOFTWARE,
      ...(hasDate && filterDate?.startDate
        ? { startDate: filterDate?.startDate }
        : {}),
      ...(hasDate && filterDate?.endDate
        ? { endDate: filterDate?.endDate }
        : {}),

      ...(!!watch?.('status')?._id
        ? { requestedKey: watch?.('status')?._id }
        : {}),
    },
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    fulfilledTimeStamp,
  }: { [key: string]: any } = useGetServiceSystematicReportsQuery(
    apiDataParameter,
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: AUTO_REFRESH_API_POLLING_TIME?.REPORTS,
    },
  );

  const onDateFilterSubmit = (setAnchorElDate: any) => {
    const startDate = isoDateString(getValues?.('createdDate')?.startDate);
    const endDate = isoDateString(getValues?.('createdDate')?.endDate);
    setFilterDate({ startDate, endDate });
    setHasDate?.(true);
    setAnchorElDate?.(null);
  };

  const softwareReportsCardsData = SoftwareReportsCountData(data?.data);
  const softwareReportsChartsData = filteredEmptyValues(
    SoftwareReportsChartData(data?.data),
  );
  const softwareReportsTableColumns = softwareReportsTableColumnsDynamic?.();

  const shouldDateSet = () => {
    if (hasDate) return;
    setValue('createdDate', {
      startDate: null,
      endDate: null,
      key: 'selection',
    });
  };

  const apiCallInProgress = isLoading || isFetching;

  return {
    router,
    softwareReportsCardsData,
    methods,
    softwareReportsTableColumns,
    softwareReportsChartsData,
    downloadRef,
    isLoading,
    isFetching,
    isError,
    refetch,
    setHasDate,
    shouldDateSet,
    data,
    onDateFilterSubmit,
    getValues,
    apiCallInProgress,
    fulfilledTimeStamp,
  };
};
