import { Button } from '@mui/material';
import { Fragment, useState } from 'react';
import { UnassignedWorkDataArray } from './UnassignedWork.data';
import WorkloadDrawer from '../WorkloadDrawer/WorkloadDrawer';

export const UnassignedWork = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  return (
    <Fragment>
      <Button
        variant={'contained'}
        sx={{ mx: 2 }}
        onClick={() => setOpenDrawer(true)}
      >
        Unassigned Work
      </Button>

      <WorkloadDrawer
        dataArray={UnassignedWorkDataArray}
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
        setDateRange={setDateRange}
        dateRange={dateRange}
      />
    </Fragment>
  );
};
