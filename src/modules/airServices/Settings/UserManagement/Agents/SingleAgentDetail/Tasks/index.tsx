import TanstackTable from '@/components/Table/TanstackTable';
import { useTasks } from './useTasks';

export const Tasks = () => {
  const { data, isLoading, isFetching, isError, isSuccess, tasksColumns }: any =
    useTasks();

  return (
    <TanstackTable
      columns={tasksColumns}
      data={data?.data}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      isSuccess={isSuccess}
    />
  );
};
