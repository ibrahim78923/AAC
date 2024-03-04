import { useState } from 'react';
import { workloadDefaultDateRange } from '../Workload.data';
import { useGetWorkloadQuery } from '@/services/airServices/workload';

export default function useUnassignedWork() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const UNPLANNED = 'UNPLANNED';

  const [dateRange, setDateRange] = useState<any>(workloadDefaultDateRange);
  const [modifiedRange, setModifiedRange] = useState<any>(
    workloadDefaultDateRange,
  );

  const { data, isLoading, isFetching, isError } = useGetWorkloadQuery(
    {
      manage: UNPLANNED,
      startDate: dateRange?.[0]?.startDate?.toISOString(),
      endDate: dateRange?.[0]?.endDate?.toISOString(),
      modifiedStartDate: modifiedRange?.[0]?.startDate?.toISOString(),
      modifiedEndDate: modifiedRange?.[0]?.endDate?.toISOString(),
    },
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
