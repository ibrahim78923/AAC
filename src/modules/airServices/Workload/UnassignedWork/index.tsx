import { Button } from '@mui/material';
import WorkloadDrawer from '../WorkloadDrawer/WorkloadDrawer';
import useUnassignedWork from './useUnassignedWork';

export const UnassignedWork = () => {
  const {
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
  } = useUnassignedWork();

  return (
    <>
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
    </>
  );
};
