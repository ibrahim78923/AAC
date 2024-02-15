import { Button } from '@mui/material';
import { Fragment, useState } from 'react';
import WorkloadDrawer from '../WorkloadDrawer/WorkloadDrawer';
import { useGetWorkloadQuery } from '@/services/airServices/workload';
import { workloadDefaultDateRange } from '../Workload.data';

export const UnassignedWork = () => {
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
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          setModifiedRange={setModifiedRange}
          modifiedRange={modifiedRange}
          onChangeModifiedHandler={(item: any) =>
            setModifiedRange([item?.selection])
          }
        />
      )}
    </Fragment>
  );
};
