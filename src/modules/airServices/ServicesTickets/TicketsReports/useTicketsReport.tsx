import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetServiceSystematicReportsQuery } from '@/services/airServices/reports';
import { MODULE_TYPE } from '@/constants/strings';
import { AUTO_REFRESH_API_POLLING_TIME } from '@/config';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';
import { htmlToPdfConvert } from '@/lib/html-to-pdf-converter';

export const useTicketsReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasDate, setHasDate] = useState(false);
  const [filterDate, setFilterDate] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const downloadRef = useRef(null);

  const router = useRouter();

  const ticketsReportMethodProps = {
    defaultValues: {
      createdDate: {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    },
  };

  const { getValues, watch, setValue, methods } = useFormLib(
    ticketsReportMethodProps,
  );
  watch?.();

  const apiDataParameter = {
    queryParams: {
      moduleType: MODULE_TYPE?.TICKETS,
      ...(hasDate && filterDate?.startDate
        ? { startDate: filterDate?.startDate }
        : {}),
      ...(hasDate && filterDate?.endDate
        ? { endDate: filterDate?.endDate }
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

  const shouldDateSet = () => {
    if (hasDate) return;
    setValue('createdDate', {
      startDate: null,
      endDate: null,
      key: 'selection',
    });
  };

  const apiCallInProgress = isLoading || isFetching;

  const handleDownload = async () => {
    if (isLoading || isFetching || isError) return;
    setLoading(true);
    try {
      await htmlToPdfConvert?.(downloadRef, 'Contract_Report');
    } catch (error) {}
    setLoading(false);
  };

  return {
    router,
    methods,
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    downloadRef,
    setHasDate,
    shouldDateSet,
    onDateFilterSubmit,
    getValues,
    apiCallInProgress,
    handleDownload,
    loading,
    fulfilledTimeStamp,
  };
};
