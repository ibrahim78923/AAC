import { useState } from 'react';
import { workloadDefaultDateRange } from '../Workload.data';
import { useGetWorkloadQuery } from '@/services/airServices/workload';

export default function useManageWorkload() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [manage, setManage] = useState<any>();

  const open = Boolean(anchorEl);

  const [dateRange, setDateRange] = useState<any>(workloadDefaultDateRange);
  const [modifiedRange, setModifiedRange] = useState<any>(
    workloadDefaultDateRange,
  );

  const { data, isLoading, isFetching, isError } = useGetWorkloadQuery(
    {
      manage: manage,
      startDate: dateRange?.[0]?.startDate?.toISOString(),
      endDate: dateRange?.[0]?.endDate?.toISOString(),
      modifiedStartDate: modifiedRange?.[0]?.startDate?.toISOString(),
      modifiedEndDate: modifiedRange?.[0]?.endDate?.toISOString(),
    },
    { skip: !openDrawer, refetchOnMountOrArgChange: true },
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
