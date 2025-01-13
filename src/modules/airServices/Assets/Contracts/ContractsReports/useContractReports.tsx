import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import {
  ContractReportsChartData,
  ContractReportsCountData,
  contractsTypeOptions,
} from './ContractReportsCard.data';
import { filteredEmptyValues } from '@/utils/api';
import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import { useGetServiceSystematicReportsQuery } from '@/services/airServices/reports';
import { AUTO_REFRESH_API_POLLING_TIME } from '@/config';
import { htmlToPdfConvert } from '@/lib/html-to-pdf-converter';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';

export const useContractReports = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasDate, setHasDate] = useState<boolean>(false);

  const [filterDate, setFilterDate] = useState<any>({
    startDate: null,
    endDate: null,
  });

  const downloadRef = useRef(null);

  const contractReportMethodProps = {
    defaultValues: {
      contracts: contractsTypeOptions?.[ARRAY_INDEX?.ZERO],
      createdDate: {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    },
  };

  const { handleSubmit, getValues, watch, setValue, methods } = useFormLib(
    contractReportMethodProps,
  );
  watch?.();

  const apiDataParameter = {
    queryParams: {
      moduleType: MODULE_TYPE?.CONTRACT,
      ...(hasDate && filterDate?.startDate
        ? { startDate: filterDate?.startDate }
        : {}),
      ...(hasDate && filterDate?.endDate
        ? { endDate: filterDate?.endDate }
        : {}),
      ...(!!getValues?.('contracts')?._id
        ? { requestedKey: getValues?.('contracts')?._id }
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

  const apiCallInProgress = isLoading || isFetching;

  const handleDownload = async () => {
    if (isLoading || isFetching || isError) return;
    setLoading(true);
    try {
      await htmlToPdfConvert?.(downloadRef, 'Contract_Report');
    } catch (error) {}
    setLoading(false);
  };

  const contractReportsCardData = ContractReportsCountData(data?.data);
  const contractReportsChartData = filteredEmptyValues(
    ContractReportsChartData(data?.data),
  );

  const onDateFilterSubmit = (setAnchorElDate: any) => {
    const startDate = isoDateString(getValues?.('createdDate')?.startDate);
    const endDate = isoDateString(getValues?.('createdDate')?.endDate);
    setFilterDate({ startDate, endDate });
    setHasDate?.(true);
    setAnchorElDate?.(null);
  };

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
    methods,
    handleSubmit,
    onDateFilterSubmit,
    handleDownload,
    contractReportsCardData,
    loading,
    refetch,
    setHasDate,
    shouldDateSet,
    contractReportsChartData,
    downloadRef,
    isLoading,
    isFetching,
    isError,
    data,
    getValues,
    apiCallInProgress,
    fulfilledTimeStamp,
  };
};
