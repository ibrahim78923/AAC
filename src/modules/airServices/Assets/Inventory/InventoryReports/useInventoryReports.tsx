import { NextRouter, useRouter } from 'next/router';
import { filteredEmptyValues } from '@/utils/api';
import { useRef, useState } from 'react';
import {
  InventoryReportsChartData,
  InventoryReportsCountData,
  inventoryTableFilterOptions,
} from './InventoryReports.data';
import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import { useGetServiceSystematicReportsQuery } from '@/services/airServices/reports';
import { AUTO_REFRESH_API_POLLING_TIME } from '@/config';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';

export const useInventoryReports = () => {
  const router: NextRouter = useRouter();
  const [hasDate, setHasDate] = useState(false);
  const [filterDate, setFilterDate] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const downloadRef = useRef(null);

  const inventoryReportMethodProps = {
    defaultValues: {
      status: inventoryTableFilterOptions?.[ARRAY_INDEX?.ZERO],
      createdDate: {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    },
  };

  const { getValues, watch, setValue, methods } = useFormLib(
    inventoryReportMethodProps,
  );
  watch?.();

  const apiDataParameter = {
    queryParams: {
      moduleType: MODULE_TYPE?.INVENTORY,
      ...(hasDate && filterDate?.startDate
        ? { startDate: filterDate?.startDate }
        : {}),
      ...(hasDate && filterDate?.endDate
        ? { endDate: filterDate?.endDate }
        : {}),
      ...(!!getValues?.('status')?._id
        ? { requestedKey: getValues?.('status')?.value }
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

  const inventoryData = data?.data;
  const inventoryReportsCardsData = InventoryReportsCountData(data?.data);
  const inventoryReportsChartsData = filteredEmptyValues(
    InventoryReportsChartData(data?.data),
  );

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
    methods,
    onDateFilterSubmit,
    downloadRef,
    isLoading,
    isFetching,
    isError,
    refetch,
    setHasDate,
    shouldDateSet,
    inventoryReportsChartsData,
    inventoryReportsCardsData,
    inventoryData,
    getValues,
    apiCallInProgress,
    fulfilledTimeStamp,
  };
};
