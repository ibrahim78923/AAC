import { NextRouter, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';
import { useRef, useState } from 'react';
import {
  PurchaseOrderReportsChartData,
  PurchaseOrderReportsCountData,
  purchaseOrderTableFilterOptions,
} from './PurchaseOrdersReports.data';
import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import { useGetServiceSystematicReportsQuery } from '@/services/airServices/reports';
import {
  AUTO_REFRESH_API_POLLING_TIME,
  AUTO_REFRESH_API_TIME_INTERVAL,
} from '@/config';
import { useApiPolling } from '@/hooks/useApiPolling';
import { htmlToPdfConvert } from '@/lib/html-to-pdf-converter';
import { isoDateString } from '@/lib/date-time';

export const usePurchaseOrderReports = () => {
  const router: NextRouter = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasDate, setHasDate] = useState(false);
  const [filterDate, setFilterDate] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const downloadRef = useRef(null);

  const methods: any = useForm({
    defaultValues: {
      status: purchaseOrderTableFilterOptions?.[ARRAY_INDEX?.ZERO],
      createdDate: {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    },
  });

  const { handleSubmit, getValues, setValue, watch } = methods;
  watch?.();

  const apiDataParameter = {
    queryParams: {
      moduleType: MODULE_TYPE?.PURCHASE_ORDER,
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

  const handleDownload = async () => {
    if (isLoading || isFetching || isError) return;
    setLoading(true);
    try {
      await htmlToPdfConvert?.(downloadRef, 'Purchase_Order_Report');
    } catch (error) {}
    setLoading(false);
  };

  const purchaseOrderData = data?.data;
  const purchaseOrderReportsCardsData = PurchaseOrderReportsCountData(
    data?.data,
  );
  const purchaseOrderReportsChartsData = filteredEmptyValues(
    PurchaseOrderReportsChartData(data?.data),
  );

  const shouldDateSet = () => {
    if (hasDate) return;
    setValue('createdDate', {
      startDate: null,
      endDate: null,
      key: 'selection',
    });
  };

  const props = {
    isFetching,
    fulfilledTimeStamp,
    intervalTime: AUTO_REFRESH_API_TIME_INTERVAL?.REPORTS,
  };

  const { timeLapse } = useApiPolling(props);
  const apiCallInProgress = isLoading || isFetching;

  return {
    router,
    handleDownload,
    loading,
    purchaseOrderReportsChartsData,
    purchaseOrderReportsCardsData,
    methods,
    handleSubmit,
    onDateFilterSubmit,
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    downloadRef,
    setHasDate,
    shouldDateSet,
    purchaseOrderData,
    getValues,
    timeLapse,
    apiCallInProgress,
  };
};
