import { Button } from '@mui/material';
import { Fragment, useState } from 'react';
import WorkloadDrawer from '../WorkloadDrawer/WorkloadDrawer';
import { useGetWorkloadQuery } from '@/services/airServices/workload';
import { workloadDefaultDateRange } from '../Workload.data';

export const UnassignedWork = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const UNPLANNED = 'UNPLANNED';

  const [dateRange, setDateRange] = useState<any>(workloadDefaultDateRange);

  const { data } = useGetWorkloadQuery(
    {
      manage: UNPLANNED,
      startDate: dateRange?.[0]?.startDate?.toISOString(),
      // TODO: Will be catered in integration
      // endDate: dateRange?.[0]?.endDate?.toISOString(),
    },
    { skip: !openDrawer, refetchOnMountOrArgChange: true },
  );

  return (
    <Fragment>
      <Button variant={'contained'} onClick={() => setOpenDrawer(true)}>
        Unassigned Work
      </Button>

      {openDrawer && (
        <WorkloadDrawer
          dataArray={data}
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
          onChangeDateHandler={(item: any) => setDateRange([item?.selection])}
          dateRange={dateRange}
          state={UNPLANNED}
          setDateRange={setDateRange}
        />
      )}
    </Fragment>
  );
};
