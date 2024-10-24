import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetServiceSystematicReportsQuery } from '@/services/airServices/reports';
import { MODULE_TYPE } from '@/constants/strings';
import {
  AUTO_REFRESH_API_POLLING_TIME,
  AUTO_REFRESH_API_TIME_INTERVAL,
} from '@/config';
import { useApiPolling } from '@/hooks/useApiPolling';
import { isoDateString } from '@/lib/date-time';

export const useTicketsReport = () => {
  const [hasDate, setHasDate] = useState(false);
  const [filterDate, setFilterDate] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const downloadRef = useRef(null);

  const router = useRouter();

  const methods: any = useForm({
    defaultValues: {
      createdDate: {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    },
  });

  const { getValues, watch, setValue } = methods;

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

  const props = {
    isFetching,
    fulfilledTimeStamp,
    intervalTime: AUTO_REFRESH_API_TIME_INTERVAL?.REPORTS,
  };

  const { timeLapse } = useApiPolling(props);
  const apiCallInProgress = isLoading || isFetching;

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
    timeLapse,
    apiCallInProgress,
  };
};
