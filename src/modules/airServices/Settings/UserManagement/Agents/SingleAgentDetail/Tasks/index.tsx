import TanstackTable from '@/components/Table/TanstackTable';
import { useTasks } from './useTasks';
import { Typography } from '@mui/material';

export const Tasks = () => {
  const { data, isLoading, isFetching, isError, isSuccess, tasksColumns }: any =
    useTasks();

  return (
    <>
      <Typography variant="h4" color="SlateBlue.main">
        Tasks
      </Typography>
      <br />
      <TanstackTable
        columns={tasksColumns}
        data={data?.data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
      />
    </>
  );
};
