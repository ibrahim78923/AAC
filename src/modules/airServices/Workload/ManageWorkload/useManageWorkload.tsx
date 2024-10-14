import { useState } from 'react';
import { workloadDefaultDateRange } from '../Workload.data';
import { useGetAirServicesWorkloadQuery } from '@/services/airServices/workload';
import { ARRAY_INDEX } from '@/constants/strings';
import { isoDateString } from '@/utils/dateTime';

export default function useManageWorkload() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [manage, setManage] = useState<any>();

  const open = Boolean(anchorEl);

  const [dateRange, setDateRange] = useState<any>(workloadDefaultDateRange);
  const [modifiedRange, setModifiedRange] = useState<any>(
    workloadDefaultDateRange,
  );

  const workloadParams = {
    manage: manage,
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
      {
        skip: !openDrawer,
        refetchOnMountOrArgChange: true,
      },
    );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleMenuItemClick = (value: any) => {
    setManage(value);
    setOpenDrawer(true);
    setAnchorEl(null);
  };

  const manageWorkLoadOptions = [
    { label: 'All', value: undefined },
    { label: 'Planned', value: 'PLANNED' },
    { label: 'UnPlanned', value: 'UNPLANNED' },
    { label: 'Delayed', value: 'DELAYED' },
  ];

  return {
    handleClick,
    anchorEl,
    open,
    setAnchorEl,
    manageWorkLoadOptions,
    handleMenuItemClick,
    openDrawer,
    data,
    setOpenDrawer,
    dateRange,
    manage,
    setDateRange,
    isLoading,
    isFetching,
    isError,
    setModifiedRange,
    modifiedRange,
  };
}
