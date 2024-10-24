import { useState } from 'react';
import { workloadDefaultDateRange } from '../Workload.data';
import { useGetAirServicesWorkloadQuery } from '@/services/airServices/workload';
import { isoDateString } from '@/lib/date-time';
import { ARRAY_INDEX } from '@/constants/strings';

export default function useUnassignedWork() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const UNPLANNED = 'UNPLANNED';

  const [dateRange, setDateRange] = useState<any>(workloadDefaultDateRange);
  const [modifiedRange, setModifiedRange] = useState<any>(
    workloadDefaultDateRange,
  );

  const workloadParams = {
    manage: UNPLANNED,
    startDate: !!dateRange?.[ARRAY_INDEX?.ZERO]?.startDate
      ? isoDateString(dateRange?.[ARRAY_INDEX?.ZERO]?.startDate)
      : undefined,
    endDate: !!dateRange?.[ARRAY_INDEX?.ZERO]?.endDate
      ? isoDateString(dateRange?.[ARRAY_INDEX?.ZERO]?.endDate)
      : undefined,
    modifiedStartDate: !!modifiedRange?.[ARRAY_INDEX?.ZERO]?.startDate
      ? isoDateString(modifiedRange?.[ARRAY_INDEX?.ZERO]?.startDate)
      : undefined,
    modifiedEndDate: !!modifiedRange?.[ARRAY_INDEX?.ZERO]?.endDate
      ? isoDateString(modifiedRange?.[ARRAY_INDEX?.ZERO]?.endDate)
      : undefined,
  };

  const { data, isLoading, isFetching, isError } =
    useGetAirServicesWorkloadQuery(
      { ...workloadParams },
      { skip: !openDrawer, refetchOnMountOrArgChange: true },
    );

  return {
    setOpenDrawer,
    openDrawer,
    data,
    setDateRange,
    dateRange,
    UNPLANNED,
    isLoading,
    isFetching,
    isError,
    setModifiedRange,
    modifiedRange,
  };
}
