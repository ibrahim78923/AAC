import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { makeDateTime } from '@/utils/api';
import { useLazyGetAgentsDropdownQuery } from '@/services/airServices/assets/contracts';
import { useGetServiceSystematicReportsQuery } from '@/services/airServices/reports';
import { MODULE_TYPE } from '@/constants/strings';
import { htmlToPdfConvert } from '@/utils/file';

export const useTicketsReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasDate, setHasDate] = useState(false);

  const downloadRef = useRef(null);

  const router = useRouter();

  const apiQueryAgents = useLazyGetAgentsDropdownQuery();

  const methods: any = useForm({
    defaultValues: {
      agentId: null,
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
      ...(hasDate && !!getValues?.('createdDate')?.startDate
        ? {
            startDate: makeDateTime(
              new Date(getValues?.('createdDate')?.startDate),
              new Date(),
            )?.toISOString(),
          }
        : {}),
      ...(hasDate && !!getValues?.('createdDate')?.endDate
        ? {
            endDate: makeDateTime(
              new Date(getValues?.('createdDate')?.endDate),
              new Date(),
            )?.toISOString(),
          }
        : {}),
      ...(!!getValues?.('agentId')?._id
        ? { agentId: getValues?.('agentId')?._id }
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

  const handleDownload = async () => {
    if (isLoading || isFetching || isError) return;
    setLoading(true);
    try {
      await htmlToPdfConvert?.(downloadRef, 'Ticket_Report');
    } catch (error) {}
    setLoading(false);
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
    handleDownload,
    loading,
    methods,
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    downloadRef,
    setHasDate,
    shouldDateSet,
    apiQueryAgents,
  };
};
