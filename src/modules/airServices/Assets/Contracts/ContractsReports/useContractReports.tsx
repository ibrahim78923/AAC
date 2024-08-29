import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ContractReportsCardData,
  ContractReportsChartData,
  contractsTypeOptions,
} from './ContractReportsCard.data';
import { filteredEmptyValues, makeDateTime } from '@/utils/api';
import { htmlToPdfConvert } from '@/utils/file';
import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import { useGetServiceSystematicReportsQuery } from '@/services/airServices/reports';

export const useContractReports = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasDate, setHasDate] = useState(false);
  const [filterDate, setFilterDate] = useState({
    startDate: null,
    endDate: null,
  });
  const downloadRef = useRef(null);

  const methods: any = useForm({
    defaultValues: {
      contracts: contractsTypeOptions?.[ARRAY_INDEX?.ZERO],
      createdDate: {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    },
  });
  const { handleSubmit, getValues, watch, setValue } = methods;

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
      await htmlToPdfConvert?.(downloadRef, 'Contract_Report');
    } catch (error) {}
    setLoading(false);
  };

  const contractReportsCardData = ContractReportsCardData(data?.data);
  const contractReportsChartData = filteredEmptyValues(
    ContractReportsChartData(data?.data),
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
  };
};
