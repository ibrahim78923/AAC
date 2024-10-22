import { NextRouter, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { filteredEmptyValues, makeDateTime } from '@/utils/api';
import { useRef, useState } from 'react';
import {
  PurchaseOrderReportsChartData,
  PurchaseOrderReportsCountData,
  purchaseOrderTableFilterOptions,
} from './PurchaseOrdersReports.data';
import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import { useGetServiceSystematicReportsQuery } from '@/services/airServices/reports';
import { htmlToPdfConvert } from '@/utils/file';

export const usePurchaseOrderReports = () => {
  const router: NextRouter = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasDate, setHasDate] = useState(false);
  const [filterDate, setFilterDate] = useState({
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
  }: { [key: string]: any } = useGetServiceSystematicReportsQuery(
    apiDataParameter,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const onDateFilterSubmit = (setAnchorElDate: any) => {
    const startDate = makeDateTime(
      new Date(getValues?.('createdDate')?.startDate),
      new Date(),
    )?.toISOString();
    const endDate = makeDateTime(
      new Date(getValues?.('createdDate')?.endDate),
      new Date(),
    )?.toISOString();
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
  };
};
